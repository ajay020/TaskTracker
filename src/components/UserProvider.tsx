import { ReactNode, createContext, useState } from "react";
import { User } from "../types/user";
//@ts-ignore
import { useGetUser } from "../hooks/useGetUser";

type PropType = {
  children: ReactNode;
};

type UserContextType = {
  user: User | null;
  login: (a: User) => void;
  logout: () => void;
};

const getUserFromLocalStorage: () => User | null = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

export const UserContext = createContext<null | UserContextType>(null);

const UserProvider = ({ children }: PropType) => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

  //   console.log("UserProvider render");

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
