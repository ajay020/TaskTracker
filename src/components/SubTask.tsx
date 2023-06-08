import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import SubTaskForm from "./SubTaskForm";
import { SubTaskType } from "../types/task";
import { Updater, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { Server } from "../utils/config";
import Typography from "@mui/material/Typography";
import SubTaskItem from "./SubTaskItem";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

type PropType = {
  taskId: string;
};

interface QueryDataType {
  documents: SubTaskType[];
  total: number;
}

const saveSubtask = async (data: Partial<SubTaskType>) => {
  return await api.createDocument(
    Server.databaseID,
    Server.subTaskCollectionID,
    data,
    []
  );
};

const SubTask = ({ taskId }: PropType) => {
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  const queryClient = useQueryClient();

  // Access the tasks query from cache
  const { documents } = queryClient.getQueryData(["subtasks"]) as QueryDataType;

  //   Filter subtasks based on the task ID
  const subtasks = documents
    ? documents.filter((task) => task.taskId === taskId)
    : [];

  const { mutate } = useMutation({
    mutationKey: ["subtasks"],
    mutationFn: saveSubtask,
    onSuccess: (data) => {
      queryClient.setQueryData(["subtasks"], (prev: any) => {
        return { documents: [...prev.documents, data], total: prev.total + 1 };
      });
    },
  });

  const handleAddSubtask = () => {
    setIsFormVisible(true);
  };

  const handleSaveSubtask = (title: string) => {
    setIsFormVisible(false);
    mutate({ title, completed: false, taskId: taskId });
  };

  const handleCancelSubtask = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      {subtasks.map((subtask, index) => (
        <Box key={index}>
          <SubTaskItem subtask={subtask} />
        </Box>
      ))}
      {isFormVisible ? (
        <SubTaskForm
          onSave={handleSaveSubtask}
          onCancel={handleCancelSubtask}
        />
      ) : (
        <Button
          variant="contained"
          onClick={handleAddSubtask}
          size="small"
          startIcon={<AddCircleOutlineOutlinedIcon sx={{ color: "white" }} />}
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default SubTask;
