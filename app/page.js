'use client';

import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/joy';
import { ImageUploader } from '../components/ImageUploader';
import { CameraCapture } from '../components/CameraCapture';
import { PlantInfo } from '../components/PlantInfo';
import { RelatedPlantImages } from '../components/RelatedPlantImages';
import { identifyPlant } from '../lib/gemini';

export default function Home() {
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageCapture = async (imageData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await identifyPlant(imageData);
      setPlantData({
        name: result.name,
        image: imageData,
        info: result.info
      });
    } catch (error) {
      console.error("Error identifying plant:", error);
      setError("Failed to identify plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography level="h1" component="h1" sx={{ mb: 4 }}>
        Identify Your Plant
      </Typography>
      {!plantData && !isLoading && (
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <ImageUploader onCapture={handleImageCapture} />
          <CameraCapture onCapture={handleImageCapture} />
        </Box>
      )}
      {isLoading && (
        <Typography>Processing image...</Typography>
      )}
      {error && (
        <Typography color="danger">{error}</Typography>
      )}
      {plantData && (
        <>
          <PlantInfo plantData={plantData} />
          <RelatedPlantImages plantName={plantData.name} />
        </>
      )}
    </Container>
  );
}