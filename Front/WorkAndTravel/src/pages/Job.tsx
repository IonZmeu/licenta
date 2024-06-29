import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import ImageSlider from '../components/ImageSlider';
import { CommentSection } from '../components/CommentSectionComponent';
import { GoogleMapsComponent } from "../components/GoogleMapsComponent";
import { Job, CommentDTO, Comment } from '../interfaces/types';
import { Actions } from '../components/ActionsBarComponent';


const JobPage = () => {
  let { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [allImageData, setAllImageData] = useState<{ [key: string]: string }>({});
  const [commentText, setCommentText] = useState<string>("");
  const [commentsDTO, setCommentsDTO] = useState<CommentDTO[]>([]);
  const [replyComment, setReplyComment] = useState<CommentDTO | null>(null);
  const [followedJobs, setFollowedJobs] = useState<number[]>([]);
  const [likedJobs, setLikedJobs] = useState<number[]>([]);
  const [dislikedJobs, setDislikedJobs] = useState<number[]>([]);
  const [likedJobComments, setLikedJobComments] = useState<number[]>([]);
  const [dislikedJobComments, setDislikedJobComments] = useState<number[]>([]);
  const [selectCommentInput, setSelectCommentInput] = useState<boolean>(false);
  const [updateComments, setupdateComments] = useState<boolean>(false);
  const onImageClick = () => {
    console.log('Clicked on image');
  };

  const handleCommentClick = () => {
    setSelectCommentInput(true); // Function to select comment input
  };

  const handleFollowJob = () => {
    // Follow job logic
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get<CommentDTO[]>(`http://localhost:4123/comment/jobDTO/${id}`);
      setCommentsDTO(response.data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const fetchCommentsActions = async () => {
    try {
      const likedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/liked-comments`);
      const likedJobCommentsIds = likedResponse.data;
      setLikedJobComments(likedJobCommentsIds);
      const dislikedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/disliked-comments`);
      const dislikedCommentsIds = dislikedResponse.data;
      setDislikedJobComments(dislikedCommentsIds);
      console.log("liked and disliked");
      console.log(likedJobCommentsIds);
      console.log(dislikedCommentsIds);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get<Job>(`http://localhost:4123/job/${id}`);
        setJob(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };



    const fetchUserActions = async () => {
      try {
        setDislikedJobs([]);
        setLikedJobs([]);
        setFollowedJobs([]);
        // Fetch followed jobs
        const followedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/followed-jobs`);
        const followedJobIds = followedResponse.data;
        setFollowedJobs(followedJobIds);

        // Fetch liked jobs
        const likedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/liked-jobs`);
        const likedJobIds = likedResponse.data;
        setLikedJobs(likedJobIds);

        // Fetch disliked jobs
        const dislikedResponse = await axios.get(`http://localhost:4123/user/${Number(localStorage.getItem('userId'))}/disliked-jobs`);
        const dislikedJobIds = dislikedResponse.data;
        setDislikedJobs(dislikedJobIds);

      } catch (error) {
        console.log('Error fetching user actions:', error);
      }
    };

    fetchComments();
    fetchCommentsActions();
    fetchJob();
    fetchUserActions();
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [updateComments]);

  const fetchImage = async (imageId: number | string): Promise<string | null> => {
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
      const allImageDataMap: { [key: string]: string } = {};
      if (job) {
        if (job.images && job.images.length > 0) {
          for (const image of job.images) {
            const imageData = await fetchImage(image.id);
            if (imageData) {
              allImageDataMap[image.id.toString()] = imageData;
            }
          }
        }
      }
      setAllImageData(allImageDataMap);
    };



    fetchAllImages();
  }, [job]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      if (!userId || !username) {
        throw new Error('User not authenticated.');
      }

      const response = await axios.post<CommentDTO>("http://localhost:4123/comment", {
        jobId: id,
        threadId: null,
        userId: Number(userId),
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
      console.log("Error submitting comment:", error);
    }
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


  return (
    <div style={{ margin: '20px 15% 0' }}>
      <Typography component="div" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 3, fontSize: '2.5rem' }}>
        {job?.name}
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
          {job && (
            <Box sx={{ backgroundColor: 'transparent', maxWidth: '100%', mx: 'auto', my: 4 }}>
              {/* Assuming ImageSlider component */}
              <ImageSlider imageUrls={Object.values(allImageData)} onImageClick={onImageClick} />
            </Box>
          )}
        </Grid>

        <Grid item xs={6}>
          {job && <GoogleMapsComponent latCoordinate={job.latCoordinate} longCoordinate={job.longCoordinate} />}
        </Grid>

        <Grid item xs={6}>
          <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1, paddingLeft: 2 }}>
                <strong>Email:</strong> {job?.email}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, paddingLeft: 2 }}>
                <strong>Country:</strong> {job?.country}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, paddingLeft: 2 }}>
                <strong>Position:</strong> {job?.job}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, paddingLeft: 2 }}>
                <strong>Salary:</strong> {job?.salary} {job?.currency}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, paddingLeft: 2 }}>
                <strong>Contact Info:</strong> {job?.contactInfo}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, paddingLeft: 2 }}>
                <strong>Description:</strong> {job?.description}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, paddingLeft: 2 }}>
                <strong>Created:</strong> {job?.timeCreated ? timeAgo(job?.timeCreated) : <></>}
              </Typography>
            </Box>
            <Box>
              {job && (
                <Actions
                  job={job}
                  likedJobs={likedJobs}
                  dislikedJobs={dislikedJobs}
                  followedJobs={followedJobs}
                  setLikedJobs={setLikedJobs}
                  setDislikedJobs={setDislikedJobs}
                  setFollowedJobs={setFollowedJobs}
                  handleCardClick={handleCommentClick}
                />
              )}
            </Box>
          </Box>
        </Grid>

        <CommentSection
          jobComments={commentsDTO}
          handleReply={handleReply}
          handleCommentSubmit={handleCommentSubmit}
          handleCommentChange={handleCommentChange}
          stopReplying={stopReplying}
          commentText={commentText}
          replyComment={replyComment}
          likedComments={likedJobComments}
          setLikedComments={setLikedJobComments}
          dislikedComments={dislikedJobComments}
          setDislikedComments={setDislikedJobComments}
        />

      </Grid>
    </div>
  );

}

export default JobPage;