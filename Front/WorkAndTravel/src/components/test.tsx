import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Container, Grid, Paper, Typography } from '@mui/material';

const Test = () => {
  const [profileData, setProfileData] = useState({
    profileImage: 'https://via.placeholder.com/150', // Placeholder image URL
    skills: [
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'React' },
      { id: 3, name: 'Node.js' },
    ],
    education: [
      { id: 1, degree: 'Bachelor of Science', institution: 'University A', year: 2010 },
      { id: 2, degree: 'Master of Arts', institution: 'University B', year: 2015 },
    ],
    workExperiences: [
      { id: 1, company: 'Company X', role: 'Developer', startYear: 2012, endYear: 2015 },
      { id: 2, company: 'Company Y', role: 'Manager', startYear: 2015, endYear: 2020 },
    ],
  });

  useEffect(() => {
    // Simulate fetching profile data from backend (replace with actual API call)
    // fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://example.com/api/profile'); // Replace with your backend endpoint
      const data = response.data;

      // Update profileData state with fetched data
      setProfileData({
        profileImage: data.profileImage,
        skills: data.skills,
        education: data.education,
        workExperiences: data.workExperiences,
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Display Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} textAlign="center">
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Profile Image
            </Typography>
            <Avatar sx={{ width: '100px', height: '100px', margin: 'auto' }} src={profileData.profileImage} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap'  }}>
              {profileData.skills.map((skill) => (
                <Typography
                  key={skill.id}
                  variant="body1"
                  component="div"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    padding: '4px 8px',
                    borderRadius: '16px',
                    display: 'inline-block',
                    marginBottom: '8px',
                  }}
                >
                  {skill.name}
                </Typography>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            {profileData.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '16px' }}>
                <Typography variant="body1">Degree: {edu.degree}</Typography>
                <Typography variant="body1">Institution: {edu.institution}</Typography>
                <Typography variant="body1">Year: {edu.year}</Typography>
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Work Experiences
            </Typography>
            {profileData.workExperiences.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: index < profileData.workExperiences.length - 1 ? '16px' : '0' }}>
                <Typography variant="body1">Company: {exp.company}</Typography>
                <Typography variant="body1">Role: {exp.role}</Typography>
                <Typography variant="body1">Start Year: {exp.startYear}</Typography>
                <Typography variant="body1">End Year: {exp.endYear}</Typography>
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Test;
