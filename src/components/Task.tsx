import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TaskType } from "../types/task";
import api from "../api/api";
import { Server } from "../utils/config";
import { Link } from "react-router-dom";

type PropType = {
  task: TaskType;
};

const Task = ({ task }: PropType) => {
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: TaskType
  ) => {
    try {
      const res = await api.deleteDocument(
        Server.databaseID,
        Server.collectionID,
        task["$id"]
      );

      console.log({ res });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, my: 4, mx: "auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to={`/update-task/${task["$id"]}`}>Update</Link>
        </Button>
        <Button onClick={(e) => handleDelete(e, task)} size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Task;
