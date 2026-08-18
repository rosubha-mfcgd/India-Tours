import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Box, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'TourOperator' // default role
  });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      
      //const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      const res = await axios.post('http://api.mitramtouroperator.com//api/auth/signup', form);
      login(res.data.token); // store JWT token
      navigate('/dashboard'); // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Paper sx={{ p: 4, maxWidth: 400, width: '100%' }} elevation={10}>
        <Typography variant="h4" gutterBottom align="center">
          Sign Up - Yatri Saathi
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="TourOperator">Tour Operator</MenuItem>
            <MenuItem value="Customer">Customer</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
        <Button
          variant="text"
          sx={{ mt: 2 }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </Button>
      </Paper>
    </Box>
  );
}
