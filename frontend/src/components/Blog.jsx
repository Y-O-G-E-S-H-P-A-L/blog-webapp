import React from "react";
import { Avatar, Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, image, user, isUser, id }) => {
  const navigate = useNavigate();
  console.log(title, isUser);
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/delete/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <Card
        style={{ transition: "all 0.3s ease" }}
        sx={{
          width: "60%",
          margin: "auto",
          mt: 5,
          padding: 2,
          boxShadow: "5px 5px 100px 15px #ccc",
          ":hover": {
            boxShadow: "10px 10px 80px 20px #ccc",
            transform: "scale(1.05)",
          },
          borderRadius: "12px",
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader avatar={<Avatar sx={{ bgcolor: "orange" }} aria-label="recipe"></Avatar>} title={title} subheader={user} />
        <CardMedia component="img" height="194" image={image} alt="Blog Image" />
        <CardContent>
          <Typography variant="body" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
