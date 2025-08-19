"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Post } from "../../_components/AllQuestions";
import { useParams } from "next/navigation";
import { formatMessageTime } from "@/app/lib/foramatData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const CommentsPage = () => {
  const { id } = useParams();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [postData, setPostData] = useState<Post>();
  const [error, setError] = useState<string | undefined>();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${url}/api/post/get-post/${id}`, {
          withCredentials: true,
        });
        if (data.success) {
          setPostData(data.post);
          setError("");
          console.log(data);
        }
      } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        setError(AxiosError?.response?.data?.message);
      }
    };
    if (id) fetchPost();
  }, [url, id]);

  return (
    <div className="flex flex-col justify-between">
      {error && <div className="bg-red-400 text-red-800 p-2">{error}</div>}
      {postData && (
        <div className="w-full p-2 border-1 border-gray-100/10 shadow flex justify-between">
          <div className="w-4/5">
            <div className="flex items-center gap-1 mb-4">
              <div className="w-7 h-7 flex items-center justify-center bg-[#6A69FD] rounded-full">
                <p className="text-xl font-medium text-center text-white">
                  {postData.author.username.charAt(0).toUpperCase()}
                </p>
              </div>
              <div className="-space-y-1.5 text-sm">
                <p>{postData.author.username}</p>
                <p className="text-gray-500 text-xs">{postData.author.role}</p>
              </div>
            </div>
            <div className="">
              <h3 className="font-medium text-xl">{postData?.title}</h3>
              <p className="text-[15px] text-gray-600">
                {postData?.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {postData.tags.map((tag, index) => (
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
            <p className="text-sm">{formatMessageTime(postData.createdAt)}</p>
          </div>
        </div>
      )}
      <div>
        <h3 className="text-xl font-medium my-4">Comments</h3>
      </div>

      <div className="flex items-center gap-4 fixed bottom-5 w-[90%] md:w-[70%]">
        <Input
          type="text"
          className="w-full flex-3/4"
          placeholder="leave a comment"
        />
        <Button className="w-full flex-1/4">Comment</Button>
      </div>
    </div>
  );
};

export default CommentsPage;
