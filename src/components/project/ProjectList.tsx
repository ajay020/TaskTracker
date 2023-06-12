import { useCallback, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { AddCircleSharp } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import AddProjectDialog from "./AddProjectDialog";
import ProjectListItem from "./ProjectListItem";
import React from "react";
import NextWeekIcon from "@mui/icons-material/NextWeek";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";

import { useGetProjects } from "../../hooks/useGetProjects";

const sidebarIcons = [<InboxIcon />, <WbTwilightIcon />, <NextWeekIcon />];

type PropType = {
  handleProjectItemClick: (p: string) => void;
  handleListItemClick: (f: string) => void;
};

const ProjectList = ({
  handleProjectItemClick,
  handleListItemClick,
}: PropType) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  //@ts-ignore
  const [{ data, isLoading, isError }] = useGetProjects();

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  return (
    <div>
      <List>
        {["Inbox", "Today", "Upcoming"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            sx={{
              backgroundColor: selectedItem === text ? "lightgray" : "inherit",
            }}
            onClick={() => handleItemClick(text)}
          >
            <ListItemButton
              onClick={() => handleListItemClick(text.toLowerCase())}
            >
              <ListItemIcon>{sidebarIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleOpenDialog}>
            <ListItemIcon>
              <AddCircleSharp />
            </ListItemIcon>
            <ListItemText>Add New Project</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {data?.documents?.map((p: Project) => (
          <ProjectListItem
            key={p.$id}
            project={p}
            handleProjectItemClick={handleProjectItemClick}
          />
        ))}
      </List>
      <AddProjectDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};

export default React.memo(ProjectList);
