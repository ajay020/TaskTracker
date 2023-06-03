import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} TaskTracker App | All rights reserved
      </Typography>
      <Typography variant="body2">
        Built with love by{" "}
        <Link href="https://www.example.com" className={classes.link}>
          Your Name
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
