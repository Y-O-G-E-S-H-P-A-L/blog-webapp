import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose
  .connect("mongodb://localhost:27017/myBlogAppDB")
  .then(() => {
    app.listen(5000);
  })
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((err) => {
    console.log(err);
  });
