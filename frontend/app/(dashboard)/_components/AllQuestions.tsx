"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { DeleteIcon, Edit, EllipsisVertical, Flag } from "lucide-react";
import { formatMessageTime } from "@/app/lib/foramatData";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Delete from "./Delete";

export interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    _id: string;
    role: string;
    username: string;
    profilePicture?: string;
  };
  createdAt: string;
}

const AllQuestions = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { authUser } = useAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${url}/api/post/get-all-posts`, {
          params: { page, limit: 10, search: "", tag: undefined, sortBy: "newest" },
          withCredentials: true,
        });
        if (data.success) {
          setPosts(prev => [...prev, ...data.data]);
          setHasMore(data.currentPage < data.totalPages);
          setPage(prev => prev + 1);
        }
      } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        setError(
          axiosError?.response?.data?.message || "Failed to fetch posts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [url]);
  // Detect mobile or desktop screen
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="w-full mt-4 mx-auto">
      <h1 className="text-2xl font-medium mb-4">All Posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div
            onClick={() => router.push(`/dashboard/${post._id}`)}
            key={post._id}
            className="w-full p-2 border-1 border-gray-300/50 shadow"
          >
            <div className="flex  justify-between">
              <div className="w-4/5">
                <div className="flex items-center gap-1 mb-4">
                  <div className="w-7 h-7 flex items-center justify-center bg-[#6A69FD] rounded-full">
                    <p className="text-xl font-medium text-center text-white">
                      {post.author.username.charAt(0)}
                    </p>
                  </div>
                  <div className="-space-y-1.5 text-sm">
                    <p>{post.author.username}</p>
                    <p className="text-gray-500 text-xs">{post.author.role}</p>
                  </div>
                </div>
                <div className="">
                  <h3 className="font-medium text-xl">{post?.title}</h3>
                  <p className="text-[15px] text-gray-600">
                    {post?.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag: string, index: number) => (
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
                    {
                      post.author?._id === authUser?._id ? (
                        <>
                        <p className="cursor-pointer text-sm">
                      <Edit className="inline mr-2 mb-1" size={14} />
                      Edit
                    </p>
                    <hr className="my-2 border-t border-gray-500" />
                      <Delete /></>)  :
                    (
                      <p className="cursor-pointer text-sm">
                      <Flag className="inline mr-2 mb-1" size={14} />
                      Report
                    </p>
                    )
                  }
                  </div>
                </div>
                <p className="text-sm">{formatMessageTime(post.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuestions;
