import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Biblioteca Web II
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/livros">Livros (CRUD)</Button>
              <Typography variant="body2" sx={{ mx: 1 }}>
                Olá, {userName || 'Usuário'}
              </Typography>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Registrar</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}