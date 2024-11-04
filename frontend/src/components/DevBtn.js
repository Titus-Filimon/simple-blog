import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const DevBtn = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts/"); // Adjust the URL as needed
      console.log(response.data); // Do something with the response data
    } catch (error) {
      console.error("There was an error making the request!", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Fetch Posts
    </Button>
  );
};

export default DevBtn;
