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

type PropType = {
  openDialog: boolean;
  handleCloseDialog: () => void;
};

export default function AddProjectDialog({
  openDialog,
  handleCloseDialog,
}: PropType) {
  const [name, setName] = useState("");

  // Access the client
  const queryClient = useQueryClient();

  const createProject = async (name: string) => {
    const project = await api.createDocument(
      Server.databaseID,
      Server.projectCollectionId,
      { name },
      []
    );
    return project;
  };

  const { mutate, error, isError, isLoading } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      handleCloseDialog();

      // Update the project list in the cache manually
      queryClient.setQueryData(["projects"], (oldData: any) => {
        // Add the new project to the existing project list
        console.log({ oldData });
        return {
          documents: [...oldData?.documents, { ...data }],
          count: oldData.count + 1,
        };
      });

      // Invalidate and refetch
      //   queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleAddProject = () => {
    mutate(name);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          {isError && (
            <Typography sx={{ color: "red" }}>{error as string}</Typography>
          )}
          {isLoading && (
            <Typography sx={{ color: "green" }}>Adding...</Typography>
          )}
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
          <Button onClick={handleAddProject}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
