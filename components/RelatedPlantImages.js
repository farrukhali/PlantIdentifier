import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/joy/Grid';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { searchPlantImages, markImageAsUnrelated } from '../lib/pexels';

export function RelatedPlantImages({ plantName }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const fetchedImages = await searchPlantImages(plantName);
      setImages(fetchedImages);
      setLoading(false);
    }
    fetchImages();
  }, [plantName]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setOpenLightbox(true);
  };

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  }, [images.length]);

  const handleMarkAsUnrelated = async () => {
    const imageToRemove = images[currentImageIndex];
    await markImageAsUnrelated(plantName, imageToRemove.id);
    setImages(images.filter((_, index) => index !== currentImageIndex));
    if (images.length === 1) {
      setOpenLightbox(false);
    } else {
      handleNextImage();
    }
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (event.key === 'ArrowRight') {
      handleNextImage();
    }
  }, [handlePrevImage, handleNextImage]);

  useEffect(() => {
    if (openLightbox) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openLightbox, handleKeyDown]);

  if (loading) {
    return <CircularProgress />;
  }

  if (images.length === 0) {
    return <Typography>No related images found.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography level="h3" sx={{ mb: 2 }}>
        More Images of {plantName}
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid key={image.id} xs={6} sm={4} md={2.4}>
            <AspectRatio 
              ratio="1"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </AspectRatio>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={openLightbox}
        onClose={() => setOpenLightbox(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
          <ModalClose variant="outlined" />
          <img
            src={images[currentImageIndex]?.src}
            alt={images[currentImageIndex]?.alt}
            style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
          <IconButton
            onClick={handlePrevImage}
            sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <Button
            onClick={handleMarkAsUnrelated}
            startDecorator={<ThumbDownIcon />}
            sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}
          >
            Not related
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}