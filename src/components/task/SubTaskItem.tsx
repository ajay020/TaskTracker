import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubTaskType } from "../../types/task";
import { ChangeSubtaskContext } from "./TaskList";
import { Server } from "../../utils/config";
import api from "../../api/api";

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
    onError: (context) => {
      queryClient.setQueryData(["subtasks"], context?.previousSubtasks);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subtasks"] });
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
