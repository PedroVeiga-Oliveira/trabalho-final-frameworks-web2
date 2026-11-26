import { Alert } from '@mui/material';

export default function FeedbackAlert({ severity = 'error', message, onClose }) {
  if (!message) return null;
  return (
    <Alert severity={severity} onClose={onClose} sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
}