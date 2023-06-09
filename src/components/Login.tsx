import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import api from "../api/api";

import timeImg from "../assets/time_management.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./UserProvider";
import { toast } from "react-toastify";

const updateUser = async () => {
  const user = await api.getAccount();
  return user;
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(UserContext) ?? {};

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/app");
    }
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], () => {
        return { ...user };
      });
      if (login) {
        login(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/app");
      }

      // Invalidate and refetch
      //   queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password.length < 8) {
      setError(true);
    } else {
      setError(false);

      try {
        if (email && password) {
          await api.createSession(email, password);
          mutate();
        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Invalid credentials. Please check the email and password."
        );
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
        <Box sx={{ border: "1px solid lightgray", p: 2 }}>
          <Typography textAlign={"center"} component="h1" variant="h4">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              margin="normal"
              required
              type="email"
            />
            <TextField
              error={error}
              helperText={error ? "Password must be at least 8 characters" : ""}
              required
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ my: 2 }}
            >
              Login
            </Button>
            <Typography variant="body2">
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
          </form>
        </Box>

        <Box sx={{ ml: 4 }}>
          <img src={timeImg} style={{ width: "70%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
