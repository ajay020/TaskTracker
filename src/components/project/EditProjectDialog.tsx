import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { Server } from "../../utils/config";
import api from "../../api/api";

interface PropType {
  openDialog: boolean;
  handleDialogClose: () => void;
  project: Project;
}

const updateProject = async (project: Project) => {
  return await api.updateDocument(
    Server.databaseID,
    Server.projectCollectionId,
    project.$id,
    { name: project.name }
  );
};

export default function EditProjectDialog(props: PropType) {
  const { openDialog, project, handleDialogClose } = props;
  const [name, setName] = React.useState<string>(project.name);

  //@ts-ignore
  const { mutate, isLoading } = useMutation({
    mutationKey: ["projects"],
    mutationFn: updateProject,
    onSuccess: (data) => {
      handleDialogClose();
      //   console.log({ data });
    },
  });

  const handleUpdateProject = () => {
    mutate({ ...project, name });
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit project</DialogTitle>
        <DialogContent>
          <DialogContentText>{isLoading && "Loading..."}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateProject}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
