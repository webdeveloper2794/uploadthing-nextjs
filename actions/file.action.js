"use server";
import { utapi } from "@/server/uploadthing";

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
