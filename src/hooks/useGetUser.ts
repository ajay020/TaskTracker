import api from "../api/api";
import { useEffect, useReducer } from "react";
import {
  User,
  UserAction,
  UserState,
  SET_LOADING,
  SET_USER,
  SET_ERROR,
} from "../types/user";

export const useGetUser = () => {
  const reducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
      case SET_LOADING:
        return { ...state, isLoading: true, isError: false };
      case SET_USER:
        return {
          ...state,
          isLoading: false,
          isError: false,
          user: action.payload,
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
    user: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchUser = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const account = (await api.getAccount()) as User;
        if (!didCancel) {
          dispatch({ type: SET_USER, payload: account });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: SET_ERROR });
        }
      }
    };
    fetchUser();

    return () => {
      didCancel = true;
    };
  }, []);

  return [state, dispatch];
};
