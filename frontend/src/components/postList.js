import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Checkbox,
} from "@mui/material";

function PostList({ posts, onEdit, onDelete, onBulkDelete }) {
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Handle checkbox change for individual posts
  const handleSelectPost = (postId) => {
    setSelectedPosts((prevSelected) =>
      prevSelected.includes(postId)
        ? prevSelected.filter((id) => id !== postId)
        : [...prevSelected, postId]
    );
  };

  // Handle "Select All" checkbox change
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // Select all posts
      const allPostIds = posts.map((post) => post.id);
      setSelectedPosts(allPostIds);
    } else {
      // Deselect all posts
      setSelectedPosts([]);
    }
  };

  // Handle bulk delete action
  const handleBulkDelete = () => {
    if (selectedPosts.length > 0) {
      onBulkDelete(selectedPosts);
      setSelectedPosts([]);
    }
  };

  return (
    <Box>
      {/* Select All Checkbox */}
      <Box display="flex" alignItems="center" mb={2}>
        <Checkbox
          checked={
            selectedPosts.length > 0 && selectedPosts.length === posts.length
          }
          indeterminate={
            selectedPosts.length > 0 && selectedPosts.length < posts.length
          }
          onChange={handleSelectAll}
        />
        <Typography>Select All</Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleBulkDelete}
          disabled={selectedPosts.length === 0}
          sx={{ marginLeft: 2 }}
        >
          Delete Selected
        </Button>
      </Box>

      {/* List of Posts */}
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={selectedPosts.includes(post.id)}
                onChange={() => handleSelectPost(post.id)}
              />
              <Typography variant="h6" color="textSecondary">
                Post ID: {post.id}
              </Typography>
            </Box>

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

            {/* Display the rich text content */}
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
