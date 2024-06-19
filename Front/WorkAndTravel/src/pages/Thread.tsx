import { useEffect, useState } from "react";
import { Typography, Container, Box, IconButton, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CommentDTO, ThreadDTO, Comment } from '../interfaces/types';
import ImageSlider from '../components/ImageSlider';
import { ForumCommentSection } from "../components/CommentSectionComponent";

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


  const fetchComments = async () => {
    try {
      const response = await axios.get<CommentDTO[]>(`http://localhost:4123/comment/threadDTO/${id}`);
      setCommentsDTO(response.data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
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


  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get<ThreadDTO>(`http://localhost:4123/thread/${id}`);
        setThread(response.data);
      } catch (error) {
        console.log('Error fetching threads: ', error);
      }
    };

    fetchComments()
    fetchThread();
    fetchDislikedComments();
    fetchLikedComments();
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

  const handleFollowThread = () => {
    // Follow thread logic
  };

  return (
    <Container>
      {thread && (
        <>
          <Typography variant="h5">{thread.threadTitle}</Typography>
          {thread.images.length > 0 ? (thread.images.length > 1 ? (
            <ImageSlider imageUrls={Object.values(imageData)} onImageClick={() => { }} />) :
            (<img src={Object.values(imageData).at(0)} style={{ objectFit: 'contain', width: '100%' }} />)
          ) : (<div></div>)}
          <Typography variant="body1" gutterBottom style={{ marginTop: '25px' }}>{thread.threadContent}</Typography>

          <ForumCommentSection
            replyComment={replyComment}
            threadComments={commentsDTO}
            handleReply={handleReply}
            handleCommentSubmit={handleCommentSubmit}
            handleCommentChange={handleCommentChange}
            stopReplying={stopReplying}
            commentText={commentText}
            handleFollowThread={handleFollowThread}
            likedComments={likedThreadComments}
            setLikedComments={setLikedThreadComments}
            dislikedComments={dislikedThreadComments}
            setDislikedComments={setDislikedThreadComments}

          />
        </>
      )}
    </Container>
  );
}

export default Thread;
