import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Container,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import { getDocument } from 'pdfjs-dist';
import ImageSlider from '../components/ImageSlider';
import { pdfjs } from 'react-pdf';
import { Skill, Education, WorkExperience, ProfileDTOGet } from '../interfaces/types';
import { useParams } from 'react-router-dom';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Custom styles using the styled API
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ProfileOther: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvImages, setCvImages] = useState<string[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [formError, setFormError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const userId = useParams<{ id?: string }>();

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchProfileData = async () => {
      try {
        const userId = await localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get<ProfileDTOGet>(`http://localhost:4123/profile/${userId}`);
          const profileData = response.data;

          if (isMounted) {
            setSkills(profileData.skills || []);
            setEducation(profileData.education || []);
            setWorkExperiences(profileData.workExperiences || []);
            setUsername(profileData.username);

            if (profileData.pfpImage) {
              const pfp = await fetchImage(profileData.pfpImage.id);
              const base64String = pfp.split(',')[1];
              const pfpBlob = base64ToBlob(base64String);
              if (pfpBlob) {
                const pfpFile = new File([pfpBlob], 'profile_image.jpg', { type: 'image/jpeg' });
                if (isMounted) setProfileImage(pfpFile);
              }
            }

            if (profileData.cvImages) {
              const cvImageBase64s = await Promise.all(
                profileData.cvImages.map(async (image) => {
                  const cvImg = await fetchImage(image.id);
                  return cvImg.split(',')[1];
                })
              );

              const base64Images = cvImageBase64s.map((base64) => {
                return `data:image/jpeg;base64,${base64}`;
              });
              setCvImages(base64Images);
            }
          }
        } else {
          console.error('User ID not found in localStorage.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);

  const fetchImage = async (imageId: number | string): Promise<string> => {
    try {
      const response = await axios.get(`http://localhost:4123/image/${imageId}`);
      return response.data; // Assuming backend returns the base64 string directly
    } catch (error) {
      console.log('Error fetching image: ', error);
      return "";
    }
  };

  const base64ToBlob = (base64: string, type: string = 'image/jpeg'): Blob | null => {
    try {
      const byteCharacters = atob(base64);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type });
    } catch (e) {
      console.error('Invalid base64 string:', base64);
      return null;
    }
  };

  const roundedTypographyStyle = {
    display: 'inline-block',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    marginBottom: '8px',
    marginRight: '4px',
    marginLeft: '4px',
  };
  const roundedTypographyWidthStyle = {
    display: 'inline-block',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    marginBottom: '8px',
    marginRight: '4px',
    marginLeft: '4px',
    width: "100%",
  };

  const onCVImageClick = () => {
    console.log('Clicked on image of CV');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {username}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Profile Image
            </Typography>
            <Avatar
              sx={{ width: '100px', height: '100px', margin: 'auto' }}
              src={profileImage ? URL.createObjectURL(profileImage) : ""}
            />
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              CV (PDF)
            </Typography>
            {cvImages.length > 0 && (
              <ImageSlider imageUrls={cvImages} onImageClick={onCVImageClick} />
            )}
          </StyledPaper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <div>
              {skills.map((skill) => (
                <Typography key={skill.id} variant="body1" style={roundedTypographyStyle}>
                  {skill.name}
                </Typography>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            {education.map((edu) => (
              <div key={edu.id} style={roundedTypographyWidthStyle}>
                <Typography variant="body1" gutterBottom>
                  <strong>Degree:</strong> {edu.degree}<br />
                  <strong>Institution:</strong> {edu.institution}<br />
                  <strong>Year:</strong> {edu.year}
                </Typography>
              </div>
            ))}
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Work Experience
            </Typography>
            {workExperiences.map((exp) => (
              <div key={exp.id} style={roundedTypographyWidthStyle} >
                <Typography variant="body1" gutterBottom>
                  <strong>Role:</strong> {exp.role}<br />
                  <strong>Company:</strong> {exp.company}<br />
                  <strong>Company:</strong> {exp.description}<br />
                  <strong>Start Year:</strong> {exp.startYear}<br />
                  <strong>End Year:</strong> {exp.endYear}
                </Typography>
              </div>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileOther;
