import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProjectDialog from "./EditProjectDialog";
import api from "../../api/api";
import { Server } from "../../utils/config";
import { useNavigate } from "react-router-dom";

interface PropType {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  project: Project;
}

const deleteProject = async (projectId: string) => {
  return await api.deleteDocument(
    Server.databaseID,
    Server.projectCollectionId,
    projectId
  );
};

const EditProjectPopover = (prop: PropType) => {
  const { anchorEl, handleClose, project } = prop;
  const [openDialog, setopenDialog] = React.useState(false);

  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setopenDialog(true);
  };

  const handleDialogClose = () => {
    setopenDialog(false);
  };

  //   console.log("Edit Project render");

  const queryClient = useQueryClient();
  const open = Boolean(anchorEl);
  const id = open ? "project-popover" : undefined;

  const { mutate } = useMutation({
    mutationKey: ["projects"],
    mutationFn: deleteProject,
    onSuccess: () => {
      handleClose();
      queryClient.setQueriesData(["projects"], (oldProjects: any) => {
        const updatedlist = oldProjects.documents.filter(
          (p: any) => p.$id !== project.$id
        );
        return {
          documents: [...updatedlist],
          total: updatedlist.length,
        };
      });

      navigate("/app");
    },
  });

  const handleDeleteProject = () => {
    mutate(project.$id);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleOpenDialog}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
          {/* Edit dialog  */}
          <EditProjectDialog
            openDialog={openDialog}
            handleDialogClose={handleDialogClose}
            project={project}
          />
          {/* Edit dialog  */}
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleDeleteProject}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};

export default React.memo(EditProjectPopover);
