/**
 * @description
 * improt all env variables for appwrite
 */

export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
  filesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  secretKey: process.env.NEXT_APPWRITE_SECRET!,
};
