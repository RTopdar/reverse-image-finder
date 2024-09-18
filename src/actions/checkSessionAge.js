import { getSession, signOut } from "next-auth/react";

export const checkSessionAge = async (req, res, next) => {
  const session = await getSession({ req });

  if (session) {
    const sessionAge = Date.now() - new Date(session.createdAt).getTime();
    const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;

    if (sessionAge > sixHoursInMilliseconds) {
      await signOut({ redirect: false });
      res.writeHead(302, { Location: "/login" });
      res.end();
      return;
    }
  }

  next();
};
