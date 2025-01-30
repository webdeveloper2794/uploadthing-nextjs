"use client";
import React, { useState } from "react";
import { UploadDropzone, UploadButton } from "@/utils/uploadthing";
import { useFormStatus } from "react-dom";

const PostUpload = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { pending } = useFormStatus();
  console.log("%c%s", "color: #006dcc", pending);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const content = formData.get("content");

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true);
    const postData = {
      title,
      content,
      images, // Include the images array
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Post created successfully");
        setImages([]); // Clear images after successful upload
        e.target.reset(); // Reset the form
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-4">
      <h1 className="text-center text-2xl font-bold mb-4">Post Upload</h1>
      <p className="text-center">This is the post upload page</p>
      <form
        onSubmit={handleSubmit}
        method="post"
        className=" mx-auto flex flex-col gap-4 max-w-sm bg-slate-800 rounded-lg p-4 border border-gray-600 my-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full rounded-md border border-gray-600 p-2 text-gray-700"
          required
        />
        <div className="flex gap-2 ">
          <label htmlFor="images">Images</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
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
          {images.map((image) => (
            <div key={image.key} className="flex gap-2">
              <img src={image.url} alt={image.name} className="w-24 h-24" />
            </div>
          ))}
        </div>

        <input
          type="text"
          name="content"
          placeholder="Content"
          className="w-full rounded-md border border-gray-600 p-2 text-gray-700"
          required
        />
        <button
          type="submit"
          // disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostUpload;
