import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import SubTaskForm from "./SubTaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Priority, SubTaskType, TaskType } from "../../types/task";
import { Server } from "../../utils/config";
import api from "../../api/api";
import { UserContext } from "../UserProvider";
import { useGetProjects } from "../../hooks/useGetProjects";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import SubTaskItem from "./SubTaskItem";
import BasicSelect from "../Select";
import PrioritySelect from "../PrioritySelect";
import MyDatePicker from "../MyDatePicker";

const queryKey = "subtasks";

type PropType = {
  task: TaskType;
  updateProgress?: (v: number) => void;
  subtasks?: SubTaskType[];
};

const saveSubtask = async (data: Partial<SubTaskType>) => {
  return await api.createDocument(
    Server.databaseID,
    Server.subTaskCollectionID,
    data,
    []
  );
};

const updateProject = async (data: { $id: string; projectId: string }) => {
  return await api.updateDocument(
    Server.databaseID,
    Server.taskCollectionID,
    data.$id,
    { projectId: data.projectId }
  );
};

const updatePriority = async (data: { $id: string; priority: Priority }) => {
  return await api.updateDocument(
    Server.databaseID,
    Server.taskCollectionID,
    data.$id,
    { priority: data.priority }
  );
};

const updateDueDate = async (data: { $id: string; due_date: Dayjs | null }) => {
  return await api.updateDocument(
    Server.databaseID,
    Server.taskCollectionID,
    data.$id,
    { due_date: data.due_date?.toDate() }
  );
};

const SubTask = ({ task, subtasks }: PropType) => {
  console.log("SubTask render...");

  const [{ data }] = useGetProjects();

  const currProject: Project = data.documents.map(
    (p: Project) => p.$id === task.projectId
  );

  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<string>(
    currProject?.name || ""
  );
  const [priority, setPriority] = React.useState<Priority>(
    task.priority || Priority.Low
  );
  const [selectedDueDate, setSelectedDueDate] = React.useState<Dayjs | null>(
    dayjs(task.due_date) || null
  );

  const { user } = useContext(UserContext) ?? {};

  const queryClient = useQueryClient();

  //   console.log({ data });

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const { mutate } = useMutation({
    mutationKey: [queryKey],
    mutationFn: saveSubtask,
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.setQueryData([queryKey], (prev: any) => {
        return {
          documents: [...prev.documents, { ...data }],
          total: prev.total + 1,
        };
      });
    },
  });

  const projectMutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: updateProject,
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks"], (prev: any) => {
        const updatedList = prev.documents.map((t: TaskType) => {
          if (t.$id === task.$id) {
            return { ...task, project: data.project };
          }
          return t;
        });
        return { documents: [...updatedList], total: prev.total };
      });
    },
  });

  const priorityMutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: updatePriority,
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks"], (prev: any) => {
        const updatedList = prev.documents.map((t: TaskType) => {
          if (t.$id === task.$id) {
            return { ...task, priority: data.priority };
          }
          return t;
        });
        return { documents: [...updatedList], total: prev.total };
      });
    },
  });

  const dueDateMutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: updateDueDate,
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks"], (prev: any) => {
        const updatedList = prev.documents.map((t: TaskType) => {
          if (t.$id === task.$id) {
            return { ...task, due_date: data.due_date };
          }
          return t;
        });
        return { documents: [...updatedList], total: prev.total };
      });
    },
  });

  const handleAddSubtask = () => {
    setIsFormVisible(true);
  };

  const handleSaveSubtask = (title: string) => {
    setIsFormVisible(false);
    if (user && title) {
      mutate({ title, completed: false, taskId: task.$id, userId: user?.$id });
    }
  };

  const handleCancelSubtask = () => {
    setIsFormVisible(false);
  };

  const handleProjectChange = (event: SelectChangeEvent) => {
    setSelectedProject(event.target.value as string);
    projectMutation.mutate({ $id: task.$id, projectId: event.target.value });
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as Priority);
    priorityMutation.mutate({
      $id: task.$id,
      priority: event.target.value as Priority,
    });
  };

  const handleDueDateChange = (newDate: Dayjs | null) => {
    setSelectedDueDate(newDate);
    dueDateMutation.mutate({ $id: task.$id, due_date: newDate });
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: "",
        alignContent: "space-between",
      }}
    >
      <Box sx={{ background: "", flex: 2, p: 2 }}>
        {subtasks?.map((subtask) => (
          <Box key={subtask.$id}>
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
      </Box>
      {/* Task info  */}
      <Box sx={{ background: "", flex: 1, p: 0 }}>
        <Stack sx={{ background: "", mx: "auto", width: "70%" }} spacing={1}>
          <BasicSelect
            selectedProject={selectedProject}
            handleProjectChange={handleProjectChange}
            projects={data?.documents}
            size="small"
            variant="standard"
          />

          <PrioritySelect
            priority={priority}
            handlePriorityChange={handlePriorityChange}
            size="small"
            variant="standard"
          />
          <MyDatePicker
            handleDueDateChange={handleDueDateChange}
            selectedDueDate={selectedDueDate}
            size="small"
            variant="standard"
          />
        </Stack>
      </Box>
      {/* Task info  */}
    </Box>
  );
};

// export default React.memo(SubTask);
export default SubTask;
