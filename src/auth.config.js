import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { getUserByEmail, logSignUp } from "./lib/user";
import bcrypt from "bcrypt";

export default {
  providers: [
    GitHub,
    Google,
    credentials({
      async authorize(credentials) {
        // Validate credentials
        const result = signInSchema.safeParse(credentials);
        if (!result.success) {
          console.error("Validation failed. Please check your input.");
          throw new Error("Validation failed. Please check your input.");
        }

        const { email, password } = result.data;

        // Fetch user by email
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          console.error("No user found with the provided email.");
          throw new Error("No user found with the provided email.");
        }

        // Compare passwords
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
          console.error("Invalid password.");
          throw new Error("Invalid password.");
        }

        // Return user if authentication is successful
        console.log("[OUTPUT FOR SUCCESSFUL AUTHENTICATION]", user);
        
        logSignUp(user.id);
        return user;
      },
    }),
  ],
};
