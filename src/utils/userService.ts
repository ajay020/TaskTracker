//@ts-ignore
import { Client, Account, Storage } from "appwrite";
import { Server } from "./config";

const client = new Client();

export const account = new Account(client);
export const storage = new Storage(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(Server.project); // Your project ID
