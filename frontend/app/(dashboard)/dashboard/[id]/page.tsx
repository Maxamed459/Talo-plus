"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Post } from "../../_components/AllQuestions";
import { useParams } from "next/navigation";
import { formatMessageTime } from "@/app/lib/foramatData";
import PostAnswer from "../../_components/PostAnswer";
import { DeleteIcon, Edit, EllipsisVertical } from "lucide-react";

export interface Answer {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    profilePicture?: string;
    role: string;
  };
  question: string;
  createdAt: string;
}

const CommentsPage = () => {
  const { id }: { id: string } = useParams();
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [postData, setPostData] = useState<Post>();
  const [error, setError] = useState<string | undefined>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fetchQuestion = async () => {
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
    if (id) fetchQuestion();

    const fetchAnswers = async () => {
      try {
        const { data } = await axios.get(
          `${url}/api/answer/get-answers/${id}`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          setAnswers(Array.isArray(data.answers) ? data.answers : []);
          setError("");
          console.log(data);
        }
      } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        setError(AxiosError?.response?.data?.message);
      }
    };

    if (id) fetchAnswers();
  }, [url, id]);
  // Detect mobile or desktop screen
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleAnswerCreated = (answer: Answer) => {
    setAnswers((prev) => [answer, ...((Array.isArray(prev) ? prev : []))]);
  };
  return (
    <div>
      <div className="flex flex-col justify-between p-4">
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
                  <p className="text-gray-500 text-xs">
                    {postData.author.role}
                  </p>
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
              <p className="text-sm">{formatMessageTime(postData.createdAt)}</p>
            </div>
          </div>
        )}
          {/* Answers list */}
          <div className="mt-4 overflow-y-auto overflow-x-hidden">
            <h2 className="text-2xl font-bold mb-6">
              Answers ({answers?.length || 0})
            </h2>
            {answers && (
              <>
                {answers.map((answer) => (
                  <div
                    key={answer._id}
                    className="p-2 mb-2 border-1 border-gray-700/10 shadow"
                  >
                    <div className="flex justify-between gap-1 mb-4">
                      <div className="flex items-center gap-1">
                        <div className="w-7 h-7 flex items-center justify-center bg-[#6A69FD] rounded-full">
                          <p className="text-xl font-medium text-center text-white">
                            {answer.author.username.charAt(0)}
                          </p>
                        </div>
                        <div className=" text-sm">
                          <p>{answer.author.username}</p>
                          <p className="text-gray-500 text-xs">
                            {answer.author.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 text-sm text-gray-600">
                        <span>
                          {new Date(answer.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-800 whitespace-pre-wrap px-6">
                      {answer.content}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
      </div>
      <div className="flex items-center gap-4 bottom-0 max-w-screen mx-auto w-full bg-transparent backdrop-blur-[5px] border-t-1 border-gray-500/50 shadow p-2">
        <PostAnswer id={id} onCreated={handleAnswerCreated} />
      </div>
    </div>
  );
};

export default CommentsPage;
