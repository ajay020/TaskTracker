import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// @ts-ignore
import account from "../utils/appwrite";
// @ts-ignore
import { ID } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";

import timeImg from "../assets/time_management.svg";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./UserProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    // background: "green",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    background: "teal",
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

const registerUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await account.create(ID.unique(), email, password, name);
  return response;
};

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const navigate = useNavigate();
  const { login } = useContext(UserContext) ?? {};

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      await api.createSession(email, password);
      queryClient.setQueryData(["user"], () => {
        return { ...data };
      });
      if (login) {
        login(data);
        navigate("/");
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const user = { email, password, name };
      mutate(user);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   background: "orange",
        }}
      >
        <Box
          className={classes.root}
          sx={{ border: "1px solid lightgray", p: 2 }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          {isLoading && <p>Loading...</p>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              margin="normal"
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              className={classes.textField}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
              className={classes.textField}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
              sx={{ my: 2 }}
            >
              Register
            </Button>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" className={classes.loginLink}>
                Login here
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

export default RegisterForm;
