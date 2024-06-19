import React, { useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface ThreadDTO {
  id: number;
  authorId: number;
  likes: number;
  dislikes: number;
  authorName: string;
  threadTitle: string;
  threadContent: string;
}

const MyList: React.FC = () => {
  const [createdThreads, setCreatedThreads] = useState<ThreadDTO[]>([]);
  const [followedThreads, setFollowedThreads] = useState<ThreadDTO[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get<ThreadDTO[]>('http://localhost:4123/user/followed', {
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

    fetchThreads();
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: `calc(12vh)`,
        left: 0,
        width: '15%',
        zIndex: 999,
        background: '#fff',

        borderRadius: '2px',
        padding: '1px',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <h3>Created Threads</h3>
        <List>
          {createdThreads.map((thread) => (
            <ListItemButton key={thread.id} onClick={() => navigate(`/forum/thread/${thread.id}`)}>
              <ListItemText primary={thread.threadTitle} />
            </ListItemButton>
          ))}
        </List>
      </div>
      <div>
        <h3>Followed Threads</h3>
        <List>
          {followedThreads.map((thread) => (
            <ListItemButton key={thread.id} onClick={() => navigate(`/forum/thread/${thread.id}`)}>
              <ListItemText primary={thread.threadTitle} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Box>
  );
}

export default MyList;