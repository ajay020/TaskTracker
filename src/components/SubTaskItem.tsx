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
import { ChangeSubtaskContext } from "./TaskList";

type PropType = {
  subtask: SubTaskType;
};

type QueryType = {
  documents: SubTaskType[];
  total: number;
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

  const changeSubTaskContext = React.useContext(ChangeSubtaskContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["subtasks"],
    mutationFn: updateSubTask,

    // When mutate is called:
    onMutate: async (updatedSTask) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["subtasks"] });

      // Snapshot the previous value
      const previousSubtasks = queryClient.getQueryData(["subtasks"]);

      // Optimistically update subtask when marked as complete
      queryClient.setQueryData(["subtasks"], (old: any) => {
        const updatedList = old.documents?.map((d: SubTaskType) => {
          if (d.$id === updatedSTask.$id) {
            return { ...updatedSTask };
          }
          return d;
        });

        return {
          documents: [...updatedList],
          total: old.total,
        };
      });
      //   notifySubTaskUpdate();
      if (changeSubTaskContext) {
        changeSubTaskContext.handleSubTaskChange();
      }

      // Return a context object with the snapshotted value
      return { previousSubtasks };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, updatedSTask, context) => {
      queryClient.setQueryData(["subtasks"], context?.previousSubtasks);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subtasks"] });
    },

    onSuccess: (data) => {
      //   queryClient.refetchQueries(["subtasks"]);
      //   queryClient.setQueryData(["subtasks"], (prev: any) => {
      //     console.log("subtask updated successfully", data);
      //     const updatedList = prev?.documents?.filter((stask: SubTaskType) => {
      //       if (stask.$id === data.$id) {
      //         return { ...data };
      //       }
      //       return stask;
      //     });
      //     return {
      //       documents: [...updatedList],
      //       total: prev?.total,
      //     };
      //   });
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
