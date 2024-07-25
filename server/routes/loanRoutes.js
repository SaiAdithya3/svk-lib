import express from "express";
import {
  addLoan,
  returnLoan,
  overdue,
  studentOverdue,
  getBookLoans,
} from "../controller/loanController";

const router = express.Router();

router.post("/add-loan", addLoan);

router.post("/return-loan", returnLoan);

router.get("/overdue", overdue);

router.get("/overdue-student", studentOverdue);

router.get("/loansbybook/:bookId", getBookLoans); // only return active loans for the book


export default router;
