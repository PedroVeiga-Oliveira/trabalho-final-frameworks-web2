import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner({ label = 'Carregando...' }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4, gap: 1 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );
}