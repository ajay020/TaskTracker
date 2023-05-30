import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type PropType = {
  selectedProject: string;
  handleProjectChange: (e: SelectChangeEvent) => void;
  projects: Project[];
};

export default function BasicSelect({
  handleProjectChange,
  selectedProject,
  projects,
}: PropType) {
  return (
    <Box margin="normal" sx={{ my: 2 }}>
      <InputLabel id="project-select">Project</InputLabel>
      <Select
        labelId="project-select"
        id="project-select"
        value={selectedProject}
        label="Project"
        fullWidth
        onChange={handleProjectChange}
        defaultValue=""
      >
        {projects?.map((p: Project) => {
          return (
            <MenuItem key={p.$id} value={p.name}>
              {p.name}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
