import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import Book from "./models/Book.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Bookstore API is running and Database is living");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test function to check if the database is connected

// async function testBook() {
//   try {
//     const newBook = new Book({
//       title: "The Great Gatsby",
//       author: "F. Scott Fitzgerald",
//       description: "A classic novel about the American Dream",
//       genre: "Fiction",
//       price: 12.99,
//       isbn: "9780743273565",
//       stock: 45,
//       coverImage: "https://example.com/gatsby.jpg",
//     });

//     const savedBook = await newBook.save();
//     console.log("Test book saved:", savedBook);
//   } catch (err) {
//     console.error("Test book error:", err.message);
//   }
// }

// testBook();
