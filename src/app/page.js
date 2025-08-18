import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

export default function HomePage() {
  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to MUI + Next.js 🚀
        </Typography>
        <Button variant="contained">Click Me</Button>
      </Container>
    </Box>
  );
}
