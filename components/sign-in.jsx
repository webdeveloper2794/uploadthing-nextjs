import { signIn } from "@/auth";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
export default function SignIn() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
        className="flex flex-col justify-center mt-12 gap-4 mx-auto w-full max-w-sm border p-4 py-8 rounded-md shadow-md"
      >
        <Link href="/" className="text-3xl text-center font-bold ">
          Upload<span className="text-red-600">Thing</span>
        </Link>
        <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>

        <button
          type="submit"
          className="flex gap-2 justify-center items-center bg-white text-black text-sm tracking-wider py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out"
        >
          <FaGithub />
          Signin with Github
        </button>
      </form>
    </div>
  );
}
