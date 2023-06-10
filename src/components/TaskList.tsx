import { TaskType } from "../types/task";
import Task from "./Task";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import React, { SetStateAction, useContext } from "react";
import { getUserSubTasks } from "../utils/service";
import { UserContext } from "./UserProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

type PropType = {
  tasks: TaskType[] | [];
};

type ContextType = {
  handleSubTaskChange: () => void;
};

export const ChangeSubtaskContext = React.createContext<ContextType | null>(
  null
);

const TaskList = ({ tasks }: PropType) => {
  console.log("TaskList render");
  const [isSubtaskChange, setIsSubtaskChange] = React.useState(false);

  const handleSubTaskChange = () => {
    setIsSubtaskChange(!isSubtaskChange);
  };

  const { user } = useContext(UserContext) ?? {};

  // Fetch all subtasks
  const result = useQuery(["subtasks"], () => getUserSubTasks(user?.$id));

  return (
    <div>
      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        {result.isLoading && <CircularProgress />}
      </Box> */}
      {result.data &&
        tasks?.map((task) => {
          return (
            <Box key={task["$id"]}>
              <ChangeSubtaskContext.Provider value={{ handleSubTaskChange }}>
                <Task task={task} />
              </ChangeSubtaskContext.Provider>
            </Box>
          );
        })}
    </div>
  );
};

export default TaskList;
