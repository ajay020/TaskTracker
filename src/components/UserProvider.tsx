import { ReactNode, createContext, useEffect, useState } from "react";
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
  login: (a: User) => void;
  logout: () => void;
};

export const UserContext = createContext<null | UserContextType>(null);

const UserProvider = ({ children }: PropType) => {
  const [user, setUser] = useState<User | null>(null);
  //   const { data } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  console.log("UserProvider render");

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.getAccount();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
