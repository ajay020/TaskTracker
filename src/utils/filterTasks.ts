import { isToday, isAfter } from "date-fns";
import { TaskType } from "../types/task";
import dayjs from "dayjs";

export const filterTasks = (tasks: TaskType[], filterOption: string) => {
  switch (filterOption) {
    case "today":
      return tasks.filter((task) => isToday(dayjs(task.due_date).toDate()));
    case "upcoming":
      return tasks.filter((task) =>
        isAfter(dayjs(task.due_date).toDate(), new Date())
      );
    // case "overdue":
    //   return tasks.filter((task) => isBefore(dayjs(task.due_date).toDate(), new Date()));
    // case "priority":
    //   return tasks.sort((a, b) => a.priority - b.priority);
    default:
      return tasks;
  }
};
