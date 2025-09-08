"use server"

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
export type Errors = { title?: string; description?: string; tags?: string[]; form?: string };
export type FormState = { errors: Errors };

export async function submitAction(prevState: FormState, formData: FormData){
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const tagsInput = String(formData.get("tags") || "");
  const tags = tagsInput
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const errors: Errors = {};
  if (!title) errors.title = "Title is required";
  if (!description) errors.description = "Description is required";
  if (tags.length === 0) errors.tags = ["Tags is required"];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // Example post
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!url) throw new Error("BACKEND_URL is missing");
    // 🔑 Get the cookie from the user request
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    await axios.post(`${url}/api/post/create-post`, { title, description, tags },
      // withCredentials is not needed for server-to-server, but harmless
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
  } catch (err) {
    // Optional: map server error into a field or a general error
    const axiosError = err as AxiosError<{ message: string }>;
    console.log(axiosError)
    return { errors: { form: axiosError.response?.data.message } };
  }
}