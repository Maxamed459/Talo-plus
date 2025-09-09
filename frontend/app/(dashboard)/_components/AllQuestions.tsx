"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ArrowRight, Edit, EllipsisVertical, Flag } from "lucide-react";
import { formatMessageTime } from "@/app/lib/foramatData";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Delete from "./Delete";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Post {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  answers: string[];
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { authUser } = useAuth();
  const fetchPosts = async (reset = false) => {
    setLoading(true);
    setError("");
    
    try {
      const { data } = await axios.get(`${url}/api/post/questions`, {
        params: { 
          page: reset ? 1 : page, 
          limit: 10, 
          search: searchTerm, 
          tag: selectedTag || undefined, 
          sortBy: sortBy 
        },
        withCredentials: true,
      });
      
      if (data.success) {
        if (reset) {
          setPosts(data.data);
          setPage(2);
        } else {
          setPosts(prev => [...prev, ...data.data]);
          setPage(prev => prev + 1);
        }
        setHasMore(data.currentPage < data.totalPages);
        setTotalPages(data.totalPages);
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

  // Reset and fetch when search/filter changes
  useEffect(() => {
    setPosts([]);
    setPage(1);
    fetchPosts(true);
  }, [searchTerm, selectedTag, sortBy]);

  // Load more posts
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchPosts();
    }
  };
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
    <div className="w-full mx-auto">
      {/* Search and Filter Controls */}
      <div className="mb-4 w-[85%] md:w-full flex gap-2">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1 border border-slate-800 rounded-md w-4/5"
        />
        <Select
          value={sortBy}
          onValueChange={(value: string) => setSortBy(value)}
        >
          <SelectTrigger className="w-1/5 border-slate-700">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {loading && posts.length === 0 && <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-28 w-28 border-b-4 border-b-[#CCF913] border-t-4 border-t-[#6A67FC]"></div>
    </div>}
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
                <div className="w-full">
                  <h3 className="font-medium text-xl">{post?.title}</h3>
                  <p className="text-[15px] text-gray-600">
                    {post?.description}
                  </p>
                  <div className="flex flex-wrap gap-2 my-2">
                    {post.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-[15%] border-l-4 border-[#6A69FD]">
                    <p className="px-2 bg-[#6A69FD]/20 font-medium text-black rounded-r-full">answers {post.answers?.length || 0}</p>
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
      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-4 text-black disabled:opacity-50 flex items-center justify-center gap-1 border-l-3 border-[#6A67FC]"
        >
          
          <p className="px-2">{loading ? "Loading..." : "Read More"}</p>
          <ArrowRight className="w-4 h-4 mt-1" />
          
        </button>
      )}
    </div>
  );
};

export default AllQuestions;
