import { Link } from "react-router-dom";
import timeImg from "../assets/change_season.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

import Footer from "../components/Footer";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: "4px",
  },
  headline: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2px",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "4px",
  },
  image: {
    width: "100%",
    maxWidth: 500,
    marginBottom: "4px",
  },
  button: {
    marginTop: "2px",
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
          <Typography variant="h2" sx={{ p: 2 }} className={classes.headline}>
            Boost Your Productivity with Our Task Management App
          </Typography>
          <img src={timeImg} alt="Task Management" className={classes.image} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ p: 1, fontSize: "600" }}>
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
