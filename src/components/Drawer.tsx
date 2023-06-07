import { styled, useTheme } from "@mui/material/styles";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import { useState } from "react";
import TaskList from "./TaskList";
import { TaskType } from "../types/task";
import ProjectList from "./ProjectList";
import { filterTasks } from "../utils/filterTasks";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    marginTop: theme.spacing(8.5),
    background: "green",
  },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type PropType = {
  tasks: TaskType[];
};

export default function DrawerLeft({ tasks }: PropType) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<null | string>(null);
  const [filterOn, setFilterOn] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  let filteredTasks;

  console.log("Drawerleft render");

  const handleProjectItemClick = (project: string) => {
    // setSelectedProject(project);
    navigate(`?project=${project}`);
  };

  const handleListItemClick = (filter: string) => {
    if (filter === "inbox") {
      navigate("");
      setFilterOn("");
    } else {
      setFilterOn(filter);
    }
  };

  // Filter the tasks based on the URL search parameters
  const queryParams = new URLSearchParams(location.search);
  const param = queryParams.get("project");
  if (param && filterOn) {
    const filteredBytime = filterTasks(tasks, filterOn);

    filteredTasks = filteredBytime?.filter(
      (task) => task.project?.toLowerCase() === param?.toLowerCase()
    );
  } else if (param && !filterOn) {
    filteredTasks = tasks?.filter(
      (task) => task.project?.toLowerCase() === param?.toLowerCase()
    );
  } else if (filterOn) {
    filteredTasks = filterTasks(tasks, filterOn);
  } else {
    filteredTasks = tasks;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Project category list  */}
        <ProjectList
          handleProjectItemClick={handleProjectItemClick}
          handleListItemClick={handleListItemClick}
        />
        {/* Project category list  */}
      </Drawer>
      <Main open={open} sx={{ background: "gray" }}>
        <DrawerHeader />
        <TaskList tasks={filteredTasks} />
      </Main>
    </Box>
  );
}
