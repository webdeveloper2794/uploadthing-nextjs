import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Posts from "@/models/Posts";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export async function POST(request) {
  const session = await auth();
  console.log("%c%s", "color: #731d1d", "POST request session", session);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, images, content } = await request.json(); // Update this line
  const userEmail = session.user.email;

  await connectDB();
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const post = new Posts({
    title,
    images,
    content,
    author: user.name,
  });

  try {
    await post.save();
    return NextResponse.json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error saving post:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await connectDB();
  // Fetch posts that belong to the logged-in user
  const posts = await Posts.find().lean();
  return NextResponse.json(posts);
}
