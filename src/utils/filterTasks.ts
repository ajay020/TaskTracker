import { isToday, isAfter, isBefore } from "date-fns";
import { TaskType } from "../types/task";
import dayjs from "dayjs";

type filterType = {
  label: string;
  value: string;
};

const filterOptions = [
  { label: "Today's Tasks", value: "today" },
  { label: "Upcoming Tasks", value: "upcoming" },
  { label: "Overdue Tasks", value: "overdue" },
  { label: "Tasks by Priority", value: "priority" },
];

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
