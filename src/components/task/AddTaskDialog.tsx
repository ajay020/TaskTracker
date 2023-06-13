import { useState } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddTask from "./AddTask";
import { TaskType } from "../../types/task";

type PropType = {
  openDialog: boolean;
  handleCloseDialog: () => void;
};

const AddTaskDialog = (props: PropType) => {
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
