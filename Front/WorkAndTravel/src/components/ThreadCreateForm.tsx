import { ChangeEvent, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { FormData } from '../interfaces/types';

const ThreadCreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [Images, setImages] = useState<File[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    Images: []
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setFormData(prevFormData => ({ ...prevFormData, Images: files }));
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...Images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setFormData(prevFormData => ({ ...prevFormData, Images: updatedImages }));
  };

  const handleSubmit = () => {
    const formData: FormData = { title, content, Images };
    console.log(formData);
    // Add your logic to submit the form data
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
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
            Title and Description
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Title" name="title" value={title} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Content" name="content" value={content} onChange={handleInputChange} fullWidth multiline rows={4} />
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
              backgroundColor: '#f9f9f9'
            }}
          >
            <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: 3 }}>
              Images
            </Typography>
            {/* Images Input */}
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
        </Box>
      </Box>
    </div>
  );
};

export default ThreadCreateForm;
