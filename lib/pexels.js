import axios from 'axios';

const pexelsApi = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  headers: {
    Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY
  }
});

function getUnrelatedImages() {
  const unrelatedImages = localStorage.getItem('unrelatedImages');
  return unrelatedImages ? JSON.parse(unrelatedImages) : {};
}

function saveUnrelatedImages(unrelatedImages) {
  localStorage.setItem('unrelatedImages', JSON.stringify(unrelatedImages));
}

export async function searchPlantImages(plantName) {
  try {
    const response = await pexelsApi.get('/search', {
      params: {
        query: plantName,
        per_page: 10 // Fetch more images to account for potentially unrelated ones
      }
    });

    const unrelatedImages = getUnrelatedImages();
    const unrelatedForPlant = unrelatedImages[plantName] || [];

    return response.data.photos
      .filter(photo => !unrelatedForPlant.includes(photo.id))
      .slice(0, 5)
      .map(photo => ({
        id: photo.id,
        src: photo.src.medium,
        alt: `${plantName} image by ${photo.photographer}`
      }));
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return [];
  }
}

export async function markImageAsUnrelated(plantName, imageId) {
  const unrelatedImages = getUnrelatedImages();
  if (!unrelatedImages[plantName]) {
    unrelatedImages[plantName] = [];
  }
  unrelatedImages[plantName].push(imageId);
  saveUnrelatedImages(unrelatedImages);
}