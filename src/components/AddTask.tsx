import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material/Select";

import React, { useContext, useState } from "react";
import api from "../api/api";
import { Server } from "../utils/config";
//@ts-ignore
import { Permission, Role } from "appwrite";
import { UserContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import BasicSelect from "./Select";
import { useGetProjects } from "../hooks/useGetProjects";
import MyDatePicker from "./MyDatePicker";
import Box from "@mui/material/Box";
import { Dayjs } from "dayjs";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState<Dayjs | null>(null);

  const [{ data }] = useGetProjects();

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

  const handleProjectChange = (event: SelectChangeEvent) => {
    setSelectedProject(event.target.value as string);
    console.log(event.target.value);
  };

  const handleDueDateChange = (newDate: Dayjs | null) => {
    setSelectedDueDate(newDate);
    // newDate?.format("DD/MM/YYYY");
    // console.log(newDate);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // console.log({ user });

    const task = {
      title,
      description,
      project: selectedProject,
      user: user?.$id,
      due_date: selectedDueDate,
    };
    const res = await api.createDocument(
      Server.databaseID,
      Server.taskCollectionID,
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
        {/* select project  */}
        <BasicSelect
          handleProjectChange={handleProjectChange}
          selectedProject={selectedProject}
          projects={data?.documents}
        />
        {/* select project  */}

        <Box sx={{ my: 2 }}>
          <MyDatePicker
            handleDueDateChange={handleDueDateChange}
            selectedDueDate={selectedDueDate}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddTask;
