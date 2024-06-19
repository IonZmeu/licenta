import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, Typography, Button, Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import { handleDislikeComment, handleLikeComment } from '../functions/functions';
import { CommentDTO } from '../interfaces/types';
import axios from 'axios';

interface CommentComponentProps {
  comment: CommentDTO;
  handleReply: (comment: CommentDTO) => void;
  likedComments: number[];
  setLikedComments: React.Dispatch<React.SetStateAction<number[]>>;
  dislikedComments: number[];
  setDislikedComments: React.Dispatch<React.SetStateAction<number[]>>;

}


const fetchImage = async (imageId: number | string): Promise<string> => {
  try {
    const response = await axios.get(`http://localhost:4123/image/pfp/${imageId}`);
    return response.data; // Assuming backend returns the base64 string directly
  } catch (error) {
    console.log('Error fetching image: ', error);
    return "";
  }
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comment, handleReply, likedComments, setLikedComments, dislikedComments, setDislikedComments }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [pfp, setPfp] = useState<string>("");

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleLikeFront = (comment: CommentDTO) => {
    if (likedComments.includes(comment.id)) {
      setLikedComments(likedComments.filter(id => id !== comment.id));
      if (comment.likes !== undefined) {
        comment.likes -= 1;
      }
    } else {
      setLikedComments([...likedComments, comment.id]);
      if (comment.likes !== undefined) {
        comment.likes += 1;
      } else {
        comment.likes = 1;
      }

      if (dislikedComments.includes(comment.id)) {
        setDislikedComments(dislikedComments.filter(id => id !== comment.id));
        if (comment.dislikes !== undefined) {
          comment.dislikes -= 1;
        }
      }
    }
  };

  const handleDislikeFront = (comment: CommentDTO) => {
    if (dislikedComments.includes(comment.id)) {
      setDislikedComments(dislikedComments.filter(id => id !== comment.id));
      if (comment.dislikes !== undefined) {
        comment.dislikes -= 1;
      }
    } else {
      setDislikedComments([...dislikedComments, comment.id]);
      if (comment.dislikes !== undefined) {
        comment.dislikes += 1;
      } else {
        comment.dislikes = 1;
      }

      if (likedComments.includes(comment.id)) {
        setLikedComments(likedComments.filter(id => id !== comment.id));
        if (comment.likes !== undefined) {
          comment.likes -= 1;
        }
      }
    }
  };

  useEffect(() => {
    const fetchAndSetImage = async (authorId: string | number) => {
      const profileImage = await fetchImage(authorId);
      setPfp(profileImage);
    };

    fetchAndSetImage(comment.userId);
  }, []);

  return (
    <div style={{ marginLeft: `${comment.depth * 20}px`, borderLeft: '2px solid #ccc', padding: '5px', marginBottom: '10px' }}>
      <Grid container alignItems="center">
        <Grid item>{pfp ? (<Avatar src={pfp}></Avatar>) : <Avatar style={{ marginRight: '10px' }}>{comment.username ? comment.username.slice(0, 2).toUpperCase() : 'NA'}</Avatar>}</Grid>
        <Grid item> {comment.username}</Grid>
      </Grid>
      <p>{comment.commentContent}</p>
      <Box >
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <IconButton
              aria-label="like"
              onClick={() => {
                handleLikeComment(comment.id, Number(localStorage.getItem('userId')));
                handleLikeFront(comment);
              }}
              color={likedComments.includes(comment.id) ? 'primary' : 'default'}
            >
              <ThumbUpIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ margin: '0 4px' }}>
              {comment.likes}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="dislike"
              onClick={() => {
                handleDislikeComment(comment.id, Number(localStorage.getItem('userId')));
                handleDislikeFront(comment);
              }}
              style={{ color: dislikedComments.includes(comment.id) ? 'blue' : 'inherit' }}
            >
              <ThumbDownIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ margin: '0 4px' }}>
              {comment.dislikes}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="reply" onClick={() => handleReply(comment)}>
              <ReplyIcon />
            </IconButton>
          </Grid>
          {comment.children && comment.children.length > 0 && (
            <Grid item>
              <Button onClick={toggleReplies}>
                {showReplies ? 'Hide Replies' : 'View Replies'}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
      {
        showReplies && comment.children && (
          <div>
            {comment.children.map(child => (
              <CommentComponent
                key={child.id}
                comment={child}
                handleReply={handleReply}
                likedComments={likedComments}
                setLikedComments={setLikedComments}
                dislikedComments={dislikedComments}
                setDislikedComments={setDislikedComments}
              />
            ))}
          </div>
        )
      }
    </div >
  );
};

export default CommentComponent;
