"use server";
import { utapi } from "@/server/uploadthing";
import { revalidatePath } from "next/cache";

export async function getFiles() {
  const files = await utapi.listFiles();
  return files;
}

export async function deleteFiles(fileKey) {
  if (!fileKey) throw new Error("File key is required for deletion.");
  const response = await utapi.deleteFiles([fileKey]);
  if (!response.success) throw new Error("Failed to delete file.");

  return response;
}

export const getPosts = async () => {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  if (!posts.ok) {
    return [];
  }
  return posts;
};

export const deletePost = async (postId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
    {
      method: "DELETE",
    }
  );
  revalidatePath("/posts");
  if (!response.ok) {
    return [];
  }
  return response;
};
