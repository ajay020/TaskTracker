import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Priority, TaskType } from "../types/task";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AlarmIcon from "@mui/icons-material/Alarm";
import { formatDate } from "../utils/formatDate";
import SubTask from "./SubTask";

type PropType = {
  task: TaskType;
};

export default function TaskAccordian({ task }: PropType) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  //   Format due date
  let formattedDueDate;
  if (task.due_date) {
    formattedDueDate = formatDate(task.due_date, "EEE, MMM d");
  }

  const priorityColor =
    task.priority === Priority.High
      ? "error"
      : task.priority === Priority.Medium
      ? "warning"
      : "primary";

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
          sx={{ background: "greenyellow" }}
        >
          <Box
            sx={{
              //   width: "100%",
              flexShrink: 0,
              flexGrow: 1,
              background: "yellow",
            }}
          >
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
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Break the task into smaller subtask.</Typography>
          <SubTask taskId={task.$id} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
