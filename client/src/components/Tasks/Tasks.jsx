import {
  Grid,
  Container,
  useMediaQuery,
  useTheme,
  CardActions,
  Button,
} from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { get } from "../../services/services";
import { NavLink } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);

  const cardStyle = {
    width: "100%",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    },
  };

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

  return (
    <Container disableGutters>
      <Grid container spacing={2} sx={{ m: 5, width: "100%" }}>
        {tasks.length > 0 &&
          tasks?.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
              <Card sx={cardStyle}>
                <CardMedia
                  component="img"
                  sx={{ height: 140 }}
                  image={`http://localhost:8000/public/images/${task.image}`}
                  title="green iguana"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60")
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink to={`/task-view/${task._id}`}>
                    <Button fullWidth variant="contained">
                      View
                    </Button>
                  </NavLink>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Tasks;
