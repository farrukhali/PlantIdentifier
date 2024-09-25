'use client';

import { Typography, Container } from '@mui/joy';

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography level="h1">About Us</Typography>
      <Typography>Learn more about our plant identification service and mission.</Typography>
    </Container>
  );
}