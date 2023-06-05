import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material/Select";
import api from "../api/api";
import { Server } from "../utils/config";

import React, { useContext, useState } from "react";

//@ts-ignore
import { Permission, Role } from "appwrite";
import { UserContext } from "./UserProvider";
import MyDatePicker from "./MyDatePicker";
import Box from "@mui/material/Box";
import { Dayjs } from "dayjs";
import { Priority, TaskType } from "../types/task";
import PrioritySelect from "./PrioritySelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";

interface PropType {
  handleCloseDialog: () => void;
}

const AddTask = ({ handleCloseDialog }: PropType) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<Priority>(Priority.Low);

  const queryClient = useQueryClient();

  const { user } = useContext(UserContext) ?? {};

  async function createTask(task: Partial<TaskType>) {
    const res = await api.createDocument(
      Server.databaseID,
      Server.taskCollectionID,
      task,
      [
        Permission.read(Role.user(user && user["$id"])),
        Permission.write(Role.user(user && user["$id"])),
      ]
    );
    return res;
  }

  const { mutate, isError, isLoading } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      // Update the tasks list in the cache manually
      queryClient.setQueryData(["tasks"], (oldData: any) => {
        // Add the new tasks to the existing tasks list
        console.log({ oldData });
        return {
          documents: [...oldData?.documents, { ...data }],
          count: oldData.count + 1,
        };
      });

      handleCloseDialog();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (newDate: Dayjs | null) => {
    setSelectedDueDate(newDate);
  };

  const handlePriorityChange = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    setPriority(e.target.value as Priority);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (title && user) {
      const task = {
        title,
        description,
        user: user?.$id,
        due_date: selectedDueDate,
        priority,
        completed: false,
      };

      mutate(task);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box>
        {isError && (
          <Typography sx={{ color: "red" }}>Something is wrong..</Typography>
        )}
        {isLoading && (
          <Typography sx={{ color: "green" }}>Adding...</Typography>
        )}
      </Box>
      <form onSubmit={handleSubmit} id="add-task-form">
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

        {/* select priority  */}
        <PrioritySelect
          handlePriorityChange={handlePriorityChange}
          priority={priority}
        />
        {/* select priority  */}

        <Box sx={{ my: 2 }}>
          <MyDatePicker
            handleDueDateChange={handleDueDateChange}
            selectedDueDate={selectedDueDate}
          />
        </Box>
      </form>
    </Container>
  );
};

export default AddTask;
