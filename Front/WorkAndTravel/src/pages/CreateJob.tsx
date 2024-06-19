import React, { ChangeEvent, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { countries, codes } from 'currency-codes-ts';
import { MapForm } from "../components/GoogleMapsComponent";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const steps = ['General information', 'Location', 'Images'];
interface FormData {
  name: string;
  email: string;
  country: string;
  latCoordinate: string;
  longCoordinate: string;
  job: string;
  salary: string;
  currency: string;
  description: string;
  contactInfo: string;
  mainImage: File | null;
  secondaryImages: Array<File>;
}


const countriesList = countries(); // Get the list of all country names
const currencyCodeList = codes();

const CreateJob = () => {

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [position, setPosition] = useState({ lat: 40.7567955, lng: -73.9512418 });
  const mapStyles = {
    height: "70vh",
    width: "100%"
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    country: '',
    latCoordinate: '',
    longCoordinate: '',
    job: '',
    salary: '',
    currency: '',
    description: '',
    contactInfo: '',
    mainImage: null,
    secondaryImages: []
  });

  const handleNext = () => {

    if (activeStep === 2) {
      console.log(formData);

      let data = new FormData();
      data.append("email", formData.email);
      data.append("name", formData.name);
      data.append("country", formData.country);
      data.append("job", formData.job);
      data.append("salary", formData.salary);
      data.append("currency", formData.currency);
      data.append("description", formData.description);
      data.append("contactInfo", formData.contactInfo);
      data.append("longCoordinate", position.lng.toString());
      data.append("latCoordinate", position.lat.toString());

      // Append mainImage if it's not null
      if (formData.mainImage) {
        data.append('mainImage', formData.mainImage);
      }
      // Append secondaryImages
      for (let i = 0; i < formData.secondaryImages.length; i++) {
        data.append('secondaryImages', formData.secondaryImages[i]);
      }
      const userId = localStorage.getItem('userId') || '';

      data.append("authorId", userId);
      axios.post('/job', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      console.log("submited data");
      //navigate('/');

    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const fileList = (e.target as HTMLInputElement).files;
      if (fileList) {
        if (name === 'mainImage') {
          const newMainImage = fileList[0];
          setMainImage(newMainImage); // Update mainImage
          setFormData(prevFormData => ({ ...prevFormData, mainImage: newMainImage })); // Update formData
        } else if (name === 'secondaryImages') {
          setSecondaryImages(Array.from(fileList)); // Replace secondaryImages array with a new array containing only the new file
          setFormData(prevFormData => ({ ...prevFormData, secondaryImages: Array.from(fileList) })); // Update formData
        }
      }
    } else {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value })); // Update formData for other fields
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setMainImage(file);
    if (file) {
      setFormData(prevFormData => ({ ...prevFormData, mainImage: file }));
    }
  };

  const handleSecondaryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSecondaryImages(files);
    setFormData(prevFormData => ({ ...prevFormData, secondaryImages: files }));
  };

  const handleDeleteSecondaryImage = (index: number) => {
    const updatedSecondaryImages = [...secondaryImages];
    updatedSecondaryImages.splice(index, 1);
    setSecondaryImages(updatedSecondaryImages);
    setFormData(prevFormData => ({ ...prevFormData, secondaryImages: updatedSecondaryImages }));
  };



  return (
    <div style={{ margin: '20px 15% 0' }}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          // Display this section when all steps are completed
          <div>
            {/* Content for when all steps are completed. NEVER USED */}
          </div>
        ) : (
          // Display this section when there are still steps to complete
          <div>
            {/* Load different components for each step */}
            {activeStep === 0 && (<Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
                marginTop: "20px",
                padding: 4,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#f9f9f9'
              }}
            >
              <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
                General Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Business name" name="name" value={formData.name} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Business email" name="email" value={formData.email} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleSelectChange}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200, // Limit the height of the dropdown menu
                            overflowY: 'auto' // Enable vertical scrolling
                          },
                        },
                      }}
                    >
                      {countriesList.map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="job title" name="job" value={formData.job} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Salary (per month)" name="salary" value={formData.salary} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      label="Currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleSelectChange}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200, // Limit the height of the dropdown menu
                            overflowY: 'auto' // Enable vertical scrolling
                          },
                        },
                      }}
                    >
                      {currencyCodeList.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} fullWidth multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Contact Info" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} fullWidth />
                </Grid>
              </Grid>
            </Box>)}
            {activeStep === 1 && (<Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '1000px',
                margin: '0 auto',
                marginTop: "20px",
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#f9f9f9'
              }}
            >
              <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 2 }}>
                Location
              </Typography>
              <MapForm />
            </Box>)}
            {activeStep === 2 && (
              <>
                {/* Main Image Container */}
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    marginTop: "20px",
                    padding: 4,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
                    Main Image
                  </Typography>
                  {/* Main Image Input */}
                  <label htmlFor="main-image-input" style={{ display: 'block', marginBottom: '8px' }}>
                    Choose Main Image (It will be used as a preview on the jobs page)
                  </label>
                  <input
                    id="main-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="main-image-input">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                  {mainImage && (
                    <Card sx={{ maxWidth: 300, marginTop: 2 }}>
                      <CardContent>
                        <Typography variant="body1">Main Image:</Typography>
                        <img src={URL.createObjectURL(mainImage)} alt="Main" style={{ maxWidth: '100%' }} />
                      </CardContent>
                      <CardActions>
                        <IconButton aria-label="delete" onClick={() => setMainImage(null)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )}
                </Box>

                {/* Secondary Images Container */}
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    marginTop: "20px",
                    padding: 4,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
                    Secondary Images
                  </Typography>
                  {/* Secondary Images Input */}
                  <label htmlFor="secondary-image-input" style={{ display: 'block', marginBottom: '8px' }}>
                    Choose Secondary Image(s)
                  </label>
                  <input
                    id="secondary-image-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleSecondaryImagesChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="secondary-image-input">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </label>
                  {secondaryImages.length > 0 && (
                    <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {secondaryImages.map((image, index) => (
                        <Card
                          key={index}
                          sx={{
                            maxWidth: 'calc(50% - 8px)',
                            margin: '0 4px 8px',
                            '@media (max-width: 600px)': {
                              maxWidth: '100%',
                              margin: '0 0 8px'
                            }
                          }}
                        >
                          <CardContent>
                            <img src={URL.createObjectURL(image)} alt={`Secondary ${index}`} style={{ maxWidth: '100%' }} />
                          </CardContent>
                          <CardActions>
                            <IconButton aria-label="delete" onClick={() => handleDeleteSecondaryImage(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      ))}
                    </Box>
                  )}
                </Box>
              </>
            )}

            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
}

export default CreateJob;
