import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import api from "../api/api";
import { Server } from "../utils/config";
import { Box } from "@mui/material";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await api.listDocuments(
        Server.databaseID,
        Server.collectionID
      );

      setTasks(tasks.documents);

      console.log({ tasks });
    };

    fetchTasks();
  }, []);

  return (
    <Box sx={{ background: "#ccc", p: "3px", mx: "auto", width: "500px" }}>
      <TaskList tasks={tasks} />
    </Box>
  );
};

export default Home;
