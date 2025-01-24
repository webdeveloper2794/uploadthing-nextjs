import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("instagram");
      }}
      className="flex justify-center mt-12 gap-4 mx-auto w-full max-w-md "
    >
      <button
        type="submit"
        className="flex justify-center items-center bg-red-600 py-2 px-4 rounded-md"
      >
        Signin with Instagram
      </button>
    </form>
  );
}
