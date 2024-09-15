// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           redirect_uri: process.env.GOOGLE_REDIRECT_URI,
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       async authorize(credentials) {
//         if (!credentials.email || !credentials.password) {
//           console.log("Missing email or password");
//           return null;
//         }

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user) {
//           console.log("User not found");
//           throw new Error("User not found");
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           console.log("Invalid password");
//           throw new Error("Invalid password");
//         }

//         console.log("User authorized", user);
//         return user;
//       },
//     }),
//   ],
//   secret: process.env.NEXT_AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   debug: false,
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       console.log("signIn callback", { user, account, profile });

//       if (!user || !account) {
//         console.log("User or account is undefined");
//         return false;
//       }

//       const email = user.email;

//       if (!email) {
//         console.log("Email not found");
//         return false;
//       }

//       try {
//         const existingUser = await prisma.user.findUnique({
//           where: { email },
//         });

//         if (!existingUser) {
//           await prisma.user.create({
//             data: {
//               email,
//               name: user.name,
//               image: user.image,
//               fromGoogle: account.provider === "google",
//               accounts: {
//                 create: {
//                   provider: account.provider,
//                   providerAccountId: account.providerAccountId,
//                   type: account.type,
//                   id: account.id,
//                   refresh_token: account.refreshToken,
//                 },
//               },
//             },
//           });
//         } else {
//           await prisma.account.upsert({
//             where: {
//               provider_providerAccountId: {
//                 provider: account.provider,
//                 providerAccountId: account.providerAccountId,
//               },
//             },
//             update: { userId: existingUser.id },
//             create: {
//               userId: existingUser.id,
//               provider: account.provider,
//               providerAccountId: account.providerAccountId,
//               type: account.type,
//               id: account.providerAccountId,
//             },
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         return false;
//       }
//       return true;
//     },
//     async jwt({ token, user, account }) {
//       console.log("jwt callback", { token, user, account });

//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//         token.image = user.image;
//         token.provider = account?.provider;
//       }

//       console.log("jwt callback after setting token", token);
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("session callback", { session, token });

//       if (token) {
//         session.id = token.id;
//         session.email = token.email;
//         session.name = token.name;
//         session.image = token.image;
//         session.provider = token.provider;
//         session.fromGoogle = token.provider === "google";
//       }

//       console.log("session callback after setting session", session);
//       return session;
//     },
//   },
// };

// export async function GET(req, res) {
//   return NextAuth(req, res, authOptions);
// }

// export async function POST(req, res) {
//   return NextAuth(req, res, authOptions);
// }

import { handlers } from "@/auth";
export const { GET, POST } = handlers;
