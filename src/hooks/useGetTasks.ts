import api from "../api/api";
import {
  TaskState,
  TaskType,
  TaskAction,
  SET_ERROR,
  SET_LOADING,
  SET_TASKS,
} from "../types/task";
import { Server } from "../utils/config";
import { useEffect, useReducer } from "react";

export const useGetTasks = (stale: { stale: boolean }) => {
  //   console.log("useGetTask run");

  const reducer = (state: TaskState, action: TaskAction) => {
    switch (action.type) {
      case SET_LOADING:
        return { ...state, isLoading: true, isError: false };
      case SET_TASKS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          tasks: action.payload,
        };
      case SET_ERROR:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const initialState = {
    isLoading: false,
    isError: false,
    tasks: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const getTodos = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const data = await api.listDocuments(
          Server.databaseID,
          Server.taskCollectionID
        );

        if (!didCancel) {
          dispatch({ type: SET_TASKS, payload: data.documents });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: SET_ERROR });
        }
        console.log(e);
      }
    };

    getTodos();
    return () => {
      didCancel = true;
    };
  }, [stale]);

  return [state];
};
