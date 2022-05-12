import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, { name: inputs.name, mobileNumber: inputs.mobileNumber, email: inputs.email, password: inputs.password }).catch((err) => console.log(err));
    let data = await res.data;
    // console.log(data);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box width={"60%"} display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow="10px 10px 20px #ccc" padding={3} marginTop={5} margin="auto" borderRadius={6}>
          <Typography padding={3} textAlign="center" variant="h5" fontWeight={"bold"} color="grey">
            {!isSignup ? "Login" : "Signup"}
          </Typography>
          {isSignup && (
            <>
              <TextField onChange={handleChange} name="name" value={inputs.name} placeholder="Name" margin="normal" />
              <TextField onChange={handleChange} name="mobileNumber" value={inputs.mobileNumber} type="tel" placeholder="Phone" margin="normal" />
            </>
          )}
          <TextField onChange={handleChange} name="email" value={inputs.email} type="email" placeholder="Email" margin="normal" />
          <TextField onChange={handleChange} name="password" value={inputs.password} type="password" placeholder="Password" margin="normal" />
          <Button type="submit" variant="contained" sx={{ borderRadius: 3, marginTop: 3 }} color="warning">
            {isSignup ? "Submit" : "Login"}
          </Button>
          <Button
            onClick={() => {
              setIsSignup(!isSignup);
            }}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
