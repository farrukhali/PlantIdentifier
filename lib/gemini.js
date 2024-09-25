export async function identifyPlant(imageData) {
  try {
    const response = await fetch('/api/identify-plant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    });

    if (!response.ok) {
      throw new Error('Failed to identify plant');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in identifyPlant:', error);
    throw error;
  }
}