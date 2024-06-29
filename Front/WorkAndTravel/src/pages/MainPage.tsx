import { Container, Typography, Grid, Card, CardContent, CardMedia, Skeleton, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      {/* Hero Section */}
      <Grid container spacing={1} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
            Welcome to Work and Travel!
          </Typography>
          <Typography variant="h5" align="center" paragraph style={{ fontFamily: 'Arial', lineHeight: '1.6' }}>
            Discover exciting job opportunities and connect with employers from around the world. Our platform offers a diverse array of options to suit your skills and ambitions.
          </Typography>
        </Grid>
      </Grid>

      {/* Features Overview */}
      <Grid container spacing={4} style={{ marginTop: '40px' }}>
        <Grid item xs={12} sm={4}>
          <Card style={{
            height: '100%',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s ease-in-out'
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.2)';
            }}>
            <CardContent onClick={() => navigate("/jobs/1")}>
              <Typography variant="h6" align="center" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Explore Job Postings</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Discover a diverse array of seasonal job opportunities tailored for students looking to work and travel." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Find positions in hospitality, tourism, event staffing, and more, ideal for enhancing your travel experience while earning income." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Our platform connects you with businesses seeking enthusiastic students for short-term roles across various destinations." />
                </ListItem>
              </List>
              <WorkIcon sx={{ fontSize: 60, display: 'block', margin: '15px auto' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card style={{
            height: '100%',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s ease-in-out'
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.2)';
            }}>
            <CardContent onClick={() => navigate("/profile")}>
              < Typography variant="h6" align="center" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Customize Your Profile</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Personalize your profile to showcase your skills, interests, and availability for seasonal work." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Highlight your previous work experiences, language skills, and any relevant qualifications that make you an ideal candidate for seasonal employment." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Stand out to employers who are actively recruiting students like you for exciting opportunities in different industries and locations." />
                </ListItem>
              </List>
              <AccountBoxIcon sx={{ fontSize: 60, display: 'block', margin: '15px auto' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card style={{
            height: '100%',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s ease-in-out'
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.2)';
            }}>
            <CardContent onClick={() => navigate("/forum/1")}>
              <Typography variant="h6" align="center" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Join the Conversation</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Engage in lively discussions and connect with fellow students and professionals interested in seasonal work and travel." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Share insights, ask questions, and participate in forums covering various topics such as travel tips, work experiences, cultural exchange, and career advice." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Expand your network and learn from others who share your passion for exploring new opportunities around the globe." />
                </ListItem>
              </List>
              <ChatIcon sx={{ fontSize: 60, display: 'block', margin: '15px auto' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container >
  );
};

export default MainPage;
