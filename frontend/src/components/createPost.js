import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import RichTextEditor from "./richTextEditor";
import axios from "axios";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handle saving the content from the editor automatically
  const handleSaveContent = (newContent) => {
    setContent(newContent);
  };

  // Handle the form submission
  const handleSubmit = async () => {
    if (title.trim() && content.trim()) {
      try {
        // Define the payload in the correct format
        const postData = {
          title: title,
          content: content, // Assuming content is HTML from rich text editor
        };

        // Make the POST request to the backend
        await axios.post("http://localhost:8000/posts/", postData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Post created successfully");

        // Trigger refresh or re-fetch posts if needed
        if (onPostCreated) {
          onPostCreated(postData);
        }

        // Clear the form after successful post creation
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    } else {
      console.error("Title and content are required");
    }
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <RichTextEditor initialContent={content} onSave={handleSaveContent} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ marginTop: 2 }}
      >
        Create Post
      </Button>
    </Box>
  );
}

export default CreatePost;
