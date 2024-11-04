import React from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

function PostList({ posts, onEdit, onDelete }) {
  return (
    <Box>
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography color="textSecondary">Post ID: {post.id}</Typography>

            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="h5" gutterBottom sx={{ marginRight: 1 }}>
                {post.title}
              </Typography>
              {post.updated_at && post.updated_at !== post.created_at && (
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Edited
                </Typography>
              )}
            </Box>
            <Box>
              <Typography paragraph>{post.content}</Typography>
            </Box>

            <Typography variant="body2" color="textSecondary">
              Created: {new Date(post.created_at).toLocaleString()}
            </Typography>

            {post.updated_at && post.updated_at !== post.created_at && (
              <Typography variant="body2" color="textSecondary">
                Last Updated: {new Date(post.updated_at).toLocaleString()}
              </Typography>
            )}

            <Button
              onClick={() => onEdit(post)}
              variant="outlined"
              sx={{ marginRight: 1, marginTop: 1 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(post.id)}
              variant="outlined"
              color="error"
              sx={{ marginTop: 1 }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default PostList;
