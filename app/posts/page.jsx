import React from "react";
import { MdDelete } from "react-icons/md";
import { deleteFiles, deletePost, getPosts } from "@/actions/file.action";
import Image from "next/image";
const PostsPage = async () => {
  const postResponse = await getPosts();

  const posts = await postResponse.json();
  return (
    <>
      <div className="h-screen w-full dark:bg-gray-900">
        <div className="w-full mx-auto py-10 px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              From The Blog
            </h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto mt-8 auto-rows-fr lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
            {posts.length > 0 ? (
              posts.map((post) => (
                <>
                  <article className="relative flex flex-col justify-end px-4 pt-40 pb-1 overflow-hidden bg-gray-900 md:pt-28 isolate rounded-xl dark:shadow dark:shadow-gray-400/50">
                    {post.images && post.images.length > 0 && (
                      <div className="my-2  gap-2 flex justify-center">
                        {post.images.map((image) => (
                          <img
                            key={image.key}
                            src={image.url}
                            alt={image.name || "Post Image"}
                            className="absolute inset-0 object-cover w-full h-full -z-10"
                          />
                        ))}
                      </div>
                    )}

                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                    <div className="absolute inset-0 -z-10 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    <p className="text-lg font-semibold leading-6 text-white ">
                      {post.title}
                    </p>

                    <p className="text-base  leading-6 text-slate-300 ">
                      {post.content}
                    </p>
                    <div className="flex justify-between pt-4 pb-2">
                      <p className="text-sm  italic font-semibold leading-6 text-white ">
                        {post.images[0].name}
                      </p>
                      <p className="text-sm  italic font-semibold leading-6 text-slate-400 ">
                        By {post.author}
                      </p>
                    </div>

                    <form
                      action={async () => {
                        "use server";
                        await deleteFiles(post.images[0].key);
                        await deletePost(post._id);
                      }}
                    >
                      <button
                        type="submit"
                        className="absolute top-2 right-2 border border-red-100 text-sm p-2 rounded-md text-red-600 hover:bg-red-500 hover:text-red-100 transition-colors duration-300 ease-in-out "
                      >
                        <MdDelete size={18} />
                      </button>
                    </form>
                  </article>
                </>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsPage;
