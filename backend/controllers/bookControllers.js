import Book from "../models/Book.js";

// GET /api/books - Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error while fetching books",
    });
  }
};

// GET /api/books/:id - Get a single book
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error while fetching book",
    });
  }
};

// POST /api/books - Create a new book
export const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Invalid data provided",
    });
  }
};

// PUT /api/books/:id - Update a book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error while updating book",
    });
  }
};

// DELETE /api/books/:id - Delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error while deleting book",
    });
  }
};
