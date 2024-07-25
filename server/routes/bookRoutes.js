import express from "express";
import { addBook, getBooks, searchbook } from "../controller/bookController.js";

const bookRoutes = express.Router();

bookRoutes.post("/addbook", addBook);
bookRoutes.get("/getbooks", getBooks);
bookRoutes.get("/searchbook", searchbook);

export default bookRoutes;
