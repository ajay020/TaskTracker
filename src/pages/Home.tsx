import { Box } from "@mui/material";
import DrawerLeft from "../components/Drawer";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";
import { getUserTasks } from "../utils/getUserTasks";
import { TaskType } from "../types/task";

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
  console.log("Home render");

  const { user } = useContext(UserContext) ?? {};

  const { data, isLoading, isError } = useQuery(["tasks"], () =>
    getUserTasks(user?.$id)
  );

  const incompleteTasks = filterTasksByCompleted(data?.documents, false);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Something went wrong...</h2>;
  }
  return (
    <Box>
      <DrawerLeft tasks={incompleteTasks} />
    </Box>
  );
};

export default Home;
