import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import RichTextEditor from './richTextEditor';

function UpdatePost({ post, onUpdate, cancelEdit }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSaveContent = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async () => {
    const updatedPost = {
      ...post,
      title,
      content,
    };
    await onUpdate(updatedPost);
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
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2, marginRight: 1 }}>
        Update Post
      </Button>
      <Button variant="outlined" onClick={cancelEdit} sx={{ marginTop: 2 }}>
        Cancel
      </Button>
    </Box>
  );
}

export default UpdatePost;
