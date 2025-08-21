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
