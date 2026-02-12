import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/bookControllers.js";

const router = express.Router();

router.route("/").get(getAllBooks).post(createBook); // Explanation: This route handles GET requests to retrieve all books and POST requests to create a new book.

router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default router;
