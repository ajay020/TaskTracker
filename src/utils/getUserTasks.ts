//@ts-ignore
import { Client, Databases, Query } from "appwrite";
import { Server } from "./config";

export const getUserTasks = async (userId: string | undefined) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(Server.project);

  const databases = new Databases(client);

  return await databases.listDocuments(
    Server.databaseID,
    Server.taskCollectionID,
    [
      Query.equal("user", [userId]),
      //   Query.equal("title", ["task 1"]),
    ]
  );
};
