import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";
import "react-quill-new/dist/quill.snow.css";

function BlogPostPage() {
  const { id } = useParams(); // Get the blog post ID from the URL
  const [post, setPost] = useState(null);

  // Fetch the specific post when the component is mounted
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h5" color="textSecondary">
          Loading post...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          {post.title}
        </Typography>
      </Box>
      <Box
        sx={{
          marginBottom: 4,
          padding: "0 16px",
          "& img": { maxWidth: "100%", height: "auto" },
          "& p": { marginBottom: "16px" },
          "& ol, & ul": { marginLeft: "20px", marginBottom: "16px" },
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Typography variant="body2" color="textSecondary">
        Created: {new Date(post.created_at).toLocaleString()}
      </Typography>
      <Box sx={{ textAlign: "left", marginBottom: 4 }}>
        {post.updated_at && post.updated_at !== post.created_at && (
          <Typography variant="body2" color="textSecondary">
            Last Updated: {new Date(post.updated_at).toLocaleString()}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default BlogPostPage;
