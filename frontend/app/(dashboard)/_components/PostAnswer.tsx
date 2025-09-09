import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import { Send } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import { Answer } from "../dashboard/[id]/page";

const PostAnswer = ({ id, onCreated }: { id: string; onCreated: (answer: Answer) => void }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${url}/api/answer/create-answer`,
        {
          content: content.trim(),
          questionId: id,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        const created = data.answer;
        if (created) {
          onCreated(created);
        }
        setContent("");
      }
    } catch (error) {
      const AxiosError = error as AxiosError<{ message: string }>;
      console.log(AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[95%] mx-auto md:mx-4 md:w-[75%]"
    >
      <div className="flex flex-col">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your detailed medical answer here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />

        <Button
          type="submit"
          className="mt-4 flex float-right items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          disabled={loading || !content.trim()}
        >
          {loading ? "Commenting Answer..." : "Comment Answer"}
          <Send className="w-5 h-5 mt-1" />
        </Button>
      </div>
    </form>
  );
};

export default PostAnswer;
