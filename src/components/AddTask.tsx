import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import api from "../api/api";
import { Server } from "../utils/config";
//@ts-ignore
import { Permission, Role } from "appwrite";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(UserContext) ?? {};

  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // console.log({ user });

    const task = { title, description };
    const res = await api.createDocument(
      Server.databaseID,
      Server.collectionID,
      task,
      [
        Permission.read(Role.user(user && user["$id"])),
        Permission.write(Role.user(user && user["$id"])),
      ]
    );
    navigate("/");
    console.log({ res });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddTask;
