import { useState } from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { AddCircleSharp } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import AddProjectDialog from "./AddProjectDialog";

const ProjectList = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
        {["Personal", "School", "Work"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
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
