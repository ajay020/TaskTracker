import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// @ts-ignore
import account from "../utils/appwrite";
// @ts-ignore
import { ID } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import timeImg from "../assets/time_management.svg";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "./UserProvider";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "40%",
//     // background: "green",
//   },
//   form: {
//     width: "100%",
//     marginTop: "2px",
//     display: "flex",
//     flexDirection: "column",
//     background: "teal",
//   },
//   textField: {
//     marginBottom: "2px",
//   },
//   submitButton: {
//     margin: "2px 0 2px",
//   },
//   loginLink: {
//     color: "blue",
//   },
//   image: {
//     width: "100%",
//     maxWidth: 500,
//   },
// }));

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
  const [error, setError] = useState(false);

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
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/app");
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password.length < 8) {
      setError(true);
    } else {
      setError(false);
      try {
        const user = { email, password, name };
        mutate(user);
      } catch (error) {
        console.error("Registration failed", error);
      }
    }
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          //   justifyContent: "start",
          //   background: "orange",
          p: 4,
        }}
      >
        <Box sx={{ border: "1px solid lightgray", p: 2, background: "" }}>
          <Typography textAlign={"center"} component="h1" variant="h5">
            Register
          </Typography>
          {isLoading && <p>Loading...</p>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              margin="normal"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              sx={{ mb: 2 }}
              label="Email"
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              fullWidth
              required
              type="email"
            />
            <TextField
              sx={{ mb: 2 }}
              label="Password"
              type="password"
              value={password}
              placeholder="Password must be at least 8 character long"
              onChange={handlePasswordChange}
              margin="normal"
              fullWidth
              error={error}
              required
              helperText={error ? "Password must be at least 8 characters" : ""}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ my: 2 }}
            >
              Register
            </Button>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login here</Link>
            </Typography>
          </form>
        </Box>
        <Box sx={{ ml: 4, p: 2, background: "" }}>
          <img src={timeImg} style={{ width: "80%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
