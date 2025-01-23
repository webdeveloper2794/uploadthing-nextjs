"use client";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import RemoveButton from "@/components/RemoveButton";

export default function Upload() {
  const [images, setImages] = useState([]);
  const [imageKey, setImageKey] = useState(null);
  console.log("%c%s", "color: #00e600", JSON.stringify(images));

  const handleRemove = () => {
    setImages([]); // Clear the image from the state
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // setImage(url?.[0].url);
          const uploadedImages = res.map((file) => ({
            url: file.url,
            key: file.key,
          }));
          setImages((prevImages) => [...prevImages, ...uploadedImages]);
          setImageKey(res[0].key);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      <div className="mt-4 flex gap-4">
        {images &&
          images.map((image) => (
            <div key={image.key} className="flex flex-col items-center shadow">
              <Image
                src={image.url}
                alt="Uploaded Image"
                width={128}
                height={128}
                className="rounded-md"
              />
              <RemoveButton
                images={image.key}
                onRemove={() => handleRemove(image.key)}
              />
            </div>
          ))}
        {/* {image ? (
          <div className="flex flex-col items-center">
            <Image
              src={image}
              alt="Uploaded Image"
              width={128}
              height={128}
              className="rounded-md"
            />
            <RemoveButton images={imageKey} onRemove={handleRemove} />
          </div>
        ) : (
          <p>No image selected</p>
        )} */}
      </div>
    </main>
  );
}
