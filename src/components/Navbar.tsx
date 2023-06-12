import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";
import api from "../api/api";
import Logout from "@mui/icons-material/Logout";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  Query,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Divider } from "@mui/material";
import { Server } from "../utils/config";
import { getUserProfile } from "../utils/service";
import AddTaskDialog from "./task/AddTaskDialog";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

type PropType = {
  handleDrawerOpen: () => void;
  open: boolean;
};

function Navbar({ handleDrawerOpen, open }: PropType) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { user, logout } = useContext(UserContext) ?? {};
  const navigate = useNavigate();

  console.log("Navbar render");

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfile(user?.$id),
  });

  const handleOpenDialog = React.useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpenUserMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const deleteUserSession = React.useCallback(async () => {
    try {
      await api.deleteCurrentSession();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteUserSession,
    onSuccess: () => {
      queryClient.setQueryData(["user"], () => {
        return null;
      });
      if (logout) {
        logout();
        localStorage.removeItem("user");
        navigate("/login");
      }
    },
  });

  const handleLogut = React.useCallback(async () => {
    // close user menu
    setAnchorElUser(null);
    if (user) {
      mutate();
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/app"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TaskTracker
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TaskTracker
            </Typography>
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              Link
            </Box> */}

            {/* <IconButton> */}
            <Button
              onClick={handleOpenDialog}
              sx={{
                color: "black",
                background: "white",
                flexGrow: 0,
                ml: "auto",
                mr: 4,
              }}
              variant="contained"
              startIcon={
                <AddCircleOutlineOutlinedIcon sx={{ color: "black" }} />
              }
            >
              Add
            </Button>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "white" }}
                >
                  {profileData ? (
                    <Avatar
                      alt="Travis Howard"
                      src={profileData?.documents[0]?.imgUrl}
                    />
                  ) : (
                    <Avatar sx={{ bgcolor: deepPurple[100] }}>
                      {user?.name[0].toLocaleUpperCase()}
                    </Avatar>
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <Stack>
                    <Typography>{user?.name}</Typography>
                    <Typography textAlign="center">{user?.email}</Typography>
                  </Stack>
                </MenuItem>
                <Divider />

                <MenuItem>
                  <ListItemIcon>
                    <ManageAccountsIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography
                    color={"inherit"}
                    sx={{ textDecoration: "none" }}
                    component="a"
                    href="/account-settings"
                  >
                    Account settings
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleLogut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AddTaskDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
}
export default React.memo(Navbar);
