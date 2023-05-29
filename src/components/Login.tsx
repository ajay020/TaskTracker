import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { UserContext } from "./UserProvider";
import api from "../api/api";
import { SET_ERROR, SET_LOADING, SET_USER } from "../types/user";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isError, dispatch } = useContext(UserContext) ?? {};

  const navigate = useNavigate();

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
    <Container maxWidth="sm">
      <Typography variant="h2">Login</Typography>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
