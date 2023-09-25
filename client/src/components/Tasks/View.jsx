import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { get } from "../../services/services";
import { useParams } from "react-router-dom";

const View = () => {
  const [tasks, setTasks] = React.useState([]);

  const { id } = useParams();

  React.useEffect(() => {
    const getTasks = async () => {
      const { res, err } = await get("/tasks/all-tasks");
      if (err) {
        console.log(err);
      }
      setTasks(res?.data?.tasks);
    };
    getTasks();
  }, []);

    const findTask = tasks && tasks.find((task) => task._id === id);

  return (
      <Card sx={{ m: 5 }}>
      {findTask && (
        <>
          <CardMedia
            component="img"
            // sx={{ height: 140 }}
            image={`http://localhost:8000/public/images/${findTask.image}`}
            title="green iguana"
            onError={(e) =>
              (e.currentTarget.src =
                "https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60")
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {findTask.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {findTask.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button fullWidth variant="contained" href="#">
              Update
            </Button>
            <Button fullWidth variant="contained" color="error" href="#">
              Delete
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default View;
