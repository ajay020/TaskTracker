import React, { useContext, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import api from "../api/api";
import { UserContext } from "./UserProvider";
import { account, storage } from "../utils/userService";
import { Server } from "../utils/config";
//@ts-ignore
import { ID } from "appwrite";
import { FileType } from "../types/user";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const baseUrl = "https://cloud.appwrite.io/v1";

interface AccountSettingsProps {
  // Add any additional props needed
}

// Function to upload user profile image
const uploadProfileImage = async (imageFile: File) => {
  return await storage.createFile(Server.bucket_id, ID.unique(), imageFile);
};

const saveImgToProfile = async (data: { userId: string; imgUrl: string }) => {
  try {
    await api.createDocument(
      Server.databaseID,
      Server.profileCollectionId,
      { ...data },
      []
    );
  } catch (error) {
    console.log(error);
  }
};

// Function to update user info
const updateUserInfo = async (userInfo: {
  name: string;
  email: string;
  password: string;
}) => {
  const namePromise = await account.updateName(userInfo.name);
  const emailPromise = await account.updateEmail(
    userInfo.email,
    userInfo.password
  );

  localStorage.setItem("user", JSON.stringify(emailPromise));
  toast.success("User info updated successfully");
};

const AccountSettings: React.FC<AccountSettingsProps> = () => {
  console.log("AccountSettings render...");
  const { user } = useContext(UserContext) ?? {};
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  //   console.log(user);

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setProfileImage(file || null);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const fileMutation = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: uploadProfileImage,
    onSuccess: async (file: FileType) => {
      console.log(file);

      const imgUrl = `${baseUrl}/storage/buckets/${Server.bucket_id}/files/${file.$id}/view?project=${Server.project}&mode=admin`;

      if (user) {
        await saveImgToProfile({ userId: user?.$id, imgUrl });
      }
      toast.success("file uploaded successfully");
    },
  });

  const handleProfileImageUpload = async () => {
    if (profileImage) {
      const newName = `${new Date().getTime()}.${
        profileImage.name.split(".")[1]
      }`;

      const renamedFile = new File([profileImage], newName, {
        type: profileImage.type,
      });

      fileMutation.mutate(renamedFile);
    }
  };

  const handleUserInfoUpdate = async () => {
    // Call the updateUserInfo function and pass the updated user info
    if (name && email && password) {
      await updateUserInfo({ name, email, password });
    }
    // Handle the successful update
  };

  return (
    <Box
      p={3}
      sx={{
        background: "white",
        my: 2,
        width: { sm: "70%", md: "50%" },
        mx: "auto",
      }}
    >
      <Typography textAlign={"center"} variant="h4" gutterBottom>
        Account Settings
      </Typography>
      {fileMutation.isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress value={67} />
        </Box>
      )}

      {/* Profile Image Upload */}
      <Box
        mb={2}
        sx={{
          background: "",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Profile Image</Typography>
        <TextField fullWidth type="file" onChange={handleProfileImageChange} />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleProfileImageUpload}
        >
          Upload file
        </Button>
      </Box>

      {/* User Info Update Form */}
      <Box
        mb={2}
        sx={{
          background: "",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography sx={{ my: 2 }} variant="h6">
          User Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleUserInfoUpdate}
        >
          Update Info
        </Button>
      </Box>
    </Box>
  );
};

export default AccountSettings;
