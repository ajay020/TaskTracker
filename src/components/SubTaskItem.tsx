import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SubTaskType } from "../types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { Server } from "../utils/config";

type PropType = {
  subtask: SubTaskType;
};

const updateSubTask = async (subtask: SubTaskType) => {
  return await api.updateDocument(
    Server.databaseID,
    Server.subTaskCollectionID,
    subtask.$id,
    { completed: subtask.completed }
  );
};

const SubTaskItem = ({ subtask }: PropType) => {
  const [checked, setChecked] = React.useState(subtask.completed);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["subtasks"],
    mutationFn: updateSubTask,

    onSuccess: (data) => {
      queryClient.setQueryData(["subtasks"], (prev: any) => {
        const updatedList = prev?.documents?.filter((stask: SubTaskType) => {
          if (stask.$id === data.$id) {
            return { ...data };
          }
          return stask;
        });

        return {
          documents: [...updatedList],
          total: prev?.total,
        };
      });
    },
  });

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    mutation.mutate({ ...subtask, completed: e.target.checked });
  };

  return (
    <Paper
      elevation={2}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <Checkbox checked={checked} onChange={handleChecked} />

      <Typography sx={{ textDecoration: checked ? "line-through" : "none" }}>
        {subtask.title}
      </Typography>
    </Paper>
  );
};

export default SubTaskItem;
