import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { UserContext } from "./UserProvider";
import api from "../api/api";
import { SET_ERROR, SET_LOADING, SET_USER } from "../types/user";

import timeImg from "../assets/time_management.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: theme.spacing(1),
    // background: "green",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(2, 0, 2),
  },
  loginLink: {
    color: theme.palette.primary.main,
  },
  image: {
    width: "100%",
    maxWidth: 500,
  },
}));

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isError, dispatch } = useContext(UserContext) ?? {};

  const navigate = useNavigate();
  const classes = useStyles();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (dispatch) {
      dispatch({ type: SET_LOADING });
      try {
        await api.createSession(email, password);
        const user = await api.getAccount();
        dispatch({ type: SET_USER, payload: user });

        navigate("/");
      } catch (error) {
        dispatch({ type: SET_ERROR });
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className={classes.root}
          sx={{ border: "1px solid lightgray", p: 2 }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              className={classes.textField}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
            >
              Login
            </Button>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/register" className={classes.loginLink}>
                Register here
              </Link>
            </Typography>
          </form>
        </Box>

        <Box sx={{ ml: 4 }}>
          <img src={timeImg} className={classes.image} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
