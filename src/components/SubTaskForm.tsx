import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";

type PropType = {
  onSave: (s: string) => void;
  onCancel: () => void;
};

const SubTaskForm = ({ onSave, onCancel }: PropType) => {
  const [title, setTitle] = React.useState("");

  const handleSave = () => {
    if (title.trim() !== "") {
      onSave(title);
      setTitle("");
    }
  };

  const handleCancel = () => {
    onCancel();
    setTitle("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "1rem", marginBottom: "1rem", background: "" }}
    >
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={handleChange}
      />
      <Stack sx={{ mt: 1 }} direction={"row"} spacing={2}>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
};

export default SubTaskForm;
