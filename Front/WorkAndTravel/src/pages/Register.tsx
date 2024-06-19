import * as React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function auth(email1: string, password1: string, username1: string) {
  var body = {
    email: email1,
    password: password1,
    username: username1
  };

  return axios.post("http://localhost:4123/auth/register", body);
}

const Register = () => {
  if (localStorage.getItem('token') != null) {
    return <Navigate to='/' replace={true} />
  }

  // State to hold form data
  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    passwordRepeat: "",
  });

  // State for form errors
  const [formError, setFormError] = React.useState("");

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.passwordRepeat) {
      setFormError("Passwords do not match");
      return;
    }

    try {
      const response = await auth(formData.email, formData.password, formData.username);
      const { token, userId, username } = response.data; // Extract token and userId from response.data
      document.cookie = `jwtToken=${token}; path=/; secure; samesite=strict; HttpOnly`;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('userId', userId); // Store userId in localStorage
      localStorage.setItem('username', username);

      window.location.reload(); // Example: reload the window
    } catch (error) {
      console.error("Registration error:", error);
      setFormError("Registration failed. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordRepeat"
              label="Repeat Password"
              type="password"
              id="passwordRepeat"
              autoComplete="new-password"
              value={formData.passwordRepeat}
              onChange={handleInputChange}
            />
            
            {formError && <Typography color="error">{formError}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:5173/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
