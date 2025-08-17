"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Post } from "../../_components/AllQuestions";

const DiscoverPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // search input state
  const [tag, setTag] = useState(""); // tag filter state

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${url}/api/post/get-all-posts`, {
        params: {
          search,
          tag,
        },
        withCredentials: true,
      });

      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError?.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [search, tag, url]);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="p-6 w-[90%] mx-auto">
      <h1 className="text-2xl font-medium mb-4">All Questions</h1>

      {/* Search + Tag Inputs */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search by title/description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Filter by tag..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          onClick={fetchPosts}
          className="bg-[#000b58] hover:bg-[rgba(0,10,88,0.94)]"
        >
          Search
        </Button>
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{post.description}</p>
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
            <p className="text-sm text-gray-600">By: {post.author.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
