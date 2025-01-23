"use server";
import React from "react";
import { utapi } from "@/server/uploadthing";
import Files from "@/components/Files";
// import { getFiles, deleteFiles } from "@/actions/file.action";
async function getFiles() {
  const res = await utapi.listFiles();
  return res;
}
async function deleteFiles(fileKey) {
  const res = await utapi.deleteFiles(fileKey);
  return res;
}
export default async function Home() {
  const data = await getFiles();
  const handleDelete = async (fileKey) => {
    "use server";
    await deleteFiles(fileKey);
    // Refresh data after deletion
    const newData = await getFiles();
    return newData;
  };

  return (
    <div className="flex w-full py-12 mx-auto gap-4">
      <div className="flex  py-12 mx-auto">
        <Files data={data.files} />
      </div>
    </div>
  );
}
