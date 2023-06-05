import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { Server } from "../utils/config";

import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DeleteIcon from "@mui/icons-material/Delete";

interface PropType {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  projectId: string;
}

const deleteProject = async (projectId: string) => {
  return await api.deleteDocument(
    Server.databaseID,
    Server.projectCollectionId,
    projectId
  );
};

const EditProjectPopover = (prop: PropType) => {
  const { anchorEl, handleClose, projectId } = prop;

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
          (p: any) => p.$id !== projectId
        );
        return {
          documents: [...updatedlist],
          total: updatedlist.length,
        };
      });
    },
  });

  const handleDeleteProject = () => {
    mutate(projectId);
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
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
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
