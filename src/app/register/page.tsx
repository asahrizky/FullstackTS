"use client";

import { Box, Container, Paper } from "@mui/material";
import RegisterForm from "../../components/auth/RegisterForm";
import Link from "next/link";

export default function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <RegisterForm />
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link href="/" style={{ color: "#1976d2", textDecoration: "none" }}>
              Already have an account? Login here
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
