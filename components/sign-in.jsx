import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("instagram");
      }}
    >
      <button type="submit">Signin with Instagram</button>
    </form>
  );
}
