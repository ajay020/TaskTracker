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
import { deepOrange, deepPurple } from "@mui/material/colors";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";
import api from "../api/api";
import Logout from "@mui/icons-material/Logout";
import AddTaskDialog from "./AddTaskDialog";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Divider } from "@mui/material";

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

  const handleOpenDialog = React.useCallback(() => {
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpenNavMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    },
    []
  );
  const handleOpenUserMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseNavMenu = React.useCallback(() => {
    setAnchorElNav(null);
  }, []);

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
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TaskTracker
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Add Task</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Today's task</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
              sx={{ color: "white", flexGrow: 0, ml: "auto", mr: 4 }}
              color="success"
              variant="contained"
              startIcon={
                <AddCircleOutlineOutlinedIcon sx={{ color: "white" }} />
              }
            >
              Add
            </Button>
            {/* </IconButton> */}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "white" }}
                >
                  <Avatar sx={{ bgcolor: deepPurple[100] }}>
                    {user?.name[0].toLocaleUpperCase()}
                  </Avatar>
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
