import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please enter mobile number"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: 8,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});

export default mongoose.model("User", userSchema);
