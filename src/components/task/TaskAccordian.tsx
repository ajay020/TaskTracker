import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Priority, SubTaskType, TaskType } from "../../types/task";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AlarmIcon from "@mui/icons-material/Alarm";
import FlagIcon from "@mui/icons-material/Flag";
import SubTask from "./SubTask";
import Stack from "@mui/material/Stack";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../utils/formatDate";
import Progress from "../LinearProgress";

type PropType = {
  task: TaskType;
};

interface QueryDataType {
  documents: SubTaskType[];
  total: number;
}

const TaskAccordian = ({ task }: PropType) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  console.log("TaskAccording render...");

  const queryClient = useQueryClient();

  const { documents } =
    (queryClient.getQueryData(["subtasks"]) as QueryDataType) ?? {};

  // Filter subtasks based on the task ID
  const filteredSubtasks = documents
    ? documents.filter((t) => t.taskId.toString() === task.$id.toString())
    : [];

  const completedSubtasks = filteredSubtasks.filter((t) => t.completed);

  // Calculate percentage of completion of subtasks
  const calculatedPercentage =
    (completedSubtasks.length / filteredSubtasks.length) * 100 || 0;

  const handleChange = React.useCallback(
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  //   Format due date
  let formattedDueDate;
  if (task.due_date) {
    formattedDueDate = formatDate(task.due_date, "EEE, MMM d");
  }

  // Set priority flag color
  const priorityColor =
    task.priority === Priority.High
      ? "error"
      : task.priority === Priority.Medium
      ? "warning"
      : "secondary";

  return (
    <div>
      <Accordion
        expanded={expanded === task.title}
        onChange={handleChange(task.title)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{
            background: "",
          }}
        >
          <Stack
            direction={"row"}
            spacing={8}
            sx={{
              flexShrink: 0,
              flexGrow: 0,
              //   background: "yellow",
              mr: 8,
            }}
          >
            <Chip
              icon={<FlagIcon />}
              label={`${task.priority}`}
              //   component="a"
              //   href="#basic-chip"
              variant="outlined"
              //   clickable
              color={priorityColor}
              size="small"
            />
            <Chip
              icon={<AlarmIcon />}
              label={formattedDueDate ? formattedDueDate : "Set due date"}
              //   component="a"
              //   href="#basic-chip"
              variant="outlined"
              //   clickable
              size="small"
            />
          </Stack>
          <Box
            sx={{
              flexGrow: 0,
              width: "15%",
              background: "",
              border: "1px solid lightgray",
              borderRadius: "12px",
              px: 2,
            }}
          >
            <Progress value={calculatedPercentage} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SubTask task={task} subtasks={filteredSubtasks} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default TaskAccordian;
