"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";

/**
 * 1. User enters full name and email
 * 2. Check if the user already exist using the email address
 * 3. Send OTP  to user's email (this will send a secret key for creating session. This key will be used to create a session)
 * 4. Create a new user document if hte user is a newe user.
 * 5. Return the user's accountId that will be used to complete the login.
 * 6. Verify OTP and authenticate to login.
 */

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("email", [email])],
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.error(error);
  throw new Error(message);
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const accountId = await sendEmailOTP({ email });
  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        accountId,
        avatar: avatarPlaceholderUrl,
      },
    );
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    // set cookie
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

/**
 * @description
 * retrieve user's information
 */

export const getCurrentLoggedInUser = async () => {
  const { databases, account } = await createSessionClient();
  const result = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", result.$id)],
  );

  if (user.total <= 0) return null;

  return parseStringify(user.documents[0]);
};

/**
 * @description
 * Sign in user
 */

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      await sendEmailOTP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, message: "User not found." });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
/**
 * @description
 * logout user
 */

export const singOutUser = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");

    // remove cookie
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to logout user");
  } finally {
    redirect("/login");
  }
};
