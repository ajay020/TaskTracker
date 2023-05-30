import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { useGetTasks } from "../hooks/useGetTasks";
import DrawerLeft from "../components/Drawer";

const Home = () => {
  const [stale, setStale] = useState({ stale: false });
  const [{ tasks, isLoading, isError }] = useGetTasks(stale);

  console.log("Home render");

  //   console.log({ tasks });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>Something went wrong...</h2>;
  }
  return (
    <Box>
      <DrawerLeft tasks={tasks} />
    </Box>
  );
};

export default Home;
