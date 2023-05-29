export type TaskType = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  description: string;
  title: string;
};

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
