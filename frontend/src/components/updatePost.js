import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const UpdatePost = ({ post, onUpdate, cancelEdit }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await onUpdate({ id: post.id, title, content }); // This will call the handler in App.js and then fetchPosts
  };

  return (
    <Box component="form" onSubmit={handleUpdate} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Edit Post</Typography>
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
      <Button type="submit" variant="contained" sx={{ marginTop: 2, marginRight: 1 }}>Update Post</Button>
      <Button variant="outlined" onClick={cancelEdit} sx={{ marginTop: 2 }}>Cancel</Button>
    </Box>
  );
};

export default UpdatePost;
