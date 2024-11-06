import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Box, Grid, CardMedia, CardActions, Button } from '@mui/material';
import 'react-quill-new/dist/quill.snow.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts when the component is mounted
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Helper function to truncate text content
  const truncateText = (text, limit) => {
    const plainText = text.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags
    return plainText.length > limit ? `${plainText.substring(0, limit)}...` : plainText;
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to My Blog
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardMedia
            component="img"
            height="300"
            image="https://via.placeholder.com/1200x400" // Placeholder image
            alt="Featured Blog"
          />
        </Card>
      </Box>

      {/* Blog Posts */}
      <Grid container spacing={4}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                  {/* Optional Post Image */}
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://via.placeholder.com/400x200" // Placeholder post image
                    alt="Post Image"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {truncateText(post.content, 150)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created: {new Date(post.created_at).toLocaleString()}
                    </Typography>
                    {post.updated_at && post.updated_at !== post.created_at && (
                      <Typography variant="body2" color="textSecondary">
                        Last Updated: {new Date(post.updated_at).toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No posts available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default BlogPage;
