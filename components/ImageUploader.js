import React, { useRef } from 'react';
import Button from '@mui/joy/Button';

export function ImageUploader({ onCapture }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Image data loaded');
        onCapture(e.target.result);
      };
      reader.onerror = (e) => {
        console.error('Error reading file:', e);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Button
        onClick={handleButtonClick}
        variant="outlined"
      >
        Upload Image
      </Button>
    </>
  );
}