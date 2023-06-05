import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import api from "../api/api";
import { Server } from "../utils/config";
//@ts-ignore
import { Permission, Role } from "appwrite";
import { Priority, TaskType } from "../types/task";
import PrioritySelect from "../components/PrioritySelect";
import { SelectChangeEvent } from "@mui/material/Select";
import MyDatePicker from "../components/MyDatePicker";
import dayjs, { Dayjs } from "dayjs";
import timeImg from "../assets/time_management.svg";
import { Typography } from "@mui/material";

const UpdateTask = () => {
  const [task, setTask] = useState<Partial<TaskType>>({
    title: "",
    description: "",
    priority: Priority.Low,
    due_date: null,
  });

  //   const [{ data }] = useGetProjects();

  //   const [selectedProject, setSelectedProject] = useState("");
  //   const { user } = useContext(UserContext) ?? {};

  //   const handleProjectChange = (event: SelectChangeEvent) => {
  //     setSelectedProject(event.target.value as string);
  //     console.log(event.target.value);
  //   };

  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = (await api.getDocument(
          Server.databaseID,
          Server.taskCollectionID,
          taskId
        )) as TaskType;
        setTask({
          ...task,
          priority: task.priority,
          due_date: task.due_date,
        });
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

  const handlePriorityChange = (e: SelectChangeEvent) => {
    setTask({ ...task, priority: e.target.value as Priority });
  };

  const handleDueDateChange = (newDate: Dayjs | null) => {
    setTask({ ...task, due_date: newDate });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await api.updateDocument(
      Server.databaseID,
      Server.taskCollectionID,
      task?.["$id"],
      {
        title: task?.title,
        description: task?.description,
        priority: task.priority,
        due_date: task.due_date,
      }
    );
    navigate("/app");
    // console.log({ res });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, border: "1px solid lightgray", p: 2 }}
    >
      <Typography variant="h4" textAlign={"center"}>
        Update task
      </Typography>
      <Box>
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

          <PrioritySelect
            handlePriorityChange={handlePriorityChange}
            priority={task?.priority as Priority}
          />

          <Box sx={{ my: 2 }}>
            <MyDatePicker
              handleDueDateChange={handleDueDateChange}
              selectedDueDate={dayjs(task.due_date)}
            />
          </Box>

          <Button type="submit" fullWidth variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateTask;
