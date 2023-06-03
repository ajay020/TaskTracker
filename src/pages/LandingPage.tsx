import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import timeImg from "../assets/change_season.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
  headline: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: theme.spacing(4),
  },
  image: {
    width: "100%",
    maxWidth: 500,
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h1" className={classes.headline}>
            Boost Your Productivity with Our Task Management App
          </Typography>
          <img src={timeImg} alt="Task Management" className={classes.image} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" className={classes.text}>
            Stay organized, prioritize tasks, and accomplish more with our
            powerful task management app. Streamline your workflow, never miss a
            deadline, and take control of your to-do list like never before.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/register"
            className={classes.button}
          >
            Get Started
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LandingPage;
