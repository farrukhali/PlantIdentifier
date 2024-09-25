import React, { useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Box from '@mui/joy/Box';

export function CameraCapture({ onCapture }) {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openCamera = async () => {
    setIsOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    onCapture(imageData);
    setIsOpen(false);
    video.srcObject.getTracks().forEach(track => track.stop());
  };

  return (
    <>
      <Button onClick={openCamera} variant="outlined">Use Camera</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalDialog>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <Button onClick={captureImage} sx={{ mt: 2 }}>Capture</Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}