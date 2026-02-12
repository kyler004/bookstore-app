import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Bookstore API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
