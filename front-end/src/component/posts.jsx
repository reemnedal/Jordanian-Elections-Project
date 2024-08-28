// src/components/Posts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold text-black mb-12">
        إعلانات المرشحين
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl bg-white shadow-md"
          >
            <img
              src={post.url_picture}
              alt={`Post ${index + 1}`}
              className="w-full h-56 object-cover transition-opacity duration-300 hover:opacity-80"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-black mb-4">
                {post.list_name}
              </h3>
              <p className="text-gray-700">{post.description}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-gray-300 to-gray-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
