import { Link } from "react-router-dom";
import timeImg from "../assets/change_season.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Footer from "../components/Footer";
import Typography from "@mui/material/Typography";

const LandingPage = () => {
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            mt: 2,
            p: 4,
          }}
        >
          <Typography variant="h2" textAlign={"center"} sx={{ p: 4 }}>
            Boost Your Productivity with Our Task Management App
          </Typography>
          <img src={timeImg} style={{ width: "40%" }} alt="Task Management" />
        </Box>
        <Box
          sx={{
            mt: 2,
            // background: "tan",
            display: "flex",
            p: 4,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ p: 1, fontSize: "600" }}
            textAlign={"center"}
          >
            Stay organized, prioritize tasks, and accomplish more with our
            powerful task management app. Streamline your workflow, never miss a
            deadline, and take control of your to-do list like never before.
          </Typography>
          <Button
            sx={{ display: "block", mt: 2 }}
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/register"
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
