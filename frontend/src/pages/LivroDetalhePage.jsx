import { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import FeedbackAlert from '../components/FeedbackAlert';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LivroDetalhePage() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const buscarDetalhe = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/api/livros/${id}`);
        setLivro(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    buscarDetalhe();
  }, [id]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Detalhes do Livro</Typography>
        <FeedbackAlert severity="error" message={error} />
        {loading ? (
          <LoadingSpinner label="Carregando detalhes..." />
        ) : livro ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography><strong>ID:</strong> {livro.id}</Typography>
            <Typography><strong>Título:</strong> {livro.titulo}</Typography>
            <Typography><strong>Autor:</strong> {livro.autor}</Typography>
            <Typography><strong>Ano de Publicação:</strong> {livro.anoPublicacao}</Typography>
            <Typography><strong>Categoria:</strong> {livro.categoria?.nome}</Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" component={Link} to="/livros">Voltar para a Lista</Button>
            </Box>
          </Box>
        ) : null}
      </Paper>
    </Container>
  );
}