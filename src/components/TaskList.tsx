import { TaskType } from "../types/task";
import Task from "./Task";

type PropType = {
  tasks: TaskType[];
};

const TaskList = ({ tasks }: PropType) => {
  return (
    <>
      {tasks.map((task) => {
        return <Task key={task.description} task={task} />;
      })}
    </>
  );
};

export default TaskList;
