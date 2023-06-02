import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../api/api";
import { Server } from "../utils/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import AddTask from "./AddTask";
import { TaskType } from "../types/task";

type PropType = {
  openDialog: boolean;
  handleCloseDialog: () => void;
};

const AddTaskDialog = (props: PropType) => {
  const [task, setTask] = useState<null | Partial<TaskType>>(null);
  //   const query = useAddTask(task);

  const { openDialog, handleCloseDialog } = props;

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>New Task</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        {/* Add task form  */}
        <AddTask handleCloseDialog={handleCloseDialog} />
        {/* Add task form  */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button type="submit" form="add-task-form">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
