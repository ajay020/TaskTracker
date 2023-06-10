import { useCallback, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AddCircleSharp } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import AddProjectDialog from "./AddProjectDialog";
import { useGetProjects } from "../hooks/useGetProjects";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EditProjectPopover from "./EditProjectPopover";
import ProjectListItem from "./ProjectListItem";
import React from "react";
import NextWeekIcon from "@mui/icons-material/NextWeek";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import Brightness1Icon from "@mui/icons-material/Brightness1";

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
        {["Inbox", "Today", "Upcoming", "Filter tasks"].map((text) => (
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
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
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
