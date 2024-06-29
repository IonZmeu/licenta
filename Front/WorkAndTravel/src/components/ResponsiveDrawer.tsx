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
import { Avatar, Button, Collapse, ListItemText, styled, useTheme } from '@mui/material';
import axios from 'axios';
import { ThreadDTO, JobDTO } from '../interfaces/types';
import { useAppContext } from './AppContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

const ScrollableList = styled(Box)({
  maxHeight: '200px',
  overflowY: 'auto',
});


export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [allRelatedThreads, setAllRelatedThreads] = useState<ThreadDTO[]>([]);
  const [createdThreads, setCreatedThreads] = useState<ThreadDTO[]>([]);
  const [followedThreads, setFollowedThreads] = useState<ThreadDTO[]>([]);
  const [pfp, setPfp] = useState<string>("");
  const [allRelatedJobs, setAllRelatedJobs] = useState<JobDTO[]>([]);
  const [createdJobs, setCreatedJobs] = useState<JobDTO[]>([]);
  const [followedJobs, setFollowedJobs] = useState<JobDTO[]>([]);
  const [expandedJobs, setExpandedJobs] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState(false);
  const { toggleDarkMode } = useAppContext();

  const theme = useTheme();


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
  const { value, setValue } = useAppContext();

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
        setAllRelatedThreads([...created, ...followed]);
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
        // Assuming the threads are categorized as created or followed based on authorId
        const created = jobs.filter(job => job.userId === parseInt(localStorage.getItem('userId') || ""));
        const followed = jobs.filter(job => job.userId !== parseInt(localStorage.getItem('userId') || ""));

        setCreatedJobs(created);
        setFollowedJobs(followed);
        setAllRelatedJobs([...created, ...followed]);

      } catch (error) {
        console.log('Error fetching threads', error);
      }
    };

    fetchThreads();
    fetchJobs();
    fetchAndSetImage(parseInt(localStorage.getItem('userId') || ""));
    console.log("updated drawer")
  }, [value]);

  const truncateTitle = (title: string | undefined, length: number) => {
    if (!title) return '';
    return title.length > length ? `${title.substring(0, length)}...` : title;
  };

  const drawer = (
    <Box >
      <Toolbar sx={{ backgroundColor: 'primary.main' }}>
        <TravelExploreIcon sx={{ marginRight: 2, fontSize: 20 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          color="white"
          sx={{ textDecoration: 'none' }}
        >
          Work And Travel
        </Typography>
      </Toolbar>

      <List>
        <ListItem key={"Forum"} disablePadding>
          <ListItemButton onClick={() => navigate('/forum/1')}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <ForumIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={"Forum"} sx={{ fontSize: '0.875rem' }} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Jobs"} disablePadding>
          <ListItemButton onClick={() => navigate('/jobs/1')}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <BadgeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={"Jobs"} sx={{ fontSize: '0.875rem' }} />
          </ListItemButton>
        </ListItem>
        {localStorage.getItem('token') != null ? (
          <ListItem key={"Logout"} disablePadding>
            <ListItemButton onClick={() => Logout()}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ fontSize: '0.875rem' }} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key={"Login"} disablePadding>
            <ListItemButton onClick={() => navigate('/login')}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Login"} sx={{ fontSize: '0.875rem' }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      {localStorage.getItem('token') != null ? (
        <div>
          <Divider
            flexItem
            sx={{
              margin: '16px 16px',
              color: theme.palette.mode === 'dark' ? "white" : "black",
              backgroundColor: theme.palette.mode === 'dark' ? "white" : "black",
              borderWidth: "1px",
            }}
          />
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Threads
          </Typography>

          <ListItem key={"Create Thread"} disablePadding>
            <ListItemButton onClick={() => navigate('/CreateThread')}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Create Thread"} sx={{ fontSize: '0.875rem' }} />
            </ListItemButton>
          </ListItem>
          <div>
            {(allRelatedThreads.length < 5) ? (
              <List>
                {allRelatedThreads.slice(0, 4).map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton onClick={() => navigate(`/forum/thread/${item.id}`)}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <ChatBubbleOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={truncateTitle(item.threadTitle, 12)} sx={{ fontSize: '0.875rem' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (

              <ScrollableList>
                <List>
                  {allRelatedThreads.map((item) => (
                    <ListItem key={item.id} disablePadding>
                      <ListItemButton onClick={() => navigate(`/forum/thread/${item.id}`)}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <ChatBubbleOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={truncateTitle(item.threadTitle, 12)} sx={{ fontSize: '0.875rem' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </ScrollableList>

            )}
          </div>
          <Divider
            flexItem
            sx={{
              margin: '16px 16px',
              color: theme.palette.mode === 'dark' ? "white" : "black",
              backgroundColor: theme.palette.mode === 'dark' ? "white" : "black",
              borderWidth: "1px",
            }}
          />
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Jobs
          </Typography>
          <ListItem key={"Create Job"} disablePadding>
            <ListItemButton onClick={() => navigate('/CreateJob')}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Create Job"} sx={{ fontSize: '0.875rem' }} />
            </ListItemButton>
          </ListItem>
          <div>
            {(allRelatedJobs.length < 5) ? (
              <List>
                {allRelatedJobs.slice(0, 4).map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton onClick={() => navigate(`/job/${item.id}`)}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <ChatBubbleOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={truncateTitle(item.name, 12)} sx={{ fontSize: '0.875rem' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <ScrollableList>
                <List>
                  {allRelatedJobs.map((item) => (
                    <ListItem key={item.id} disablePadding>
                      <ListItemButton onClick={() => navigate(`/job/${item.id}`)}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <ChatBubbleOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={truncateTitle(item.name, 12)} sx={{ fontSize: '0.875rem' }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </ScrollableList>
            )}
          </div>
        </div>
      ) : null}
    </Box>
  );


  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline enableColorScheme />
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: theme.palette.primary.contrastText }}
          >
            <MenuIcon />
          </IconButton>
          <TravelExploreIcon sx={{ marginRight: 2, fontSize: 20, color: "white" }} />
          <Typography
            onClick={() => navigate('/')}
            variant="h6"
            noWrap
            component="a"
            className="clickableWAT"
            sx={{ textDecoration: 'none', cursor: 'pointer', color: "white" }}
          >
            Work And Travel
          </Typography>


          {localStorage.getItem('token') != null && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <ListItem disablePadding>
                <Box>
                  <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Box>
                <Box sx={{ paddingLeft: "20px" }}>
                  <Avatar
                    onClick={() => navigate('/Profile')}
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
                </Box>
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


