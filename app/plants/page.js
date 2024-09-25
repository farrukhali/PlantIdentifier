'use client';

import { Typography, Container } from '@mui/joy';

export default function Plants() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography level="h1">Plants Database</Typography>
      <Typography>Here you'll find a comprehensive list of plants.</Typography>
    </Container>
  );
}