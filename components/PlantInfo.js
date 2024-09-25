import React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Table from '@mui/joy/Table';

export function PlantInfo({ plantData }) {
  // Function to parse the info string into key-value pairs
  const parseInfo = (info) => {
    const lines = info.split('\n');
    return lines.map(line => {
      const [key, ...valueParts] = line.split(':');
      let value = valueParts.join(':').trim();
      // Remove any remaining asterisks or other unwanted characters
      value = value.replace(/\*/g, '').replace(/^-\s*/, '');
      return { key: key.trim(), value };
    });
  };

  const infoItems = parseInfo(plantData.info);

  return (
    <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto' }}>
      {/* Image Box */}
      <Card variant="outlined" sx={{ mb: 2, width: '300px', mx: 'auto' }}>
        <AspectRatio ratio="1">
          <img
            src={plantData.image}
            alt={plantData.name}
            style={{ objectFit: 'contain' }}
          />
        </AspectRatio>
      </Card>

      {/* Title */}
      <Typography level="h2" fontSize="xl" sx={{ mb: 2, textAlign: 'center' }}>
        {plantData.name}
      </Typography>

      {/* Information Table */}
      <Table sx={{ '& td': { padding: '8px 0' } }}>
        <tbody>
          {infoItems.map((item, index) => (
            <tr key={index}>
              <td style={{ width: 'auto', textAlign: 'left', verticalAlign: 'top' }}>
                <Typography level="body1" fontWeight="bold">
                  {item.key}:
                </Typography>
              </td>
              <td style={{ width: 'auto', textAlign: 'left' }}>
                <Typography level="body1">
                  {item.value}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Cautionary Note */}
      <Typography level="body2" sx={{ mt: 2, fontStyle: 'italic', textAlign: 'center' }}>
        Remember to always verify plant identifications with a local expert before consuming or handling any plant.
      </Typography>
    </Box>
  );
}