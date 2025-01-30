import Link from "next/link";
import React from "react";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center p-4 border-b border-gray-200/20 ">
      <Link href="/" className="text-xl font-bold">
        Upload<span className="text-red-600">Thing</span>
      </Link>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/post-upload">Upload Post</Link>
      </div>
      <div>
        {session?.user ? (
          <div className="flex gap-2 items-center">
            <Image
              src={session?.user?.image}
              alt="Profile"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold">
                {session?.user?.name?.split(" ")[0]}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="text-xs">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <Link href="/sign-in">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
