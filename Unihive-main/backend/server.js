import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

{
  /* To perse from data in the req.body */
}
{
  /*Middlewear is a function that runs between runs and responnse 
  .Expresss json If a client sends a JSON body (like with POST or PUT), req.body will be undefined.
  To perse json data in the req.body
  */
}

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
