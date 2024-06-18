import React, { useState, useEffect} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Image from '../components/image';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Avatar,
  Box,
  Paper,
  CssBaseline,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const schema = yup
  .object({
    username: yup.string().required('Username is required'),
    displayName: yup.string().required('Display name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    photoURL: yup.string().url('Invalid URL'),
    phoneNumber: yup.string(),
    country: yup.string(),
    address: yup.string(),
    state: yup.string(),
    city: yup.string(),
    zipCode: yup.string(),
    about: yup.string(),
    role: yup.string().default('user'),
    isPublic: yup.boolean().default(true),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;
const GlobalStyles = styled('div')({
    'html, body, #root': {
      height: '100%',
      width:'100%',
      margin: 0,
      padding: 0,
    },
  });
  
  
// const form = styled(Container)({
//   marginTop: '2rem',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
// });

// const BackgroundContainer = styled(Container)({
//     width:' 100vw',
//     minHeight: '100vh', // Ensure the container spans the entire viewport height
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundImage: 'url(/assets/images/pexels-pixabay-356065.jpg)', // Replace with your image URL
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   });
// const BackgroundContainer = styled('div')({
//     width: '100vw', // Ensure the container spans the entire viewport width
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundImage: 'url(/assets/images/pexels-pixabay-356065.jpg)',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   });
const BackgroundContainer = styled('div')<{ backgroundImage: string }>(
  ({ backgroundImage }) => ({
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 1s ease-in-out', // Add transition for smooth change
  })
);
const AvatarStyled = styled(Avatar)({
  margin: '1rem',

  width: 56,
  height: 56,
  border: '2px solid #000000', // Added border
});
const LockIconStyled = styled(LockOutlinedIcon)({
  color: 'black', // Changed icon color
});

const SubmitButton = styled(Button)({
  marginTop: '1rem',
});

const images = [
  '/assets/images/pexels-rdne-8500353.jpg',
  '/assets/images/pexels-pixabay-356065.jpg',
  '/assets/images/pexels-pixabay-256541.jpg',
  '/assets/images/pexels-img_1979-stevonka-379280-2116469.jpg',
  '/assets/images/pexels-max-fischer-5212700.jpg',
  '/assets/images/pexels-max-fischer-5212342.jpg',
  // '/assets/images/pexels-pixabay-256542.jpg.',
  // '/assets/images/pexels-pixabay-3747505.jpg.',
  // Add more image URLs as needed
];

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
      });

  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0); 
  // const [backgroundImage, setBackgroundImage] = useState(images[0]); 
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex(prevIndex => (prevIndex + 1) % images.length); // Change background image index cyclically
    }, 5000); // Change image every 5 seconds
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  
  const backgroundImage = images[backgroundImageIndex];
  // const [backgroundImage, setBackgroundImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

 
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log('Form data:', data); 
    try {
      // Log form data
      console.log('Attempting registration...'); // Log before axios request
      const response = await axios.post('http://localhost:3000/api/auth/register', data);
      console.log('Registration successful:', response.data);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const PaperStyled = styled(Paper)({
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // More transparent white background
    borderRadius: '8px',
  });
  return (
    <>
    <GlobalStyles/>
    <BackgroundContainer backgroundImage={backgroundImage}>
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <PaperStyled elevation={6}>
        <AvatarStyled>
          <LockIconStyled fontSize="large" />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Account Info" />
          <Tab label="Personal Info" />
          <Tab label="Additional Info" />
        </Tabs>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%', marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', }}
        >
          {tab === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  fullWidth
                  {...register('username')}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label=" Name"
                  fullWidth
                  {...register('displayName')}
                  error={!!errors.displayName}
                  helperText={errors.displayName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          )}
          {tab === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  {...register('phoneNumber')}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country"
                  fullWidth
                  {...register('country')}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  {...register('address')}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  fullWidth
                  {...register('state')}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  fullWidth
                  {...register('city')}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Zip Code"
                  fullWidth
                  {...register('zipCode')}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                />
              </Grid>
            </Grid>
          )}

          {tab === 2 && (
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="raised-button-file">
                    <IconButton component="span">
                      <Avatar
                        src={imagePreview || '/uploads/profileImages/default_avatar.png'}
                        alt="Profile Avatar"
                        style={{ width: '120px', height: '120px' }}
                      />
                    </IconButton>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="About"
                  fullWidth
                  multiline
                  rows={4}
                  {...register('about')}
                  error={!!errors.about}
                  helperText={errors.about?.message}
                />
              </Grid>
            </Grid>
          )}

          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
          >
            Register
          </SubmitButton>
        </form>
      </PaperStyled>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Registration successful!
        </Alert>
      </Snackbar>
      </Container>
      </BackgroundContainer>
     
      </>
  );
};

export default RegistrationForm;
