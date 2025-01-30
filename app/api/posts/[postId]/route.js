import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Posts from "@/models/Posts";
import mongoose from "mongoose"; // Import mongoose to use ObjectId

export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { postId } = await params; // Correct way to extract postId
    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    // Ensure _id is an ObjectId
    const deletedPost = await Posts.findOneAndDelete({
      _id: postId,
    });

    if (deletedPost.deletedCount === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 }
    );
  }
}
