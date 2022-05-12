import Blog from "../models/blogModel";
import User from "../models/userModel";

// Get all Blogs
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (err) {
    console.log(err);
  }

  if (!blogs) {
    return res.status(404).json({ message: "No blogs found." });
  }

  return res.status(200).json({ blogs });
};

// Add Blog
export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
    if (existingUser === null) {
      return res.status(400).json({ message: "Unable to find user by this id" });
    }
    const blog = await Blog.create({
      title,
      description,
      image,
      user,
    });
    existingUser.blogs.push(blog);
    await existingUser.save();
    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

// Update Blog
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  let blog;
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { title, description });
  } catch (err) {
    return console.log(err);
  }

  if (blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ message: "Blog updated successfully." });
};

// Get Blog by Id
export const getBlogById = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }

  if (!blog) {
    return res.status(404).json({ message: "No blog found." });
  }

  return res.status(200).json({ blog });
};

// Delete Blog
export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

// Get by User ID
export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const userBlogs = await User.findById(userId).populate("blogs");
    if (userBlogs === null) {
      res.status(404).json({
        message: "No blogs found by this user id.",
      });
    }
    return res.status(200).json({ user: userBlogs });
  } catch (err) {
    console.log(err);
  }
};
