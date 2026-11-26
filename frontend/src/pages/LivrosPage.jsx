import { useEffect, useState } from 'react';
import {
  Container, Typography, Paper, TextField, Button, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, Box, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';
import FeedbackAlert from '../components/FeedbackAlert';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LivrosPage() {
  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');

  const [editId, setEditId] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const carregarDados = async () => {
    setLoading(true);
    setError('');
    try {
      const [resLivros, resCategorias] = await Promise.all([
        api.get('/api/livros'),
        api.get('/api/categorias'),
      ]);
      setLivros(resLivros.data);
      setCategorias(resCategorias.data);
      if (resCategorias.data.length > 0 && !categoriaId) {
        setCategoriaId(resCategorias.data[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleCriarCategoria = async (e) => {
    e.preventDefault();
    if (!novaCategoria.trim()) return;
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      const res = await api.post('/api/categorias', { nome: novaCategoria.trim() });
      setCategorias((prev) => [...prev, res.data]);
      setCategoriaId(res.data.id);
      setNovaCategoria('');
      setSuccess('Categoria cadastrada com sucesso!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const limparFormulario = () => {
    setEditId(null);
    setTitulo('');
    setAutor('');
    setAnoPublicacao('');
    if (categorias.length > 0) setCategoriaId(categorias[0].id);
  };

  const handleSalvarLivro = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    const payload = {
      titulo,
      autor,
      anoPublicacao: Number(anoPublicacao),
      categoria: { id: Number(categoriaId) },
    };

    try {
      if (editId) {
        await api.put(`/api/livros/${editId}`, payload);
        setSuccess('Livro atualizado com sucesso!');
      } else {
        await api.post('/api/livros', payload);
        setSuccess('Livro cadastrado com sucesso!');
      }
      limparFormulario();
      await carregarDados();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditar = (livro) => {
    setEditId(livro.id);
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setAnoPublicacao(livro.anoPublicacao);
    setCategoriaId(livro.categoria?.id || '');
  };

  const handleDeletar = async (id) => {
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      await api.delete(`/api/livros/${id}`);
      setSuccess('Livro removido com sucesso!');
      await carregarDados();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom>Gerenciamento de Livros</Typography>

      <FeedbackAlert severity="error" message={error} onClose={() => setError('')} />
      <FeedbackAlert severity="success" message={success} onClose={() => setSuccess('')} />

      {/* Cadastro rápido de Categoria */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>1. Categoria</Typography>
        <Box component="form" onSubmit={handleCriarCategoria} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Nova categoria (ex.: Romance, Tecnologia)"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            size="small"
            sx={{ minWidth: 260 }}
          />
          <Button type="submit" variant="outlined" disabled={submitting}>
            Adicionar Categoria
          </Button>
        </Box>
      </Paper>

      {/* Formulário CREATE / UPDATE de Livro */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          2. {editId ? `Editar Livro #${editId}` : 'Cadastrar Novo Livro'}
        </Typography>
        <Box component="form" onSubmit={handleSalvarLivro} sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
          <TextField
            label="Título"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <TextField
            label="Autor"
            required
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
          <TextField
            label="Ano de Publicação"
            type="number"
            required
            value={anoPublicacao}
            onChange={(e) => setAnoPublicacao(e.target.value)}
          />
          <TextField
            select
            label="Categoria"
            required
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            helperText={categorias.length === 0 ? 'Cadastre uma categoria acima primeiro' : ''}
          >
            {categorias.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.nome}
              </MenuItem>
            ))}
          </TextField>

          <Stack direction="row" spacing={1} sx={{ gridColumn: '1 / -1' }}>
            <Button type="submit" variant="contained" disabled={submitting || categorias.length === 0}>
              {submitting ? 'Salvando...' : editId ? 'Salvar Alterações' : 'Cadastrar Livro'}
            </Button>
            {editId && (
              <Button type="button" variant="text" onClick={limparFormulario}>
                Cancelar Edição
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>

      {/* Listagem READ + DELETE */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>3. Livros Cadastrados</Typography>
        {loading ? (
          <LoadingSpinner label="Buscando livros na API..." />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Ano</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {livros.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Nenhum livro cadastrado.</TableCell>
                </TableRow>
              ) : (
                livros.map((livro) => (
                  <TableRow key={livro.id}>
                    <TableCell>{livro.id}</TableCell>
                    <TableCell>{livro.titulo}</TableCell>
                    <TableCell>{livro.autor}</TableCell>
                    <TableCell>{livro.anoPublicacao}</TableCell>
                    <TableCell>{livro.categoria?.nome || '-'}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" component={Link} to={`/livros/${livro.id}`}>
                          Detalhes
                        </Button>
                        <Button size="small" variant="outlined" onClick={() => handleEditar(livro)}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          disabled={submitting}
                          onClick={() => handleDeletar(livro.id)}
                        >
                          Excluir
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}