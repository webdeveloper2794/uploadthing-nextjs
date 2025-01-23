"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

export default function Upload() {
  const [images, setImages] = useState([]);

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between p-8">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // setImage(url?.[0].url);
          const uploadedImages = res.map((file) => ({
            url: file.url,
            key: file.key,
            name: file.name,
          }));
          setImages((prevImages) => [...prevImages, ...uploadedImages]);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      <div className="mt-4 flex gap-4 flex-wrap max-w-xl">
        {images &&
          images.map((image) => (
            <div
              key={image.key}
              className="flex flex-col items-center shadow space-y-2"
            >
              <Image
                src={image.url}
                alt="Uploaded Image"
                width={250}
                height={250}
                className="rounded-md"
              />
              <p className="text-lg text-red-400">{image.name}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
