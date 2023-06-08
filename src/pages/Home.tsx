import { Box } from "@mui/material";
import DrawerLeft from "../components/Drawer";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";
import { getUserTasks } from "../utils/getUserTasks";
import { TaskType } from "../types/task";
import CircularProgress from "@material-ui/core/CircularProgress";
import api from "../api/api";
import { Server } from "../utils/config";

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

const fetchSubTasks = async () => {
  return await api.listDocuments(Server.databaseID, Server.subTaskCollectionID);
};

const Home = () => {
  console.log("Home render");

  const { user } = useContext(UserContext) ?? {};

  // Fetch all tasks
  const { data, isLoading, isError } = useQuery(["tasks"], () =>
    getUserTasks(user?.$id)
  );

  // Fetch all subtasks
  const query = useQuery(["subtasks"], fetchSubTasks);

  const incompleteTasks = filterTasksByCompleted(data?.documents, false);

  if (isLoading) {
    return (
      <h2>
        <CircularProgress value={67} />
      </h2>
    );
  }

  if (isError) {
    return <h2>Something went wrong...</h2>;
  }
  return (
    <Box>
      {isLoading && <CircularProgress value={67} />}
      <DrawerLeft tasks={incompleteTasks} />
    </Box>
  );
};

export default Home;
