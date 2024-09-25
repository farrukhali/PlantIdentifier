'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/joy';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();

  const handleIdentifyClick = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <Box
      component="nav"
      sx={{
        backgroundColor: 'background.surface',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
        }}
      >
        <Link href="/" passHref legacyBehavior>
          <Typography
            level="h4"
            component="a"
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              }
            }}
          >
            🌿 PlantID
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link href="/plants" passHref legacyBehavior>
            <Typography component="a" level="body-sm">Plants</Typography>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <Typography component="a" level="body-sm">About</Typography>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <Typography component="a" level="body-sm">Contact</Typography>
          </Link>
          <Button
            component="a"
            href="/"
            variant="solid"
            color="primary"
            size="sm"
            onClick={handleIdentifyClick}
          >
            Identify New Plant
          </Button>
        </Box>
      </Container>
    </Box>
  );
}