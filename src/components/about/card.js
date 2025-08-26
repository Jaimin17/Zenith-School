import { STATE_OF_ART_INFRASTRUCTURE_CARD_IMAGE } from "@/lib/data";
import { CardMedia, Box, Typography } from "@mui/material";
import { Container } from "@mui/material";

const Card = ({
  image = null,
  title = "Title",
  description = "description",
}) => {
  image = image ? image : STATE_OF_ART_INFRASTRUCTURE_CARD_IMAGE;

  return (
    <Container
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%", // ensures uniform height
        width: "100%",
        // boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        sx={{
          height: 300,
          borderRadius: 2,
          marginTop: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        component="img"
        image={image}
        alt={title}
      />
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3, // show max 3 lines
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "72px", // keeps space same even if short text
          }}
        >
          {description}
        </Typography>
      </Box>
    </Container>
  );
};

export default Card;
