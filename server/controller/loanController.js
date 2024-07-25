import bookSchema from "../schemas/bookSchema";
import loanSchema from "../schemas/loanSchema";
import studentSchema from "../schemas/studentSchema";
import { generateQRCode } from "../utils/qrCodeHelper";
import { sendEmail } from "../utils/emailHelper";

export const addLoan = async (req, res) => {
  const { studentId, bookIds } = req.body;

  try {
    const student = await studentSchema.findOne({ studentId });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const books = await bookSchema.find({ id: { $in: bookIds } });
    if (books.length !== bookIds.length)
      return res.status(404).json({ message: "Book not found" });

    const insufficientBooks = books.filter((book) => book.availableCopies < 1);
    if (insufficientBooks.length > 0) {
      return res.status(400).json({
        message: "Some books are not available in the required quantity",
        insufficientBooks: insufficientBooks.map((book) => book.title),
      });
    }

    await Promise.all(
      books.map(async (book) => {
        book.availableCopies -= 1;
        await book.save();
      })
    );

    const loan = new loanSchema({
      studentId,
      bookId: bookIds,
      status: "borrowed",
    });
    await loan.save();

    const qrCode = await generateQRCode({ loanId: loan._id });

    const emailSent = await sendEmail(student.email, student.name, qrCode);
    if (!emailSent) {
      return res.status(500).json({ message: "Error sending email" });
    }

    res.status(200).json({ message: "Loan created and QR code sent to email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const returnLoan = async (req, res) => {
  const { loanId } = req.body;

  if (!loanId) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const loan = await loanSchema.findOne({ _id: loanId });
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.status === "returned") {
      return res
        .status(400)
        .json({ message: "Loan has already been returned" });
    }

    loan.status = "returned";
    loan.returned = new Date();
    await loan.save();

    const bulkOps = loan.bookId.map((bookId) => ({
      updateOne: {
        filter: { id: bookId },
        update: { $inc: { availableCopies: 1 } },
      },
    }));

    await bookSchema.bulkWrite(bulkOps);

    res.status(200).json({ message: "Books successfully returned" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const OVERDUE_DAYS = 7;

export const overdue = async (req, res) => {
  try {
    const currentDate = new Date();
    const overdueLoans = await loanSchema.find({
      returned: { $exists: false },
      date: {
        $lt: new Date(
          currentDate.setDate(currentDate.getDate() - OVERDUE_DAYS)
        ),
      },
    });

    res.status(200).json(overdueLoans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const studentOverdue = async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const currentDate = new Date();
    const overdueLoans = await loanSchema.find({
      studentId,
      returned: { $exists: false },
      date: {
        $lt: new Date(
          currentDate.setDate(currentDate.getDate() - OVERDUE_DAYS)
        ),
      },
    });

    res.status(200).json(overdueLoans);
  } catch (error) {
    console.log(error);
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