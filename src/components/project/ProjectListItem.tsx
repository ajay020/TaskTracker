import React, { useState, useCallback } from "react";

import IconButton from "@mui/material/IconButton";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditProjectPopover from "./EditProjectPopover";
import Brightness1Icon from "@mui/icons-material/Brightness1";

type PropType = {
  project: Project;
  handleProjectItemClick: (p: string) => void;
};

const ProjectListItem = ({ project, handleProjectItemClick }: PropType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "project-popover" : undefined;

  return (
    <div>
      <ListItem
        key={project.$id}
        disablePadding
        sx={{
          pr: 5,
        }}
        secondaryAction={
          <Box>
            <IconButton
              edge="end"
              aria-describedby={id}
              aria-label="more"
              onClick={handleMoreClick}
            >
              <MoreHoriz />
            </IconButton>
            <EditProjectPopover
              anchorEl={anchorEl}
              handleClose={handleClose}
              project={project}
            />
          </Box>
        }
      >
        <ListItemButton onClick={() => handleProjectItemClick(project.$id)}>
          <ListItemIcon>
            <Brightness1Icon />
          </ListItemIcon>
          <ListItemText primary={project.name} />
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default ProjectListItem;
