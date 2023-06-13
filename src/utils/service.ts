//@ts-ignore
import { Client, Databases, Query } from "appwrite";
import { Server } from "./config";
import { User } from "../types/user";

export const getUserTasks = async (userId: string | undefined) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(Server.project);

  const database = new Databases(client);

  return await database.listDocuments(
    Server.databaseID,
    Server.taskCollectionID,
    [Query.limit(100), Query.equal("user", [userId])]
  );
};

export const getUserSubTasks = async (userId: string | undefined) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(Server.project);

  const database = new Databases(client);

  return await database.listDocuments(
    Server.databaseID,
    Server.subTaskCollectionID,
    [Query.limit(100), Query.equal("userId", [userId])]
  );
};

export const getUserProfile = async (userId: string | undefined) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(Server.project);

  const database = new Databases(client);

  return await database.listDocuments(
    Server.databaseID,
    Server.profileCollectionId,
    [Query.equal("userId", [userId])]
  );
};

export const getUserProjects = async (userId: string | undefined) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(Server.project);

  const database = new Databases(client);

  return await database.listDocuments(
    Server.databaseID,
    Server.projectCollectionId,
    [Query.equal("userId", [userId])]
  );
};
