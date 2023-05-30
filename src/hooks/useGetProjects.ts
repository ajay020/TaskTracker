import api from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { Server } from "../utils/config";

const getProjects = async () => {
  return api.listDocuments(Server.databaseID, Server.projectCollectionId);
};

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return [query];
};
