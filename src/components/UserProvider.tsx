import { ReactNode, createContext } from "react";
import { User, UserAction } from "../types/user";
//@ts-ignore
import { useGetUser } from "../hooks/useGetUser";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

type PropType = {
  children: ReactNode;
};

type UserContextType = {
  user: User | null;
  //   isLoading: boolean;
  //   isError: boolean;
  //   dispatch: React.Dispatch<UserAction>;
};

export const UserContext = createContext<null | UserContextType>(null);

const fetchUser = async () => {
  return await api.getAccount();
};

const UserProvider = ({ children }: PropType) => {
  // eslint-disable-next-line
  //   const [{ user, isLoading, isError }, dispatch] = useGetUser();

  const { data, error } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  //   console.log({ data });

  console.log("UserProvider render");

  return (
    // eslint-disable-next-line
    <UserContext.Provider value={{ user: data }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
