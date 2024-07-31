import express from "express";
import { addBook, getBooks, searchbook, isBookExists, updateBook } from "../controller/bookController.js";

const bookRoutes = express.Router();

bookRoutes.post("/addbook", addBook);
bookRoutes.post('/updatebook', updateBook);
bookRoutes.get("/getbooks", getBooks);
bookRoutes.get("/searchbook", searchbook);
bookRoutes.get("/isBookExists", isBookExists);

export default bookRoutes;
