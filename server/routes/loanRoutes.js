import express from "express";
import {
  addLoan,
  returnLoan,
  overdue,
  studentOverdue,
  getBookLoans,
  getAllLoans,
  unreturnedBooks,
  getLoanById,
} from "../controller/loanController.js";

const router = express.Router();

router.post("/add-loan", addLoan);

router.post("/return-loan", returnLoan);

router.get("/overdue", overdue);

router.get("/overdue-student", studentOverdue);
router.get("/all-loans", getAllLoans);
router.get("/unreturned-books", unreturnedBooks);

router.get("/loansbybook/:bookId", getBookLoans);

router.get("/getloanbyid/:id", getLoanById);

export default router;
