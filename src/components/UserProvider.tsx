import { ReactNode, createContext } from "react";
import { User, UserAction } from "../types/user";
//@ts-ignore
import { useGetUser } from "../hooks/useGetUser";

type PropType = {
  children: ReactNode;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  dispatch: React.Dispatch<UserAction>;
};

export const UserContext = createContext<null | UserContextType>(null);

const UserProvider = ({ children }: PropType) => {
  // eslint-disable-next-line
  const [{ user, isLoading, isError }, dispatch] = useGetUser();

  console.log("UserProvider render");

  return (
    // eslint-disable-next-line
    <UserContext.Provider value={{ user, dispatch, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
