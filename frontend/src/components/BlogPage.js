import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';
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

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Box>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                <Typography
                  variant="body2"
                  paragraph
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
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
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No posts available.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default BlogPage;