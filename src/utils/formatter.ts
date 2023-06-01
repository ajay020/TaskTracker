import { format } from "date-fns";

export const formatDate = (due_date: Date, pattern: string = "EEE, MMM d") => {
  const dueDate = new Date(due_date);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (isSameDay(dueDate, today)) {
    return "Today";
  } else if (isSameDay(dueDate, tomorrow)) {
    return "Tomorrow";
  } else {
    return format(dueDate, pattern); // Use your preferred date formatting function here
  }
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
