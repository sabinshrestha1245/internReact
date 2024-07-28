'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Spin } from 'antd';

// Function to fetch posts from the API
const fetchPosts = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };

    getPosts();
  }, []);

  // Columns for the table
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Body', dataIndex: 'body', key: 'body' },
  ];

  return (
    <div>
      <h1>Posts</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={posts} columns={columns} rowKey="id" />
      )}
      <Button type="primary" style={{ marginTop: 16 }}>
        Add Post
      </Button>
    </div>
  );
}
