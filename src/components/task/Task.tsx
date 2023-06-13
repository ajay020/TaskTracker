import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";

import Checkbox from "@mui/material/Checkbox";

import MoreHoriz from "@mui/icons-material/MoreHoriz";

import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskAccordian from "./TaskAccordian";
import { toast } from "react-toastify";
import api from "../../api/api";
import { Server } from "../../utils/config";
import { TaskType } from "../../types/task";

type PropType = {
  task: TaskType;
};

const deleteTask = async (taskId: string) => {
  return await api.deleteDocument(
    Server.databaseID,
    Server.taskCollectionID,
    taskId
  );
};

const Task = ({ task }: PropType) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [completed, setCompleted] = React.useState(false);

  const queryClient = useQueryClient();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const updateTask = async (checked: boolean) => {
    const data = await api.updateDocument(
      Server.databaseID,
      Server.taskCollectionID,
      task?.$id,
      { completed: checked }
    );
    return data;
  };

  const { mutate, isError } = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      toast.success("Task compoleted!");
      const tasks = queryClient.getQueryData<{
        documents: TaskType[];
        total: number;
      }>(["tasks"]);

      if (tasks && Array.isArray(tasks.documents)) {
        // Find the completed task and remove it from the list
        const updatedTasks = tasks.documents.filter(
          (task) => task.$id !== data.$id
        );
        // Update the query data with the updated tasks list
        queryClient.setQueryData<{ documents: TaskType[]; total: number }>(
          ["tasks"],
          {
            documents: updatedTasks,
            total: tasks.total,
          }
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task has been deleted!");
      const tasks = queryClient.getQueryData<{
        documents: TaskType[];
        total: number;
      }>(["tasks"]);

      if (tasks && Array.isArray(tasks.documents)) {
        // Find the completed task and remove it from the list
        const updatedTasks = tasks.documents.filter((t) => t.$id !== task.$id);
        // Update the query data with the updated tasks list
        queryClient.setQueryData<{ documents: TaskType[]; total: number }>(
          ["tasks"],
          {
            documents: updatedTasks,
            total: tasks.total,
          }
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCompleteChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setCompleted(e.target.checked);
      mutate(e.target.checked);
    },
    []
  );

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleDelete = React.useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      task: TaskType
    ) => {
      console.log(e.target);
      deleteMutation.mutate(task.$id);
    },
    []
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card sx={{ mb: 2, mx: "auto", width: "70%" }}>
      <Typography textAlign={"center"}>
        {isError && <p>Something went wrong.</p>}
      </Typography>
      <CardHeader
        sx={{ background: "", p: 0.5 }}
        avatar={
          <Checkbox
            checked={completed}
            onChange={handleCompleteChange}
            sx={{ p: 1, background: "", m: 0 }}
          />
        }
        action={
          <Stack>
            <IconButton
              aria-describedby={id}
              aria-label="settings"
              onClick={handleClick}
            >
              <MoreHoriz />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack sx={{ p: 1 }}>
                <Button
                  size="small"
                  endIcon={<ModeEditOutlinedIcon />}
                  href={`/update-task/${task["$id"]}`}
                >
                  Update
                </Button>
                <Button
                  onClick={(e) => handleDelete(e, task)}
                  size="small"
                  endIcon={<Delete />}
                  color="error"
                >
                  Delete
                </Button>
              </Stack>
            </Popover>
          </Stack>
        }
        title={
          <Typography sx={{ p: 1, m: 0, background: "" }}>
            {task.title}
          </Typography>
        }
      />
      <CardContent sx={{ background: "" }}>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <TaskAccordian task={task} />
    </Card>
  );
};

// export default React.memo(Task);
export default Task;
