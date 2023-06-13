import Task from "./Task";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import React, { SetStateAction, useContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TaskType } from "../../types/task";
import { UserContext } from "../UserProvider";
import { getUserSubTasks } from "../../utils/service";
import addImg from "../../assets/add_task.svg";
import { makeStyles } from "@material-ui/core";

type PropType = {
  tasks: TaskType[] | [];
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: "30%",
    maxWidth: 500,
    margin: "auto ",
    display: "block",
  },
}));

type ContextType = {
  handleSubTaskChange: () => void;
};

export const ChangeSubtaskContext = React.createContext<ContextType | null>(
  null
);

const TaskList = ({ tasks }: PropType) => {
  const [isSubtaskChange, setIsSubtaskChange] = React.useState(false);

  const handleSubTaskChange = () => {
    setIsSubtaskChange(!isSubtaskChange);
  };

  const classes = useStyles();

  const { user } = useContext(UserContext) ?? {};

  // Fetch all subtasks
  const result = useQuery(["subtasks"], () => getUserSubTasks(user?.$id));

  return (
    <Box>
      {tasks.length === 0 && (
        <Box sx={{ background: "", mt: 4 }}>
          <img src={addImg} className={classes.image} alt="add image" />
        </Box>
      )}

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
    </Box>
  );
};

export default TaskList;
