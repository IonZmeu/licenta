import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import BadgeIcon from '@mui/icons-material/Badge';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import { Avatar, ListItemText } from '@mui/material';
import axios from 'axios';
import { ThreadDTO, JobDTO } from '../interfaces/types';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}



export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [createdThreads, setCreatedThreads] = useState<ThreadDTO[]>([]);
  const [followedThreads, setFollowedThreads] = useState<ThreadDTO[]>([]);
  const [pfp, setPfp] = useState<string>("");
  const [createdJobs, setCreatedJobs] = useState<JobDTO[]>([]);
  const [followedJobs, setFollowedJobs] = useState<JobDTO[]>([]);
  const [updateFlag, setUpdateFlag] = useState(false);


  const fetchImage = async (imageId: number | string): Promise<string> => {
    try {
      const response = await axios.get(`http://localhost:4123/image/pfp/${imageId}`);
      return response.data; // Assuming backend returns the base64 string directly
    } catch (error) {
      console.log('Error fetching image: ', error);
      return "";
    }
  };

  const navigate = useNavigate();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  interface TriggerUpdateContextType {
    triggerUpdate: () => void;
  }

  function Logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    const fetchAndSetImage = async (authorId: string | number) => {
      const profileImage = await fetchImage(authorId);
      setPfp(profileImage);
    };

    const fetchThreads = async () => {
      try {
        const response = await axios.get<ThreadDTO[]>('http://localhost:4123/user/threads/followed', {
          params: {
            userId: localStorage.getItem('userId')
          }
        });
        const threads = response.data;
        // Assuming the threads are categorized as created or followed based on authorId
        const created = threads.filter(thread => thread.authorId === parseInt(localStorage.getItem('userId') || ""));
        const followed = threads.filter(thread => thread.authorId !== parseInt(localStorage.getItem('userId') || ""));
        setCreatedThreads(created);
        setFollowedThreads(followed);
      } catch (error) {
        console.log('Error fetching threads', error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get<ThreadDTO[]>('http://localhost:4123/user/jobs/followed', {
          params: {
            userId: localStorage.getItem('userId')
          }
        });
        const jobs = response.data;
        // Assuming the threads are categorized as created or followed based on authorId
        const created = jobs.filter(job => job.authorId === parseInt(localStorage.getItem('userId') || ""));
        const followed = jobs.filter(job => job.authorId !== parseInt(localStorage.getItem('userId') || ""));
        setCreatedJobs(created);
        setFollowedJobs(followed);
      } catch (error) {
        console.log('Error fetching threads', error);
      }
    };

    fetchThreads();
    fetchJobs();
    fetchAndSetImage(parseInt(localStorage.getItem('userId') || ""));
    console.log("updated drawer")
  }, []);

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: 'primary.main' }}>
        <TravelExploreIcon sx={{ marginRight: 2 }} />
        <Typography
          onClick={() => navigate('/')}
          variant="h6"
          noWrap
          component="a"
          className="clickableWAT"
          color={"white"}
          sx={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          Work And Travel
        </Typography>
      </Toolbar>
      <Divider />

      <List>
        <ListItem key={"Forum"} disablePadding>
          <ListItemButton onClick={() => navigate('/forum/1')}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary={"Forum"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Jobs"} disablePadding>
          <ListItemButton onClick={() => navigate('/jobs/1')}>
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary={"Jobs"} />
          </ListItemButton>
        </ListItem>
        {localStorage.getItem('token') != null ? (
          <div>
            <ListItem key={"Create Job"} disablePadding>
              <ListItemButton onClick={() => navigate('/CreateJob')}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Job"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Create Thread"} disablePadding>
              <ListItemButton onClick={() => navigate('/CreateThread')}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Create Thread"} />
              </ListItemButton>
            </ListItem>
          </div>
        ) : null}
        {localStorage.getItem('token') != null ? (
          <div>
            <ListItem key={"Logout"} disablePadding>
              <ListItemButton onClick={() => Logout()}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </div>
        ) : null}

        {localStorage.getItem('token') === null ? (
          <ListItem key={"Login"} disablePadding>
            <ListItemButton onClick={() => navigate('/login')}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        ) : null}
      </List>

      {localStorage.getItem('token') != null ? (
        <div>
          <Divider />
          <Typography variant="h6">{"Created Threads"}</Typography>
          {createdThreads.map((thread) => (
            <ListItemButton key={thread.id} onClick={() => navigate(`/forum/thread/${thread.id}`)}>
              <ListItemIcon>
                <ChatBubbleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={thread.threadTitle} />
            </ListItemButton>
          ))}
          <Divider />

          <Typography variant="h6">{"Followed Threads"}</Typography>
          {followedThreads.map((thread) => (
            <ListItemButton key={thread.id} onClick={() => navigate(`/forum/thread/${thread.id}`)}>
              <ListItemIcon>
                <ChatBubbleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={thread.threadTitle} />
            </ListItemButton>
          ))}
          <Divider />
        </div>
      ) : null}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            A new experience ...
          </Typography>

          {localStorage.getItem('token') != null && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/Profile')} disableRipple sx={{
                  '&:hover': {
                    boxShadow: 'none'
                  },
                }}>
                  <Avatar
                    src={pfp}
                    alt="Profile Picture"
                    sx={{
                      width: 40,
                      height: 40,
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: 'none'
                      },
                    }}
                  >
                    {!pfp && (localStorage.getItem('username')?.slice(0, 2).toUpperCase() ?? 'NA')}
                  </Avatar>
                </ListItemButton>
              </ListItem>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: "60px" }}
      >
        {children}
      </Box>
    </Box>
  );
}