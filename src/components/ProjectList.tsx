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

type PropType = {
  handleProjectItemClick: (p: string) => void;
};

const ProjectList = ({ handleProjectItemClick }: PropType) => {
  const [openDialog, setOpenDialog] = useState(false);
  //@ts-ignore
  const [{ data, isLoading, isError }] = useGetProjects();

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  return (
    <div>
      <List>
        {["Today", "Tomorrow", "Upcoming"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
        {isLoading && (
          <ListItem>
            <CircularProgress size={"sm"} />
          </ListItem>
        )}
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

export default ProjectList;
