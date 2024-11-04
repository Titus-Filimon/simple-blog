import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const CreatePost = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPostData = { title, content };
    await onCreate(newPostData); // This will call the handler in App.js and then fetchPosts
    setTitle('');
    setContent('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Create a New Post</Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Create Post</Button>
    </Box>
  );
};

export default CreatePost;
