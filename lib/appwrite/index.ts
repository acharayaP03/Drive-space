/**
 * @appwrite/sdk for client
 * it will allow you to interact with appwrite server
 */
import { cookies } from 'next/headers';
import { appwriteConfig } from './config';

import { Account, Client, Databases, Storage, Avatars } from 'node-appwrite';

// createSessionClient function will create a new client and set the session

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get('appwrite-session');
  if (!session || !session.value) throw new Error('No session found');

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

/**
 * @description
 * Admin level access to person who has higher access
 */

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage(){
        return new Storage(client);
    },
    get Avatars(){
        return new Avatars(client);
    }
  };
};
