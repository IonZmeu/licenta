import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { getDocument } from 'pdfjs-dist';
import ImageSlider from '../components/ImageSlider';
import { pdfjs } from 'react-pdf';
import { Skill, Education, WorkExperience, userDTO, ProfileDTOGet } from '../interfaces/types';
import { useAppContext } from '../components/AppContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThreadDTO, JobDTO } from '../interfaces/types';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

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
  const [createdJobs, setCreatedJobs] = useState<JobDTO[]>([]);
  const [createdThreads, setCreatedThreads] = useState<ThreadDTO[]>([]);
  const [user, setUser] = useState<userDTO>();
  const { value, setValue } = useAppContext();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
      </Button>
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

  const handleDeleteJob = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4123/job/${id}`);
    } catch (error) {
      console.error('Failed to delete job', error);
    }
  };

  const handleDeleteThread = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4123/thread/${id}`);
    } catch (error) {
      console.error('Failed to delete thread', error);
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const fetchThreads = async () => {
    try {
      const response = await axios.get<ThreadDTO[]>('http://localhost:4123/user/threads/followed', {
        params: {
          userId: localStorage.getItem('userId')
        }
      });
      const threads = response.data;
      const created = threads.filter(thread => thread.authorId === parseInt(localStorage.getItem('userId') || ""));
      setCreatedThreads(created);
    } catch (error) {
      console.log('Error fetching threads', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get<JobDTO[]>('http://localhost:4123/user/jobs/followed', {
        params: {
          userId: localStorage.getItem('userId')
        }
      });
      const jobs = response.data;
      console.log(response.data);
      const created = jobs.filter(job => job.userId === parseInt(localStorage.getItem('userId') || ""));
      setCreatedJobs(created);
    } catch (error) {
      console.log('Error fetching threads', error);
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

  const onOpenJob = (jobId: number) => {
    navigate(`/job/${jobId}`);
  }
  const onDeleteJob = (jobId: number) => {
    handleDeleteJob(jobId);
    setValue(!value);
  }
  const onOpenThread = (threadId: number) => {
    navigate(`/forum/thread/${threadId}`);
  }
  const onDeleteThread = (threadId: number) => {
    handleDeleteThread(threadId);
    setValue(!value);
  }

  const handleAddSkill = () => {
    setSkills((prevSkills) => [
      ...prevSkills,
      { id: prevSkills.length + 1, name: '' },
    ]);
  };

  const handleAddWorkExperience = () => {
    setWorkExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        id: prevExperiences.length + 1,
        company: '',
        role: '',
        description: '',
        startDate: dayjs(), // Initialize startDate with current date if needed
        endDate: dayjs(),   // Initialize endDate with current date if needed
      } as WorkExperience, // Ensure type assertion to WorkExperience
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

  const handleWorkExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    expId: number,
    field: keyof WorkExperience
  ) => {
    const existingExp = workExperiences.find(exp => exp.id === expId);

    if (!existingExp) {
      console.error(`Work experience with id ${expId} not found.`);
      return; // Handle or exit gracefully if no matching experience found
    }

    const updatedExp: WorkExperience = {
      ...existingExp,
      [field]: e.target.value
    };
    onUpdateWorkExperience(updatedExp);
  };

  const handleRemoveWorkExperience = () => {
    setWorkExperiences((prevExperiences) => prevExperiences.slice(0, -1));
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



  useEffect(() => {
    fetchJobs();
    fetchThreads();
  }, [value]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchProfileData = async () => {
      try {
        const userId = await localStorage.getItem('userId');
        if (userId) {
          const profileResponse = await axios.get<ProfileDTOGet>(`http://localhost:4123/profile/${userId}`);
          const profileData = profileResponse.data;

          if (isMounted) {
            // Set skills, education, work experiences
            setSkills(profileData.skills || []);
            setEducation(profileData.education || []);

            // Convert Java LocalDateTime to dayjs for work experiences
            const updatedWorkExperiences = profileData.workExperiences.map((experience: any) => {
              // Assuming startDate and endDate are fields in each experience object
              const startDate = dayjs(experience.startDate);
              const endDate = dayjs(experience.endDate);
              return {
                ...experience,
                startDate,
                endDate,
              };
            });

            if (isMounted) {
              setWorkExperiences(updatedWorkExperiences);
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
    setValue(!value);
    setOpen(true);
  };

  const onCVImageClick = () => {
    console.log('Clicked on image of CV');
  };

  const handleDateChange = (date: dayjs.Dayjs | null, expId: number, field: 'startDate' | 'endDate') => {
    const existingExp = workExperiences.find(exp => exp.id === expId);

    if (!existingExp) {
      console.error(`Work experience with id ${expId} not found.`);
      return; // Handle or exit gracefully if no matching experience found
    }

    // Check if date is null (picker cleared)
    if (date === null) {
      console.error(`Date is null for ${field} in work experience id ${expId}.`);
      return; // Handle or exit gracefully if date is null
    }

    // Validate if date is a dayjs object
    if (!dayjs.isDayjs(date)) {
      console.error(`Invalid date format for ${field} in work experience id ${expId}. Expected dayjs object.`);
      return; // Handle or exit gracefully if date is not a dayjs object
    }

    // Construct updated experience with the new date
    const updatedExp: WorkExperience = {
      ...existingExp,
      [field]: date ? dayjs(date) : dayjs(), // Convert Date to dayjs or use current dayjs date
    };

    onUpdateWorkExperience(updatedExp);
  };

  function onUpdateWorkExperience(updatedExp: WorkExperience) {
    setWorkExperiences((prevExperiences) => {
      // Find the index of the updated work experience by id
      const index = prevExperiences.findIndex((exp) => exp.id === updatedExp.id);

      if (index === -1) {
        console.error(`Work experience with id ${updatedExp.id} not found.`);
        return prevExperiences; // Return previous state unchanged if not found
      }

      // Create a new array with the updated work experience object
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index], // Preserve other fields
        ...updatedExp, // Update with new values
      };

      return updatedExperiences;
    });
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {user?.username}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
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
            />
            <Button
              variant="outlined"
              onClick={handleResetProfileImage}
              sx={{ marginTop: '10px' }}
            >
              Reset Profile Image
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
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
          <Paper elevation={3} sx={{ padding: '20px' }}>
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
                sx={{ margin: '5px 0px' }}
              />
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
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
                  sx={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Institution"
                  variant="outlined"
                  fullWidth
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(e, edu.id, 'institution')}
                  sx={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Year"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(e, edu.id, 'year')}
                  sx={{ margin: '5px 0px' }}
                />
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
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
                  sx={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Role"
                  variant="outlined"
                  fullWidth
                  value={exp.role}
                  onChange={(e) => handleWorkExperienceChange(e, exp.id, 'role')}
                  sx={{ margin: '5px 0px' }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={exp.description}
                  onChange={(e) => handleWorkExperienceChange(e, exp.id, 'description')}
                  sx={{ margin: '5px 0px' }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={exp.startDate}  // Assuming exp.startDate is a Date object
                    onChange={(date) => handleDateChange(date, exp.id, 'startDate')}
                    disableFuture
                    openTo="day"
                    views={['year', 'month', 'day']}
                  />

                  <DatePicker
                    label="End Date"
                    value={exp.endDate}  // Assuming exp.endDate is a Date object
                    onChange={(date) => handleDateChange(date, exp.id, 'endDate')}
                    disableFuture
                    openTo="day"
                    views={['year', 'month', 'day']}
                  />
                </LocalizationProvider>
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
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Profile Saved"
            action={action}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>
            Created Jobs
          </Typography>
          {createdJobs.map((job) => (
            <Box
              key={job.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding={1}
              border={1}
              borderColor="grey.300"
              borderRadius={2}
              marginBottom={1}
            >
              <Typography
                variant="body2"
                onClick={() => onOpenJob(job.id)}
                sx={{ cursor: 'pointer' }}
              >
                {job.name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteJob(job.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>
            Created Threads
          </Typography>
          {createdThreads.map((thread) => (
            <Box
              key={thread.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding={1}
              border={1}
              borderColor="grey.300"
              borderRadius={2}
              marginBottom={1}
            >
              <Typography
                variant="body2"
                onClick={() => onOpenThread(thread.id)}
                sx={{ cursor: 'pointer' }}
              >
                {thread.threadTitle}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => onDeleteThread(thread.id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;


