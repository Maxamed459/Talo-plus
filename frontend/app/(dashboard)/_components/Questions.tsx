"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Question } from "../dashboard/post/page";
import { formatMessageTime } from "@/app/lib/foramatData";
import { DeleteIcon, Edit, EllipsisVertical, Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export interface Author {
  _id: string;
  username: string;
  role: string;
}

interface QuestionsType extends Question {
  _id: string;
  author: Author;
  answers: string[];
  createdAt: string;
  updatedAt: string;
}

const Questions = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { authUser } = useAuth();
  const [questions, setQuestions] = useState<QuestionsType[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await axios.get(`${url}/api/post/get-user-posts`, {
        withCredentials: true,
      });
      if (data.success) {
        setQuestions(data.posts);
      }
    };
    fetchQuestions();
  }, [url]);

  useEffect(() => {
    if (questions.length > 0) {
      console.log(questions);
    }
  }, [questions]);
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
    <div className="flex flex-col items-center justify-between gap-5">
      {questions.map((question: QuestionsType) => (
        <div
        onClick={() => router.push(`/dashboard/${question._id}`)}
          key={question._id}
          className="w-full p-2 border-1 border-gray-100/10 shadow"
        >
          <div className="flex  justify-between">
            <div className="w-4/5">
              <div className="flex items-center gap-1 mb-4">
                <div className="w-7 h-7 flex items-center justify-center bg-[#6A69FD] rounded-full">
                  <p className="text-xl text-center text-white mb-1">
                    {question.author.username.charAt(0)}
                  </p>
                </div>
                <div className="-space-y-1.5 text-sm">
                  <p>{question.author.username}</p>
                  <p className="text-gray-500">{question.author.role}</p>
                </div>
              </div>
              <div className="">
                <h3 className="font-medium text-xl">{question?.title}</h3>
                <p className="text-[15px] text-gray-600">
                  {question?.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                    {question.tags.map((tag: string, index: number) => (
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
                      question.author?._id === authUser?._id ? (
                        <>
                        <p className="cursor-pointer text-sm">
                      <Edit className="inline mr-2 mb-1" size={14} />
                      Edit
                    </p>
                    <hr className="my-2 border-t border-gray-500" />
                    <p className="cursor-pointer text-sm">
                      <DeleteIcon className="inline mr-2 mb-1" size={14} />
                      Delete
                    </p></>)  :
                    (
                      <p className="cursor-pointer text-sm">
                      <Flag className="inline mr-2 mb-1" size={14} />
                      Report
                    </p>
                    )
                  }
                </div>
              </div>
              <p className="text-sm">{formatMessageTime(question.createdAt)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Questions;
