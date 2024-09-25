'use client';

import { Typography, Container } from '@mui/joy';

export default function Contact() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography level="h1">Contact Us</Typography>
      <Typography>Get in touch with us for any questions or feedback.</Typography>
    </Container>
  );
}