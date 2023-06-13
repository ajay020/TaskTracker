import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          background: "#0F172A",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          color: "white",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} TaskTracker App | All rights
          reserved
        </Typography>
        <Typography variant="body2">
          Built with
          <Link sx={{ mx: 1 }} href="https://appwrite.io/">
            Appwrite
          </Link>
          and
          <Link sx={{ mx: 1 }} href="https://vercel.com">
            Vercel
          </Link>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
