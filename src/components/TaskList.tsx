import { TaskType } from "../types/task";
import Task from "./Task";
import TaskAccordian from "./TaskAccordian";
import Box from "@mui/material/Box";
import api from "../api/api";
import { Server } from "../utils/config";
import { useQuery } from "@tanstack/react-query";
import React, { SetStateAction, useContext } from "react";
import { getUserSubTasks } from "../utils/service";
import { UserContext } from "./UserProvider";

type PropType = {
  tasks: TaskType[] | [];
};

const fetchSubTasks = async () => {
  return await api.listDocuments(Server.databaseID, Server.subTaskCollectionID);
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

  console.log({ SUBTASK: result.data });

  return (
    <div>
      <h4>{result.isLoading && "Loading..."}</h4>
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
