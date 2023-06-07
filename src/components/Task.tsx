import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Priority, TaskType } from "../types/task";
import api from "../api/api";
import { Server } from "../utils/config";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";

import Checkbox from "@mui/material/Checkbox";

import MoreHoriz from "@mui/icons-material/MoreHoriz";
import AlarmIcon from "@mui/icons-material/Alarm";

import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../utils/formatDate";

type PropType = {
  task: TaskType;
};

const Task = ({ task }: PropType) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [completed, setCompleted] = React.useState(false);

  const queryClient = useQueryClient();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const updateTask = async (checked: boolean) => {
    const data = await api.updateDocument(
      Server.databaseID,
      Server.taskCollectionID,
      task?.$id,
      { completed: checked }
    );
    return data;
  };

  const { mutate, error, isError } = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
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

      // Invalidate and refetch
      //   queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleCompleteChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompleted(e.target.checked);
    mutate(e.target.checked);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: TaskType
  ) => {
    try {
      const res = await api.deleteDocument(
        Server.databaseID,
        Server.taskCollectionID,
        task["$id"]
      );

      console.log({ res });
    } catch (error) {
      console.error(error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const priorityColor =
    task.priority === Priority.High
      ? "error"
      : task.priority === Priority.Medium
      ? "warning"
      : "primary";

  //   Format due date
  let formattedDueDate;
  if (task.due_date) {
    formattedDueDate = formatDate(task.due_date, "EEE, MMM d");
  }

  return (
    <Card sx={{ maxWidth: 600, my: 4, mx: "auto" }}>
      {isError && <p>Something went wrong.</p>}
      <CardHeader
        sx={{ background: "teal", p: 0.5 }}
        avatar={
          <Checkbox
            checked={completed}
            onChange={handleCompleteChange}
            sx={{ p: 1, background: "red", m: 0 }}
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
          <Typography sx={{ p: 1, m: 0, background: "gray" }}>
            {task.title}
          </Typography>
        }
      />
      <CardContent sx={{ background: "green" }}>
        <Typography variant="body2" color="text.secondary">
          {task.description.substring(0, 50)}
        </Typography>
      </CardContent>
      <CardActions>
        <Chip
          icon={<AlarmIcon />}
          label={formattedDueDate ? formattedDueDate : "Set due date"}
          component="a"
          href="#basic-chip"
          variant="outlined"
          clickable
          size="small"
        />
        <Chip
          label={`${task.priority}`}
          component="a"
          href="#basic-chip"
          variant="outlined"
          clickable
          color={priorityColor}
          size="small"
        />
        <Chip
          label={`${task.project}`}
          component="a"
          href="#basic-chip"
          variant="outlined"
          clickable
          color={priorityColor}
          size="small"
        />
      </CardActions>
    </Card>
  );
};

export default Task;
