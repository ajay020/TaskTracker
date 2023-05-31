import { useState } from "react";
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

type PropType = {
  handleProjectItemClick: (p: string) => void;
};

const ProjectList = ({ handleProjectItemClick }: PropType) => {
  const [openDialog, setOpenDialog] = useState(false);
  //@ts-ignore
  const [{ data, isLoading, isError }] = useGetProjects();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something is not right.</p>;
  }

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
            <ListItemText>Add</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {data?.documents?.map(({ name, $id }: Project) => (
          <ListItem key={$id} disablePadding>
            <ListItemButton onClick={() => handleProjectItemClick(name)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
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
