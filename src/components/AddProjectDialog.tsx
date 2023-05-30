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

type PropType = {
  openDialog: boolean;
  handleCloseDialog: () => void;
};

export default function AddProjectDialog({
  openDialog,
  handleCloseDialog,
}: PropType) {
  const [name, setName] = useState("");

  const createProject = async () => {
    const project = await api.createDocument(
      Server.databaseID,
      Server.projectCollectionId,
      { name },
      []
    );
    console.log({ project });
    handleCloseDialog();
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Creta a project Name. It will help you categories your tasks.
          </DialogContentText>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            id="projectName"
            label="Project Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={createProject}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
