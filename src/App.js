import React from 'react';
import { Button, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Shop Management
          </Typography>
          <Button component={Link} to="/add-item" variant="contained" color="primary">
            Add Item
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
        <Routes>
          <Route path="/add-item" element={<ItemForm />} />
          <Route path="/" element={<ItemList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
