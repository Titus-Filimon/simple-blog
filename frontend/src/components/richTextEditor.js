import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import { Box } from '@mui/material';

function RichTextEditor({ initialContent = '', onSave }) {
  const [content, setContent] = useState(initialContent);

  // Automatically save whenever content changes
  useEffect(() => {
    if (onSave) {
      onSave(content);
    }
  }, [content, onSave]);

  return (
    <Box>
      <ReactQuill value={content} onChange={setContent} theme="snow" />
    </Box>
  );
}

export default RichTextEditor;
