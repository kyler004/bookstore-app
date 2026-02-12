import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [200, "Title must be less than 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minlength: [2, "Author name must be at least 2 characters"],
      maxlength: [100, "Author name must be less than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description must be less than 2000 characters"],
    },
    genre: {
      type: String,
      trim: true,
      // An enum can be made later for the categories
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than or equal to 0"],
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    coverImage: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

bookSchema.virtual("fullTitle").get(function () {
  return `${this.title} by ${this.author}`;
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
