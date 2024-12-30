"use server";

import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { revalidatePath } from "next/cache";
import {
  getFileType,
  constructFileUrl,
  handleError,
  parseStringify,
} from "@/lib/utils";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { getCurrentLoggedInUser } from "./user.actions";
import { createQueries } from "../queries/api.queries";

/**
 * @description
 * Uploads a file to Appwrite storage and creates a document in the database
 *
 * @param {UploadFileProps} props - The properties required to upload the file
 * @returns {Promise<any>} - The newly created file document
 */
export async function uploadFile({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps): Promise<FileDocument | undefined> {
  const { storage, databases } = await createAdminClient();

  try {
    // Read the file and create an input file object
    const inputFile = InputFile.fromBuffer(file, file.name);

    // Upload the file to Appwrite storage
    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile,
    );

    // Create a file document with metadata
    const fileDocument = {
      type: getFileType(file.type).type, // Get file type
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id), // Get file URL
      extension: getFileType(file.type).extension, // Get file extension
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [], // Add user to file if it's shared
      bucketFieldId: bucketFile.$id,
    };

    // Create a document in the database for the uploaded file
    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument,
      )
      .catch(async (error: unknown) => {
        // If document creation fails, delete the uploaded file from storage
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to upload file");
      });

    // Revalidate the path to update the cache
    revalidatePath(path);

    // Return the newly created file document
    return parseStringify(newFile);
  } catch (error) {
    console.error(error);
    handleError(error, "Failed to upload file");
  }
}

export async function getFiles() {
  const { databases } = await createAdminClient();

  try {
    // get current logged in user
    const currentUser = await getCurrentLoggedInUser();

    if (!currentUser) throw new Error("User not found");

    // create a query to get all files
    const queries = createQueries(currentUser);

    const files = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries,
    );

    return parseStringify(files);
  } catch (error) {
    console.error(error);
    handleError(error, "Failed to get files");
  }
}

export async function renameFiles({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) {
  const newName = `${name}.${extension}`;
  const { databases } = await createAdminClient();
  try {
    const updatedFile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        name: newName,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
}
