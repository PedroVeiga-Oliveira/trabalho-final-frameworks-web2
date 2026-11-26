import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import FeedbackAlert from '../components/FeedbackAlert';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { nome, email, senha });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.nome);
      navigate('/livros');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Criar Conta</Typography>
        <FeedbackAlert severity="error" message={error} onClose={() => setError('')} />
        {loading ? (
          <LoadingSpinner label="Cadastrando..." />
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              label="E-mail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button type="submit" variant="contained" size="large">Registrar</Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Já possui conta? <Link to="/login">Faça login</Link>
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}