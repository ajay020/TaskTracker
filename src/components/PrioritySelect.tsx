import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Priority } from "../types/task";

type PropType = {
  priority: Priority;
  handlePriorityChange: (e: SelectChangeEvent) => void;
};

export default function PrioritySelect({
  handlePriorityChange,
  priority,
}: PropType) {
  return (
    <Box margin="normal" sx={{ my: 2 }}>
      <InputLabel id="priority-select">Priority</InputLabel>
      <Select
        labelId="priority-select"
        id="priority-select"
        value={priority}
        label="priority"
        fullWidth
        onChange={handlePriorityChange}
      >
        <MenuItem value="" disabled>
          Select Priority
        </MenuItem>
        <MenuItem value={Priority.Low}>Low</MenuItem>
        <MenuItem value={Priority.Medium}>Medium</MenuItem>
        <MenuItem value={Priority.High}>High</MenuItem>
      </Select>
    </Box>
  );
}
