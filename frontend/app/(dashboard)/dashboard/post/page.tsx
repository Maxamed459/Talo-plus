"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { FormEvent, useState } from "react";

export interface Question {
  title: string;
  description: string;
  tags: string[];
}

const Questionpage = () => {
  const [formData, setFormData] = useState<Question>({
    title: "",
    description: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]:
        id === "tags"
          ? value
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean) // remove empty tags
          : value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${url}/api/post/create-post`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        console.log("data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="p-6 w-[90%]">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-medium">post</h1>
          <p className="text-[15px] text-gray-600">
            Enter the title and content and tags below to post your question
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-xs">
                title
              </Label>
              <Input
                onChange={handleChange}
                id="title"
                type="text"
                placeholder="Enter the title of your question"
                required
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="content" className="text-xs">
                description
              </Label>
              <Textarea
                id="description"
                onChange={handleChange}
                placeholder="Enter the content of your question"
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="tags" className="text-xs">
                tags
              </Label>
              <Input onChange={handleChange} id="tags" type="text" required />
            </div>
            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#000b58] hover:bg-[rgba(0,10,88,0.94)]"
                disabled={loading}
              >
                {loading ? "posting.." : "Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questionpage;
