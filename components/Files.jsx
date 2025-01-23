import React from "react";
import { utapi } from "@/server/uploadthing";
import { revalidatePath } from "next/cache";
import { deleteFiles } from "@/actions/file.action";

export default async function Files({ data }) {
  //   const handleDelete = async (fileKey) => {
  //     "use server";
  //     await deleteFiles(fileKey);
  //     // Refresh data after deletion
  //     const newData = await getFiles();
  //     return newData;
  //   };
  return (
    <>
      {data.length > 0 && (
        <ul className="flex gap-4 flex-wrap max-w-lg">
          {data.map((file) => (
            <li
              key={file.key}
              className="flex flex-col gap-2 line-clamp-1 truncate w-40"
            >
              <a href={file.url} target="_blank" rel="noreferrer">
                {file.name}
              </a>
              <form
                action={async () => {
                  "use server";
                  await deleteFiles(file.key);
                  revalidatePath("/");
                }}
              >
                <button
                  type="submit"
                  className="bg-red-500 rounded-md px-4 py-2 text-red-800"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
