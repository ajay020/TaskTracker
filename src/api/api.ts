// @ts-ignore
import { Client, Databases, Account, ID } from "appwrite";
import { Server } from "../utils/config";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let client = new Client();

    client.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(client);
    const database = new Databases(client);

    // @ts-ignore
    api.sdk = { database, account };
    return api.sdk;
  },

  // @ts-ignore
  createAccount: (email: string, password: string, name: string) => {
    // @ts-ignore
    return api?.provider()?.account?.create(ID.unique(), email, password, name);
  },

  getAccount: () => {
    // @ts-ignore
    let account = api.provider().account;
    return account.get();
  },

  // @ts-ignore
  createSession: (email, password) => {
    // @ts-ignore
    return api?.provider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    // @ts-ignore
    return api.provider().account.deleteSession("current");
  },

  // @ts-ignore
  createDocument: (databaseId, collectionId, data, permissions) => {
    console.log({ data });
    // @ts-ignore
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        data,
        permissions
      );
  },

  // @ts-ignore
  listDocuments: (databaseId, collectionId) => {
    // @ts-ignore
    return api.provider().database.listDocuments(databaseId, collectionId);
  },

  // @ts-ignore
  getDocument: (databaseId, collectionId, taskId) => {
    // @ts-ignore
    return api
      .provider()
      .database.getDocument(databaseId, collectionId, taskId);
  },

  // @ts-ignore
  updateDocument: (databaseId, collectionId, documentId, data) => {
    // @ts-ignore
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  // @ts-ignore
  deleteDocument: (databaseId, collectionId, documentId) => {
    // @ts-ignore
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },
};

export default api;
