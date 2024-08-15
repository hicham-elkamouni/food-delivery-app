import { FC } from "react";
import { Box, Typography, Link } from "@mui/material";

export const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#35BF98",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <Typography variant="h6">© 2023 The Food App</Typography>
      <Typography variant="body2">
        Desenvolvido por{" "}
        <Link
          href="https://github.com/MarcosVini9999"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          Marcos Vinicius
        </Link>
      </Typography>
      <Typography variant="body2">
        LinkedIn:{" "}
        <Link
          href="https://www.linkedin.com/in/marcosvinciusandradedesousa/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          Marcos Vinicius
        </Link>
      </Typography>
    </Box>
  );
};
