import express from "express";

import { getAllBlogs, addBlog, updateBlog, getBlogById, deleteBlog, getByUserId } from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

blogRouter.post("/add", addBlog);

blogRouter.get("/:id", getBlogById);

blogRouter.put("/update/:id", updateBlog);

blogRouter.delete("/delete/:id", deleteBlog);

blogRouter.get("/user/:id", getByUserId);

export default blogRouter;
