import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AboutPage() {
  const session = await getServerSession(authOptions);
  console.log("session in about page", session);

  return (
    <div>
      <h1>About Page</h1>
      {session ? (
        <div>
          <p>Logged in as {session.name}</p>
          <p>Email: {session.email}</p>
          <p>Provider: {session.provider}</p>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
