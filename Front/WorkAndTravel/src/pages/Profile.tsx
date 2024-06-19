import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { getDocument } from 'pdfjs-dist';
import ImageSlider from '../components/ImageSlider';
import { pdfjs } from 'react-pdf';
import { Skill, Education, WorkExperience, userDTO, ProfileDTOGet } from '../interfaces/types';
import { useParams } from 'react-router-dom';
import { useUpdate } from '../components/UpdateContext';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const ProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [cvImagesFiles, setCvImagesFiles] = useState<File[]>([]);
  const [cvImages, setCvImages] = useState<string[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [numPages, setNumPages] = useState<number>(0);
  const [formError, setFormError] = useState<string>('');
  const [user, setUser] = useState<userDTO>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleCvChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCv(file);

      try {
        const pdf = await getDocument(URL.createObjectURL(file)).promise;
        setNumPages(pdf.numPages);

        const files: File[] = []; // Array to store File objects
        const dataUrls: string[] = []; // Array to store data URLs

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d')!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;

          // Convert canvas to blob (File) and add to files array
          canvas.toBlob((blob) => {
            if (blob) {
              const pageFile = new File([blob], `cv_page_${i}.jpg`, {
                type: 'image/jpeg',
              });
              files.push(pageFile);
            }
          }, 'image/jpeg');

          // Convert canvas to data URL and add to dataUrls array
          dataUrls.push(canvas.toDataURL());
        }

        setCvImagesFiles(files); // Set the files array to state
        setCvImages(dataUrls); // Set the data URLs array to state
        setFormError('');
      } catch (error) {
        console.error('Error processing PDF:', error);
        setFormError('Error processing PDF. Please try again.');
      }
    }
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [
      ...prevSkills,
      { id: prevSkills.length + 1, name: '' },
    ]);
  };

  const handleRemoveSkill = () => {
    setSkills((prevSkills) => prevSkills.slice(0, -1));
  };

  const handleSkillChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id ? { ...skill, name: event.target.value } : skill,
    );
    setSkills(updatedSkills);
  };

  const handleAddEducation = () => {
    setEducation((prevEducation) => [
      ...prevEducation,
      { id: prevEducation.length + 1, degree: '', institution: '', year: 0 },
    ]);
  };

  const handleRemoveEducation = () => {
    setEducation((prevEducation) => prevEducation.slice(0, -1));
  };

  const handleEducationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    field: string,
  ) => {
    const updatedEducation = education.map((edu) =>
      edu.id === id ? { ...edu, [field]: event.target.value } : edu,
    );
    setEducation(updatedEducation);
  };

  const handleAddWorkExperience = () => {
    setWorkExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        id: prevExperiences.length + 1,
        company: '',
        role: '',
        description: '',
        startYear: 0,
        endYear: 0,
      },
    ]);
  };

  const handleRemoveWorkExperience = () => {
    setWorkExperiences((prevExperiences) => prevExperiences.slice(0, -1));
  };

  const handleWorkExperienceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    field: string,
  ) => {
    const updatedExperiences = workExperiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: event.target.value } : exp,
    );
    setWorkExperiences(updatedExperiences);
  };

  const handleResetAll = () => {
    setProfileImage(null);
    setCv(null);
    setCvImages([]);
    setSkills([]);
    setEducation([]);
    setWorkExperiences([]);
    setNumPages(0);
    setFormError('');
  };

  const handleResetCv = () => {
    setCv(null);
    setCvImages([]);
    setCvImagesFiles([]);
    setNumPages(0);
    setFormError('');
  };

  const handleResetProfileImage = () => {
    setProfileImage(null);
  };

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

  const convertFilesToBase64 = (files: File[]): Promise<string[]> => {
    const promises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };


  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchProfileData = async () => {
      try {
        const userId = await localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get<ProfileDTOGet>(`http://localhost:4123/profile/${userId}`);
          const profileData = response.data;
          console.log(response.data);

          if (isMounted) {
            setSkills(profileData.skills || []);
            setEducation(profileData.education || []);
            setWorkExperiences(profileData.workExperiences || []);

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

              const cvFiles = cvImageBase64s.map((base64, index) => {
                const blob = base64ToBlob(base64);
                if (blob) {
                  return new File([blob], `cv_image_${index + 1}.jpg`, { type: 'image/jpeg' });
                }
                return null;
              }).filter(file => file !== null) as File[];
              if (isMounted) setCvImagesFiles(cvFiles);
              const base64Images = await convertFilesToBase64(cvFiles);
              setCvImages(base64Images);
            }

            const response = await axios.get<userDTO>(`http://localhost:4123/user/${userId}`);
            setUser(response.data);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    const userId = await localStorage.getItem('userId') || '';

    const profileDTO = {
      userId: Number(userId), // Ensure this is correctly populated
      skills: skills || [],
      education: education || [],
      workExperiences: workExperiences || [],
    };

    const profileDTOStr = JSON.stringify(profileDTO);
    formData.append('profileDTO', new Blob([profileDTOStr], { type: 'application/json' }));

    // Append profile image if selected
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    cvImagesFiles.forEach((file, index) => {
      formData.append('cvImages', file); // Append each cvImageFile
    });

    try {
      const response = await axios.put('http://localhost:4123/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    const { triggerUpdate } = useUpdate();
    triggerUpdate();
  };

  const onCVImageClick = () => {
    console.log('Clicked on image of CV');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {user?.username}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Profile Image
            </Typography>
            <Avatar
              sx={{ width: '100px', height: '100px', margin: 'auto' }}
              src={profileImage ? URL.createObjectURL(profileImage) : ""}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '10px' }}
            />
            <Button
              variant="outlined"
              onClick={handleResetProfileImage}
              style={{ marginTop: '10px' }}
            >
              Reset Profile Image
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              CV (PDF)
            </Typography>
            <input type="file" accept="application/pdf" onChange={handleCvChange} />
            {cvImages.length > 0 && (
              <ImageSlider imageUrls={cvImages} onImageClick={onCVImageClick} />
            )}
            <Button variant="outlined" onClick={handleResetCv}>
              Reset CV
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Button variant="outlined" onClick={handleAddSkill}>
              Add Skill
            </Button>
            <Button variant="outlined" onClick={handleRemoveSkill}>
              Remove Last Skill
            </Button>
            {skills.map((skill) => (
              <TextField
                key={skill.id}
                label="Skill"
                variant="outlined"
                fullWidth
                value={skill.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSkillChange(e, skill.id)
                }
                style={{ margin: '5px 0px' }}
              />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Button variant="outlined" onClick={handleAddEducation}>
              Add Education
            </Button>
            <Button variant="outlined" onClick={handleRemoveEducation}>
              Remove Last Education
            </Button>
            {education.map((edu) => (
              <div key={edu.id}>
                <TextField
                  label="Degree"
                  variant="outlined"
                  fullWidth
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(e, edu.id, 'degree')}
                  style={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Institution"
                  variant="outlined"
                  fullWidth
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(e, edu.id, 'institution')}
                  style={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Year"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(e, edu.id, 'year')}
                  style={{ margin: '5px 0px' }}
                />
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Button variant="outlined" onClick={handleAddWorkExperience}>
              Add Work Experience
            </Button>
            <Button variant="outlined" onClick={handleRemoveWorkExperience}>
              Remove Last Work Experience
            </Button>
            {workExperiences.map((exp) => (
              <div key={exp.id}>
                <TextField
                  label="Company"
                  variant="outlined"
                  fullWidth
                  value={exp.company}
                  onChange={(e) => handleWorkExperienceChange(e, exp.id, 'company')}
                  style={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Role"
                  variant="outlined"
                  fullWidth
                  value={exp.role}
                  onChange={(e) => handleWorkExperienceChange(e, exp.id, 'role')}
                  style={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={exp.description}
                  onChange={(e) => handleWorkExperienceChange(e, exp.id, 'description')}
                  style={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Start Year"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={exp.startYear}
                  onChange={(e) => handleWorkExperienceChange(e, exp.id, 'startYear')}
                  style={{ margin: '5px 0px' }}
                />
                <TextField
                  label="End Year"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={exp.endYear}
                  onChange={(e) => handleWorkExperienceChange(e, exp.id, 'endYear')}
                  style={{ margin: '5px 0px' }}
                />
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleResetAll}>
            Reset All
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage; 