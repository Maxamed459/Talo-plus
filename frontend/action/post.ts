"use server"

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    const token = (await cookies()).get("token")?.value || "";
    console.log(token)
    await axios.post(`${url}/api/post/create-post`, { title, description, tags }, {
      headers: {
        Authorization: `Bearer ${token}`,
        // keep Cookie if your backend also reads cookie-based auth/session
        Cookie: (await cookies()).toString(),
        "Content-Type": "application/json",
      },
      // withCredentials is not needed for server-to-server, but harmless
      withCredentials: true,
    });
  } catch (err) {
    // Optional: map server error into a field or a general error
    const axiosError = err as AxiosError<{ message: string }>;
    console.log(axiosError)
    return { errors: { form: axiosError.response?.data.message } };
  }
}