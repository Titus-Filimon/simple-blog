import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function RichTextEditor({ initialContent = "", onSave }) {
  const [content, setContent] = useState(initialContent);

  // Automatically save whenever content changes
  useEffect(() => {
    if (onSave) {
      onSave(content);
    }
  }, [content, onSave]);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false]}, { font: [] }], // Headers
        [{ size: [] }], // Font sizes
        ["bold", "italic", "underline", "strike"], // Basic formatting
        [{ color: [] }, { background: [] }], // Font colour and background
        [{ list: "ordered" }, { list: "bullet" }], // Lists
        [{ align: [] }], // Text alignment
        ["blockquote", "code-block"], // Blockquote and code block
        ["link", "image", "video"], // Links, images, and videos
        // ["clean"], // Clear formatting button  (might cause frustrations if miss-clicked)
      ],
    },
  };


  return (
    <Box sx={{ height: "450px", mb: 2 }}>
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        style={{ height: "400px" }}
        modules={modules}
      />
    </Box>
  );
}

export default RichTextEditor;
