'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Spin, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

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

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [form] = Form.useForm();

  // Fetch posts on component mount
  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    };
    getPosts();
  }, []);

  // Handle form submission for creating/updating posts
  const handleFormSubmit = async (values) => {
    const updatedPosts = [...posts];
    if (editPost) {
      // Update post
      const index = updatedPosts.findIndex((post) => post.id === editPost.id);
      updatedPosts[index] = { ...editPost, ...values };
    } else {
      // Create post
      const newPost = {
        userId: 1,
        id: posts.length + 1,
        ...values,
      };
      updatedPosts.push(newPost);
    }

    setPosts(updatedPosts);
    setModalVisible(false);
    setEditPost(null);
    form.resetFields();
  };

  // Show modal for creating or editing a post
  const showModal = (post = null) => {
    setEditPost(post);
    form.setFieldsValue(post || { title: '', body: '' });
    setModalVisible(true);
  };

  // Handle post deletion
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Columns for the table
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Body', dataIndex: 'body', key: 'body' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
            type="link"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            type="link"
          />
          <Popconfirm
            title="Are you sure to delete this post?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              type="link"
              danger
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Posts</h1>
      <div></div>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Add Post
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={posts} columns={columns} rowKey="id" />
      )}

      <Modal
        title={editPost ? 'Edit Post' : 'Add Post'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditPost(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: 'Please input the body!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editPost ? 'Update Post' : 'Create Post'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Page;
