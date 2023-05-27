import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import api from "../api/api";
import { Server } from "../utils/config";
//@ts-ignore
import { Permission, Role } from "appwrite";
import { TaskType } from "../types/task";

const UpdateTask = () => {
  const [task, setTask] = useState<Partial<TaskType>>({
    title: "",
    description: "",
  });

  //   const { user } = useContext(UserContext) ?? {};

  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = (await api.getDocument(
          Server.databaseID,
          Server.collectionID,
          taskId
        )) as TaskType;
        setTask(task);
        console.log({ task });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let title = event.target.value;
    setTask({ ...task, title });
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let description = event.target.value;
    setTask({ ...task, description });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await api.updateDocument(
      Server.databaseID,
      Server.collectionID,
      task?.["$id"],
      { title: task?.title, description: task?.description }
    );

    navigate("/");

    console.log({ res });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={task?.title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={task?.description}
          onChange={handleDescriptionChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Container>
  );
};

export default UpdateTask;
