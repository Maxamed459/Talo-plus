"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Post } from "../../_components/AllQuestions";
import { formatMessageTime } from "@/app/lib/foramatData";
import { useRouter } from "next/navigation";
import { DeleteIcon, Edit, EllipsisVertical } from "lucide-react";

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
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Detect mobile or desktop screen
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  const router = useRouter();
  return (
    <div className="mx-auto p-4">
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
            onClick={() => router.push(`/dashboard/${post._id}`)}
            key={post._id}
            className="flex  justify-between w-full p-2 border-1 border-gray-100/10 shadow"
          >
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
                <p className="text-[15px] text-gray-600">{post?.description}</p>
                <p>{post?.tags}</p>
              </div>
            </div>
            <div className="w-1/5 flex flex-col items-end justify-between">
              <div
                className={`relative py-2 ${isMobile ? "" : "group"}`}
                onClick={() => isMobile && setMenuOpen((prev) => !prev)}
              >
                <EllipsisVertical />
                <div
                  className={`absolute top-full right-0 z-20 w-32 p-2 rounded-md
          bg-gray-200 border border-gray-600 text-[#000b58] transition-all
          ${
            isMobile
              ? menuOpen
                ? "block"
                : "hidden"
              : "hidden group-hover:block"
          }
          `}
                >
                  <p className="cursor-pointer text-sm">
                    <Edit className="inline mr-2 mb-1" size={14} />
                    Edit
                  </p>
                  <hr className="my-2 border-t border-gray-500" />
                  <p className="cursor-pointer text-sm">
                    <DeleteIcon className="inline mr-2 mb-1" size={14} />
                    Delete
                  </p>
                </div>
              </div>
              <p className="text-sm">{formatMessageTime(post.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
