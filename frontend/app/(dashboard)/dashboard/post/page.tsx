"use client";
import { FormState, submitAction } from "@/action/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";

export interface Question {
  title: string;
  description: string;
  tags: string[];
}

const Questionpage = () => {

  const initialState: FormState = {
    errors: {}
  }

  const [state, formAction, isPending] = useActionState(
    submitAction, 
    initialState
  )

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="p-6 w-[90%]">
        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-medium">post</h1>
          <p className="text-[15px] text-gray-600">
            Enter the title and content and tags below to post your question
          </p>
        </div>

        <form action={formAction} className="w-full">
          <div className="flex flex-col gap-4">
            {state?.errors.form && <div className="p-2 bg-red-300 text-red-800"><p className="text-sm">{state.errors.form}</p></div>}
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-xs">
                title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Enter the title of your question"
              />
              {state?.errors.title && <p className="text-red-600 text-xs">{state?.errors.title}</p>}
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="content" className="text-xs">
                description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter the content of your question"
              />
              {state?.errors.description && <p className="text-red-600 text-xs">{state.errors.description}</p>}
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="tags" className="text-xs">
                tags
              </Label>
              <Input name="tags" id="tags" type="text"  />
              {state?.errors.tags && <p className="text-red-600 text-xs">{state?.errors.tags}</p>}
            </div>
            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#000b58] hover:bg-[rgba(0,10,88,0.94)]"
                disabled={isPending}
              >
                {isPending ? "posting.." : "Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questionpage;
