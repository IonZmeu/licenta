import { ChangeEvent, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ThreadCreateDTO } from '../interfaces/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const ThreadCreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [Images, setImages] = useState<File[]>([]);
  const [titleError, setTitleError] = useState<string>('');
  const [contentError, setContentError] = useState<string>('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ThreadCreateDTO>({
    userId: localStorage.getItem('userId') || '',
    title: '',
    content: '',
    Images: []
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      navigate('/');
      return;
    }
    navigate('/');
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
      setTitleError(value.trim() ? '' : 'Title is required');
    } else if (name === 'content') {
      setContent(value);
      setContentError(value.trim() ? '' : 'Content is required');
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...Images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = () => {
    // Validate title and content
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    if (!content.trim()) {
      setContentError('Content is required');
      return;
    }

    // Proceed with form submission logic here
    const userId = localStorage.getItem('userId') || '';
    const formData: ThreadCreateDTO = { userId, title, content, Images };
    console.log(formData);


    axios.post('/thread', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    console.log("submitted data");
    setOpen(true);
  };

  return (
    <div style={{ margin: '20px 15% 0' }}>
      <Box sx={{ width: '100%' }}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: 4,
            border: '1px solid #ccc',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
            Title and Description
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={title}
                onChange={handleInputChange}
                fullWidth
                error={!!titleError}
                helperText={titleError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                name="content"
                value={content}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                error={!!contentError}
                helperText={contentError}
              />
            </Grid>
            {/* Add other input fields */}
          </Grid>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto',
              padding: 4,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
              Images
            </Typography>

            <label htmlFor="image-input" style={{ display: 'block', marginBottom: '8px' }}>
              Choose Image(s)
            </label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-input">
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            {Images.length > 0 && (
              <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {Images.map((image, index) => (
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
                      <img src={URL.createObjectURL(image)} alt={`${index}`} style={{ maxWidth: '100%' }} />
                    </CardContent>
                    <CardActions>
                      <IconButton aria-label="delete" onClick={() => handleDeleteImage(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            )}
          </Box>

          {/* Submit button */}
          <Button type="submit" variant="contained" sx={{ width: '150px', margin: '20px auto' }}>
            Submit
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Thread created, navigating to home page"
            action={action}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ThreadCreateForm;
