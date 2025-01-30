import React from "react";
import { getFiles } from "@/actions/file.action";
import Files from "@/components/Files";
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getFiles();
  return (
    <div className="flex w-full py-12 mx-auto gap-4">
      <div className="flex  py-12 mx-auto">
        <Files data={data.files} />
      </div>
    </div>
  );
}
