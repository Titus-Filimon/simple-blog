import React, { useState, useEffect } from "react";
import axios from "axios";

import CreatePost from "./components/createPost";
import PostList from "./components/postList";
import UpdatePost from "./components/updatePost";

import { Container, Typography } from "@mui/material";

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  // Fetch all posts from the backend (Initial Load)
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts/");
      setPosts([...response.data]); // Spread operator to create a new array reference to trigger re-render
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // UseEffect to fetch posts when component is first mounted
  useEffect(() => {
    fetchPosts();
  }, []);

  // Create Post Handler
  const handleCreate = async (newPostData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/posts/",
        newPostData
      );
      setPosts((prevPosts) => [...prevPosts, response.data]); // Add the newly created post to the existing posts
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Update Post Handler (only when the update is submitted)
  const handleUpdateSubmit = async (updatedPost) => {
    try {
      await axios.put(
        `http://localhost:8000/posts/${updatedPost.id}/`,
        updatedPost
      );
      await fetchPosts(); // Re-fetch posts after successfully updating a post
      setEditingPost(null); // Close the editing form
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Delete Post Handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}/`);
      await fetchPosts(); // Re-fetch posts after deleting a post
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Blog
      </Typography>
      {editingPost ? (
        <UpdatePost
          post={editingPost}
          onUpdate={handleUpdateSubmit}
          cancelEdit={() => setEditingPost(null)}
        />
      ) : (
        <CreatePost onPostCreated={handleCreate} />
      )}
      <PostList
        posts={posts}
        onEdit={(post) => setEditingPost(post)} // Set the post for editing, but don’t trigger fetch
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default App;
