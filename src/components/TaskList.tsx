import { TaskType } from "../types/task";
import Task from "./Task";
import TaskAccordian from "./TaskAccordian";
import Box from "@mui/material/Box";

type PropType = {
  tasks: TaskType[] | [];
};

const TaskList = ({ tasks }: PropType) => {
  return (
    <>
      {tasks?.map((task) => {
        return (
          <Box key={task["$id"]}>
            <Task task={task} />
          </Box>
        );
      })}
    </>
  );
};

export default TaskList;
