"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { formatMessageTime } from "@/app/lib/foramatData";

export interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    role: string;
    username: string;
    profilePicture?: string;
  };
  createdAt: string;
}

const AllQuestions = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${url}/api/post/get-all-posts`, {
        withCredentials: true,
      });
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full mt-4 mx-auto">
      <h1 className="text-2xl font-medium mb-4">All Posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="w-full p-2 border-1 border-gray-100/10 shadow"
          >
            <div className="flex  justify-between">
              <div className="w-4/5">
                <div className="flex items-center gap-1 mb-4">
                  <div className="w-7 h-7 flex items-center justify-center bg-[#6A69FD] rounded-full">
                    <p className="text-xl text-center text-white mb-1">
                      {post.author.username.charAt(0)}
                    </p>
                  </div>
                  <div className="-space-y-1.5 text-sm">
                    <p>{post.author.username}</p>
                    <p className="text-gray-500">{post.author.role}</p>
                  </div>
                </div>
                <div className="">
                  <h3 className="font-medium text-xl">{post?.title}</h3>
                  <p className="text-[15px] text-gray-600">
                    {post?.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/5 flex flex-col items-center justify-between">
                <p>{formatMessageTime(post.createdAt)}</p>
                <div className="flex items-center justify-between gap-9">
                  {likedPosts[post._id] ? (
                    <>
                      <FaThumbsUp
                        onClick={() => toggleLike(post._id)}
                        className="w-5 h-5"
                      />
                    </>
                  ) : (
                    <>
                      <ThumbsUp
                        onClick={() => toggleLike(post._id)}
                        className="w-5 h-5"
                      />
                    </>
                  )}

                  {likedPosts[post._id] ? (
                    <>
                      <ThumbsDown
                        onClick={() => toggleLike(post._id)}
                        className="w-5 h-5"
                      />
                    </>
                  ) : (
                    <>
                      <FaThumbsDown
                        onClick={() => toggleLike(post._id)}
                        className="w-5 h-5"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuestions;
