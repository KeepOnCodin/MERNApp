import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

connectDB(); // connect to MongoDB

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json()); // allows us to accept JSON data in the body
app.use(express.urlencoded({ extended: true })); // allows us to accept form data in the body

app.use(cookieParser()); // allows us to use cookies

app.use("/api/users", userRoutes); // use the user routes

app.get("/", (req, res) => {res.send("Server is ready");});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {console.log(`Server started at http://localhost:${port}`);});
