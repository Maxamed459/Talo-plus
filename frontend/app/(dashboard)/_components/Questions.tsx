"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Question } from "../dashboard/post/page";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { formatMessageTime } from "@/app/lib/foramatData";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

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
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

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

  return (
    <div className="flex flex-col items-center justify-between gap-5">
      {questions.map((question: QuestionsType) => (
        <div
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
                <p>{question?.tags}</p>
              </div>
            </div>
            <div className="w-1/5 flex flex-col items-center justify-between">
              <p>{formatMessageTime(question.createdAt)}</p>
              <div className="flex items-center justify-between gap-9">
                {likedPosts[question._id] ? (
                  <>
                    <FaThumbsUp
                      onClick={() => toggleLike(question._id)}
                      className="w-5 h-5"
                    />
                  </>
                ) : (
                  <>
                    <ThumbsUp
                      onClick={() => toggleLike(question._id)}
                      className="w-5 h-5"
                    />
                  </>
                )}

                {likedPosts[question._id] ? (
                  <>
                    <ThumbsDown
                      onClick={() => toggleLike(question._id)}
                      className="w-5 h-5"
                    />
                  </>
                ) : (
                  <>
                    <FaThumbsDown
                      onClick={() => toggleLike(question._id)}
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
  );
};

export default Questions;
