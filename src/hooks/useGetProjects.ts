import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "../utils/service";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";

export const useGetProjects = () => {
  const { user } = useContext(UserContext) ?? {};

  const query = useQuery({
    queryKey: ["projects"],
    queryFn: () => getUserProjects(user?.$id),
  });

  return [query];
};
