// @ts-ignore
import { Client, Account, Database, ID } from "appwrite";

const client = new Client();

const account = new Account(client);
// const databse = new Database(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("6470703c11bab0186636"); // Your project ID

export default account;
