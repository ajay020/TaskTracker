import { ReactNode, createContext, useState } from "react";
import { User } from "../types/user";

type PropType = {
  children: ReactNode;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<null | UserContextType>(null);

const AuthProvider = ({ children }: PropType) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("AuthProvider render");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
