import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import api from "../api/api";

import timeImg from "../assets/time_management.svg";
import { makeStyles } from "@material-ui/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./UserProvider";

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
    margin: theme.spacing(4, 0, 2, 0),
  },
  loginLink: {
    color: theme.palette.primary.main,
    margin: theme.spacing(2, 0, 2),
  },
  image: {
    width: "100%",
    maxWidth: 500,
  },
}));

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const classes = useStyles();

  const { login } = useContext(UserContext) ?? {};

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const updateUser = async () => {
    const user = await api.getAccount();
    return user;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], () => {
        return { ...user };
      });
      console.log({ user });
      if (login) {
        login(user);
        navigate("/");
      }

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await api.createSession(email, password);
      mutate();
    } catch (error) {
      console.log(error);
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
              sx={{ my: 2 }}
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
