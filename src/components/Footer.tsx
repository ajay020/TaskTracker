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
    marginLeft: "4px",
    marginRight: "2px",
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
        Built with
        <Link href="https://appwrite.io/" className={classes.link}>
          Appwrite
        </Link>
        and
        <Link href="https://vercel.com" className={classes.link}>
          Vercel
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
