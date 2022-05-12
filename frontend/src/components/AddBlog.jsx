import React, { useState } from "react";
import { Box, TextField, Typography, InputLabel, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const labelStyles = { mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" };
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="orange" borderRadius={6} boxShadow="10px 10px 20px #ccc" padding={3} margin={"25px auto"} display="flex" flexDirection="column" width={"80%"}>
          <Typography fontWeight={"bold"} padding={1} color="grey" variant="h5" textAlign={"center"}>
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin={"none"} variant="outlined" />
          <InputLabel sx={labelStyles}>description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin={"none"} variant="outlined" />
          <InputLabel sx={labelStyles}>Image URL</InputLabel>
          <TextField name="image" onChange={handleChange} value={inputs.image} margin={"none"} variant="outlined" />
          <Button variant="contained" color="warning" type="submit" sx={{ margin: "20px auto", width: "300px", padding: "5px" }}>
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
