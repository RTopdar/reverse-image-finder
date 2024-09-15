// import { authOptions } from "../api/auth/[...nextauth]/route";
import { auth } from "@/auth";
import Image from "next/image";

export default async function AboutPage() {
  const session = await auth();
  console.log("session in about page", session);

  return (
    <div>
      <h1>About Page</h1>
      {session ? (
        <div>
          <p>Logged in as {session.user.name}</p>
          <p>Email: {session.user.email}</p>
          <p>Provider: {session.user.provider}</p>
          <p>Email verified: {session.user.emailVerified ? "Yes" : "No"}</p>
          <p>From Google: {session.user.fromGoogle ? "Yes" : "No"}</p>
          <p>Created at: {session.user.createdAt}</p>
          <p>Updated at: {session.user.updatedAt}</p>
          <p>Image:</p>
          {session.user.picture ? (
            <Image
              src={session.user.picture}
              alt="User image"
              width={100}
              height={100}
            />
          ) : (
            <p>No image</p>
          )}
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
