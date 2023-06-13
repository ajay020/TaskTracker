import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DrawerLeft from "../components/Drawer";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";
import { getUserTasks } from "../utils/service";
import { TaskType } from "../types/task";
import CircularProgress from "@material-ui/core/CircularProgress";

import "../utils/userService";

const filterTasksByCompleted = (tasks: TaskType[], completed: boolean) => {
  if (tasks) {
    return tasks.filter((task) => {
      if (!task.completed || task.completed === completed) {
        return true;
      }
      return false;
    });
  }
  return [];
};

const Home = () => {
  //   console.log("Home render");
  const { user } = useContext(UserContext) ?? {};

  // Fetch all tasks
  const { data, isLoading, isError } = useQuery(["tasks"], () =>
    getUserTasks(user?.$id)
  );

  const incompleteTasks = filterTasksByCompleted(data?.documents, false);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress value={67} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography textAlign={"center"} sx={{ mt: 4 }}>
        Something went wrong...
      </Typography>
    );
  }
  return (
    <Box>
      <DrawerLeft tasks={incompleteTasks} />
    </Box>
  );
};

export default Home;
