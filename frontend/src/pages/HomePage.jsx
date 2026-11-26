import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sistema de Gerenciamento de Biblioteca
        </Typography>
        <Typography variant="body1" paragraph>
          Aplicação Full Stack desenvolvida com React, Material-UI, React Router e Axios no frontend,
          integrada a uma API RESTful em Spring Boot com JPA, H2, JWT e Swagger.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {isAuthenticated ? (
            <Button variant="contained" component={Link} to="/livros">
              Gerenciar Livros e Categorias
            </Button>
          ) : (
            <>
              <Button variant="contained" component={Link} to="/login">
                Fazer Login
              </Button>
              <Button variant="outlined" component={Link} to="/register">
                Criar Conta
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}