"use client";
import React from "react";

const RemoveButton = ({ images, onRemove }) => {
  //   const handleRemove = async () => {
  //     const response = await deleteImage(images);
  //     if (response.success) {
  //       alert("Image successfully deleted");
  //       onRemove(); // Notify parent to update state
  //     } else {
  //       alert("Failed to delete image");
  //     }
  //   };

  return (
    <button
      type="button"
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Remove
    </button>
  );
};

export default RemoveButton;
