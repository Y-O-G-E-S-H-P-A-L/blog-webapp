import React, { useState } from "react";
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.isloggedIn);
  const [value, setValue] = useState(0);
  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, rgba(255,136,0,1) 0%, rgba(255,149,43,1) 18%, rgba(255,183,15,1) 71%, rgba(255,106,0,1) 100%)" }}>
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        {isloggedIn && (
          <Box display="flex" margin="auto">
            <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
              <Tab label="All Blogs" LinkComponent={Link} to="/blogs" />
              <Tab label="My Blogs" LinkComponent={Link} to="/myBlogs" />
              <Tab label="Add Blog" LinkComponent={Link} to="/blogs/add" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isloggedIn && (
            <>
              <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">
                Login
              </Button>
              <Button LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">
                Sign Up
              </Button>
            </>
          )}
          {isloggedIn && (
            <Button onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to="/auth" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
