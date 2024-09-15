import { signIn } from "next-auth/react";
import { signInSchema } from "@/lib/zod";

export const login = async (values) => {
  const result = signInSchema.safeParse(values);
  if (!result.success) {
    console.error("Validation failed. Please check your input.");
    return {
      success: false,
      message: "Validation failed. Please check your input.",
    };
  }
  const { email, password } = result.data;

  try {
    const status = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("status", status);

    if (status.error) {
      return { success: false, message: status.error };
    }

    return { success: true, message: "User authenticated" };
  } catch (err) {
    console.error(`An unexpected error occurred | ${err}`);
    return {
      success: false,
      message: err.message, // Return the custom error message
    };
  }
};
