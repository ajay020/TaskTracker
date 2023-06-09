import { Dayjs } from "dayjs";

export type TaskType = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  description: string;
  title: string;
  user: string;
  projectId: string;
  due_date: Dayjs | null;
  priority: Priority;
  completed: boolean;
};

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface SubTaskType {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  completed: boolean;
  taskId: string;
  title: string;
  userId: string;
}

export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_TASKS = "SET_TASKS";

export interface TaskState {
  isLoading: boolean;
  isError: boolean;
  tasks: TaskType[];
}

export type TaskAction =
  | { type: "SET_LOADING" }
  | { type: "SET_ERROR" }
  | { type: "SET_TASKS"; payload: TaskType[] };
