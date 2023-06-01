import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { useGetTasks } from "../hooks/useGetTasks";
import DrawerLeft from "../components/Drawer";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { Server } from "../utils/config";

const getTasks = async () => {
  return await api.listDocuments(Server.databaseID, Server.taskCollectionID);
};

const Home = () => {
  const [stale, setStale] = useState({ stale: false });
  //   const [{ tasks, isLoading, isError }] = useGetTasks(stale);

  console.log("Home render");

  const { data, isLoading, isError } = useQuery(["tasks"], getTasks);

  //   console.log({ query });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Something went wrong...</h2>;
  }
  return (
    <Box>
      <DrawerLeft tasks={data?.documents} />
    </Box>
  );
};

export default Home;
