import mongoose from "mongoose";
import bookSchema from "../schemas/bookSchema.js";
import loanSchema from "../schemas/loanSchema.js";
import studentSchema from "../schemas/studentSchema.js";
import { generateQRCode } from "../utils/qrCodeHelper.js";
import { sendEmail } from "../utils/emailHelper.js";

export const addLoan = async (req, res) => {
  const { studentId, bookIds } = req.body;

  // Validate ObjectIds
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  if (!bookIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json({ message: "One or more book IDs are invalid" });
  }

  try {
    // Check if student exists
    const student = await studentSchema.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the books
    const books = await bookSchema.find({ _id: { $in: bookIds } });
    if (books.length !== bookIds.length) {
      return res.status(404).json({ message: "Some books not found" });
    }

    // Check book availability
    const insufficientBooks = books.filter((book) => book.availableCopies < 1);
    if (insufficientBooks.length > 0) {
      return res.status(400).json({
        message: "Some books are not available in the required quantity",
        insufficientBooks: insufficientBooks.map((book) => book.title),
      });
    }

    // Update book availability
    await Promise.all(
      books.map(async (book) => {
        book.availableCopies -= 1;
        await book.save();
      })
    );

    // Create a new loan
    const loan = new loanSchema({
      studentId, // Directly use the studentId
      bookId: bookIds, // Directly use the bookIds
      status: "borrowed",
    });
    await loan.save();

    // Generate QR code and send email
    const qrCode = await generateQRCode({ loanId: loan._id });
    const emailSent = await sendEmail(student.email, student.name, qrCode);

    if (!emailSent) {
      return res.status(500).json({ message: "Error sending email" });
    }

    res.status(200).json({ message: "Loan created and QR code sent to email" });
  } catch (error) {
    console.error(error); // Improved error logging
    res.status(500).json({ message: "Internal server error", details: error.message });
  }
};


// Return a loan
export const returnLoan = async (req, res) => {
  const { loanId } = req.body;

  if (!loanId || !mongoose.Types.ObjectId.isValid(loanId)) {
    return res.status(400).json({ message: "Invalid loan ID" });
  }

  try {
    const loan = await loanSchema.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.status === "returned") {
      return res.status(400).json({ message: "Loan has already been returned" });
    }

    loan.status = "returned";
    loan.returned = new Date();
    await loan.save();

    const bulkOps = loan.bookId.map((bookId) => ({
      updateOne: {
        filter: { _id: bookId },
        update: { $inc: { availableCopies: 1 } },
      },
    }));

    await bookSchema.bulkWrite(bulkOps);

    res.status(200).json({ message: "Books successfully returned" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get overdue loans
const OVERDUE_DAYS = process.env.OVERDUE_DAYS || 7;

export const overdue = async (req, res) => {
  try {
    const currentDate = new Date();
    const overdueLoans = await loanSchema.find({
      returned: { $exists: false },
      date: {
        $lt: new Date(currentDate.setDate(currentDate.getDate() - OVERDUE_DAYS)),
      },
    });

    res.status(200).json(overdueLoans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get overdue loans for a specific student
export const studentOverdue = async (req, res) => {
  const { studentId } = req.body;

  if (!studentId || !mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  try {
    const currentDate = new Date();
    const overdueLoans = await loanSchema.find({
      studentId,
      returned: { $exists: false },
      date: {
        $lt: new Date(currentDate.setDate(currentDate.getDate() - OVERDUE_DAYS)),
      },
    });

    res.status(200).json(overdueLoans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getBookLoans = async (req, res) => {
  const { bookId } = req.params;
  if (!bookId) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const bookLoans = await loanSchema
      .find({
        bookId,
        returned: { $exists: false },
      })
      .populate({
        path: "studentId",
        select: "name email",
      });

    if (!bookLoans.length) {
      return res
        .status(404)
        .json({ message: "No active loans found for this book" });
    }

    return res.status(200).json(bookLoans);
  } catch (error) {
    console.error("Error fetching book loans:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllLoans = async (req, res) => {
  try {
    const loans = await loanSchema.find({})
      .populate({
        path: 'studentId',
        select: 'name email' // Adjust the fields to match your schema
      })
      .populate({
        path: 'bookId', // Adjust this to match your schema
        select: 'title author isbn'
      });

    if (!loans.length) {
      return res.status(404).json({ error: "No loans found" });
    }

    return res.status(200).json({ loans });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const unreturnedBooks =  async (req, res) => {
  try {
    // Fetch loans where returnDate is null
    const unreturnedLoans = await loanSchema.find({})
    .populate({
      path: 'studentId', 
      select: 'name studentId'
    })
    .populate({
      path: 'bookId',
      select: 'title author isbn'
    });
    // console.log(unreturnedLoans[1].bookId);
    // Format response
    const unreturnedBooks = unreturnedLoans.map(loan => ({
      serialNumber: loan._id, 
      // isbn: loan.book.isbn,
      // title: loan.book.title,
      // author: loan.book.author,
      // borrower: loan.borrower,
      // borrowDate: loan.borrowDate.toISOString().split('T')[0], // Format date
    }));

    res.json(unreturnedLoans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
