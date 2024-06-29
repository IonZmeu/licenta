import { useEffect, useState } from "react";
import { Typography, Container, Box, IconButton, AccordionSummary, AccordionDetails, Grid, Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CommentDTO, ThreadDTO, Comment } from '../interfaces/types';
import ImageSlider from '../components/ImageSlider';
import { ForumCommentSection } from "../components/CommentSectionComponent";
import { useAppContext } from '../components/AppContext';
import { handleDislikeThread, handleFollowThread, handleLikeThread } from '../functions/functions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Thread() {
  const { id } = useParams();
  const [thread, setThread] = useState<ThreadDTO>();
  const [commentText, setCommentText] = useState<string>("");
  const [commentsDTO, setCommentsDTO] = useState<CommentDTO[]>();
  const [replyComment, setReplyComment] = useState<CommentDTO | null>(null);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const [updateComments, setupdateComments] = useState<boolean>(false);
  const [likedThreadComments, setLikedThreadComments] = useState<number[]>([]);
  const [dislikedThreadComments, setDislikedThreadComments] = useState<number[]>([]);
  const [pfp, setPfp] = useState<string>("");
  const { value, setValue } = useAppContext();
  const [followedThreads, setFollowedThreads] = useState<number[]>([]);
  const [likedThreads, setLikedThreads] = useState<number[]>([]);
  const [dislikedThreads, setDislikedThreads] = useState<number[]>([]);

  const navigate = useNavigate();
  const fetchComments = async () => {
    try {
      const response = await axios.get<CommentDTO[]>(`http://localhost:4123/comment/threadDTO/${id}`);
      setCommentsDTO(response.data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const handleLikeFront = (thread: ThreadDTO) => {
    if (likedThreads.includes(thread.id)) {
      setLikedThreads(likedThreads.filter(id => id !== thread.id));
      if (thread.likes !== undefined) {
        thread.likes -= 1;
      }
    } else {
      setLikedThreads([...likedThreads, thread.id]);
      if (thread.likes !== undefined) {
        thread.likes += 1;
      } else {
        thread.likes = 1;
      }

      if (dislikedThreads.includes(thread.id)) {
        setDislikedThreads(dislikedThreads.filter(id => id !== thread.id));
        if (thread.dislikes !== undefined) {
          thread.dislikes -= 1;
        }
      }
    }
  };

  const handleDislikeFront = (thread: ThreadDTO) => {
    if (dislikedThreads.includes(thread.id)) {
      setDislikedThreads(dislikedThreads.filter(id => id !== thread.id));
      if (thread.dislikes !== undefined) {
        thread.dislikes -= 1;
      }
    } else {
      setDislikedThreads([...dislikedThreads, thread.id]);
      if (thread.dislikes !== undefined) {
        thread.dislikes += 1;
      } else {
        thread.dislikes = 1;
      }

      if (likedThreads.includes(thread.id)) {
        setLikedThreads(likedThreads.filter(id => id !== thread.id));
        if (thread.likes !== undefined) {
          thread.likes -= 1;
        }
      }
    }
  };

  const handleOpenProfile = (id: number) => {
    navigate(`/profile/${id}`);
  };

  const fetchLikedComments = async () => {
    try {
      const response = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/liked-comments`);
      setLikedThreadComments(response.data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const fetchDislikedComments = async () => {
    try {
      const response = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/disliked-comments`);
      setDislikedThreadComments(response.data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const fetchPfp = async (imageId: number | string): Promise<string> => {
    try {
      const response = await axios.get(`http://localhost:4123/image/pfp/${imageId}`);
      return response.data; // Assuming backend returns the base64 string directly
    } catch (error) {
      console.log('Error fetching image: ', error);
      return "";
    }
  }

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get<ThreadDTO>(`http://localhost:4123/thread/${id}`);
        setThread(response.data);
      } catch (error) {
        console.log('Error fetching threads: ', error);
      }
    };

    const fetchAndSetImage = async (authorId: number) => {
      const profileImage = await fetchPfp(authorId);
      setPfp(profileImage);
    };

    const fetchUserActions = async () => {
      try {
        // Fetch followed threads
        const followedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/followed-threads`);
        setFollowedThreads(followedResponse.data);

        // Fetch liked threads
        const likedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/liked-threads`);
        setLikedThreads(likedResponse.data);

        // Fetch disliked threads
        const dislikedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/disliked-threads`);
        setDislikedThreads(dislikedResponse.data);

        console.log("Finished fetching user actions");
      } catch (error) {
        console.log('Error fetching user actions:', error);
      }
    };



    fetchComments()
    fetchThread();
    fetchDislikedComments();
    fetchLikedComments();
    fetchUserActions()
    if (thread?.authorId) {
      fetchAndSetImage(thread?.authorId)
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [updateComments]);

  const fetchImage = async (imageId: number | string) => {
    try {
      const response = await axios.get(`http://localhost:4123/image/${imageId}`);
      return response.data; // Assuming backend returns the base64 string directly
    } catch (error) {
      console.log('Error fetching image: ', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      const imageDataMap: { [key: string]: string } = {};
      if (thread) {
        for (const image of thread.images) {
          const imageData = await fetchImage(image.id);
          if (imageData) {
            imageDataMap[image.id.toString()] = imageData;
          }
        }
        setImageData(imageDataMap);
      }
    };

    fetchAllImages();
  }, [thread]);

  const handleCommentSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId') || '';
      const username = localStorage.getItem('username') || '';
      await axios.post("http://localhost:4123/comment", {
        jobId: null,
        threadId: id,
        userId: userId,
        parentId: replyComment?.id,
        depth: replyComment ? replyComment.depth + 1 : 0,
        commentContent: commentText,
        username: username,
      });

      setCommentText("");
      setReplyComment(null);
      if (updateComments === false) {
        setupdateComments(true);
      } else {
        setupdateComments(false);
      }
    } catch (error) {
      console.log("Error submitting comment: ", error);
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const stopReplying = () => {
    setCommentText("");
    setReplyComment(null);
  };

  const handleReply = (comment: CommentDTO) => {
    setReplyComment({
      ...comment,
      depth: comment.depth + 1,
    });
  };

  const handleFollowThreadRedundant = () => {
    // Follow thread logic
  };

  function timeAgo(timeCreated: string): string {
    const createdDate = new Date(timeCreated);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
      const time = Math.floor(seconds / interval.seconds);
      if (time > 0) {
        return `${time} ${interval.label}${time !== 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  return (
    <div style={{ margin: '20px 15% 0' }}>
      <Container>
        {thread && (
          <>
            <Grid
              container
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Column layout on xs (mobile), row layout on md (desktop)
                alignItems: 'center',
                paddingLeft: '20px',
              }}
            >
              <Grid item>
                <Avatar
                  src={pfp}
                  alt="Author pfp"
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                >
                  {!pfp && (localStorage.getItem('username')?.slice(0, 2).toUpperCase() ?? 'NA')}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  onClick={() => handleOpenProfile(thread.authorId)}
                  sx={{
                    cursor: 'pointer',
                    paddingLeft: { xs: '0', md: '20px' }, // No padding on xs (mobile), padding on md (desktop)
                    '&:hover': {
                      boxShadow: 'none',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {thread.authorName}
                </Typography>
              </Grid>
              {/* Display timeCreated on a separate row for mobile */}
              <Grid item sx={{ paddingTop: { xs: '10px', md: '0' } }}>
                <Typography
                  variant="h6"
                  onClick={() => handleOpenProfile(thread.authorId)}
                  sx={{
                    cursor: 'pointer',
                    paddingLeft: { xs: '20px', md: '20px' }, // Padding on xs (mobile), no padding on md (desktop)
                    '&:hover': {
                      boxShadow: 'none',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {thread?.timeCreated ? timeAgo(thread?.timeCreated) : <></>}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="h4">{thread.threadTitle}</Typography>
            <Typography variant="body1" gutterBottom style={{ marginTop: '25px' }}>{thread.threadContent}</Typography>
            {thread.images.length > 0 ? (thread.images.length > 1 ? (
              <ImageSlider imageUrls={Object.values(imageData)} onImageClick={() => { }} />) :
              (<img src={Object.values(imageData).at(0)} style={{ objectFit: 'contain', width: '100%' }} />)
            ) : (<div></div>)}
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
                <IconButton
                  aria-label="like"
                  onClick={() => {
                    handleLikeThread(thread.id, Number(localStorage.getItem('userId')));
                    handleLikeFront(thread);
                  }}
                  color={likedThreads.includes(thread.id) ? 'primary' : 'default'}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ margin: '0 4px' }}>
                  {thread.likes}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="dislike"
                  onClick={() => {
                    handleDislikeThread(thread.id, Number(localStorage.getItem('userId')));
                    handleDislikeFront(thread);
                  }}
                  style={{ color: dislikedThreads.includes(thread.id) ? 'blue' : 'inherit' }}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ margin: '0 4px' }}>
                  {thread.dislikes}
                </Typography>
              </Grid>
              <Grid item>
                {(thread.authorId !== Number(localStorage.getItem('userId'))) && (
                  <IconButton
                    aria-label="follow"
                    onClick={() => {
                      handleFollowThread(thread.id, Number(localStorage.getItem('userId')));
                      if (followedThreads.includes(thread.id)) {
                        setFollowedThreads(followedThreads.filter(id => id !== thread.id));
                      } else {
                        setFollowedThreads([...followedThreads, thread.id]);
                      }
                      setValue(!value);
                    }}
                    color={followedThreads.includes(thread.id) ? 'primary' : 'default'}
                  >
                    <BookmarkIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>


            <ForumCommentSection
              replyComment={replyComment}
              threadComments={commentsDTO}
              handleReply={handleReply}
              handleCommentSubmit={handleCommentSubmit}
              handleCommentChange={handleCommentChange}
              stopReplying={stopReplying}
              commentText={commentText}
              handleFollowThread={handleFollowThreadRedundant}
              likedComments={likedThreadComments}
              setLikedComments={setLikedThreadComments}
              dislikedComments={dislikedThreadComments}
              setDislikedComments={setDislikedThreadComments}

            />
          </>
        )}
      </Container>
    </div>
  );
}

export default Thread;
