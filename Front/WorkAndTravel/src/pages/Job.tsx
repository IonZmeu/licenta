import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LoadScript, GoogleMap, MarkerF  } from '@react-google-maps/api';
import { Box, Button, Card, CardContent, CardHeader, Grid, Hidden, IconButton, Paper, TextField, Typography } from "@mui/material";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../components/Job.css";


interface Image {
  id: number;
  imageUrl: string;
  imageType: string;
}

interface Job {
  id: number;
  name?: string;
  email?: string;
  country?: string;
  latCoordinate: string;
  longCoordinate: string;
  job?: string;
  salary?: string;
  currnecy?: string;
  description?: string;
  contactInfo?:string;
  images?: Image[];
  comments?: Comment[];
}

interface Comment {
  id: number;
  jobId:number | null;
  threadId:number | null;
  userId:number;
  parentId:number | null;
  depth:number;
  username:string;
  commentContent:string;
  children: Comment[] | null;
}

function Job() {
  let { id } = useParams();

  const [job, setJob] = useState<Job | null>(null);
  const [allImageData, setAllImageData] = useState<{ [key: string]: string }>({});
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyComment, setReplyComment] = useState<Comment | null>(null);
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <IconButton
        className={className}
        onClick={onClick}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:active, &:focus': { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Prevent background color change after click and maintain color on focus
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }, // Apply hover effect
          color: 'white',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          width: 60,  // Increased size
          height: 60, // Increased size
        }}
      >
      </IconButton>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <IconButton
        className={className}
        onClick={onClick}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:active, &:focus': { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Prevent background color change after click and maintain color on focus
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }, // Apply hover effect
          color: 'white',
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          width: 60,  // Increased size
          height: 60, // Increased size
          display: 'flex', // Ensure the display remains as flex
        }}
      >
        
      </IconButton>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    scroll: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    draggable: false
  };

  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get<Job>(`http://localhost:4123/job/${id}`);
        setJob(response.data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchJob();
  }, []);

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
      const userId = localStorage.getItem('userId') || ''; 
      const username = localStorage.getItem('username') || '';
      const response = await axios.post("http://localhost:4123/comment", {
        jobId: id,
        threadId: null,
        userId: userId,
        parentId: replyComment?.id,
        depth: replyComment?.depth || 0,
        commentContent: commentText,
        username: username,
      });

      const responseComments = await axios.get(`http://localhost:4123/comment/job/${id}`);

      if (job) {
        setJob({ ...job, comments: responseComments.data });
      }

      setCommentText("");
    } catch (error) {
      console.log("Error submitting comment: ", error);
    }
  };

  const openImageModal = (imageUrl: string) => {
    setShowImageModal(true);
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage("");
  };

  const mapStyles = {        
    height: "600px",
    width: "100%"
  };

  const stopReplying = () => {
    setCommentText("");
    setReplyComment(null);
  }

  const handleReply = async (comment: Comment) => {
    setReplyComment(comment);
  };

  const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
      <div style={{ marginLeft: `${comment.depth * 20}px`, borderLeft: '2px solid #ccc', padding: '5px', marginBottom: '10px' }}>
        <p>By: {comment.username}</p>
        {comment.children && comment.children.map(child => (
          <CommentComponent key={child.id} comment={child} />
        ))}
        <p>{comment.commentContent}</p>
        <button onClick={() =>handleReply(comment)}>Reply</button>
      </div>
    );
  };

  return (
      <div style={{margin: '20px 15% 0'}}>
        
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 3, fontSize: '2.5rem' }}>
          {job?.name}
        </Typography>

        <Grid container>
         <Grid item xs={12} sx={{marginBottom: "20px"}}>
            {job && (
              <Box sx={{ backgroundColor: 'transparent', maxWidth: '100%', mx: 'auto', my: 4 }}>
              <Slider {...settings}>
                {Object.entries(allImageData).map(([id, imageUrl]) => (
                  <Box key={id} onClick={() => openImageModal(imageUrl)} sx={{ cursor: 'pointer' }}>
                    <img
                      src={imageUrl}
                      alt={`Image ${id}`}
                      style={{ objectFit: 'contain', height: '600px', width: '100%' }}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
            )}
          </Grid> 
          <Grid item xs={6}>
              {job && (
                <LoadScript googleMapsApiKey='AIzaSyAID844FYzOtqurEPyxm9ooZiF2s05llL0'>
                  <GoogleMap 
                    center={{ lat: parseFloat(job.latCoordinate), lng: parseFloat(job.longCoordinate) }}
                    mapContainerStyle={mapStyles}
                    zoom={15}>
                    <MarkerF position={{ lat: parseFloat(job.latCoordinate), lng: parseFloat(job.longCoordinate) }} 
                    />
                  </GoogleMap>
                </LoadScript>
              )}
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 1, width: "100%", height: "100%" }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <strong>Email:</strong> {job?.email}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <strong>Country:</strong> {job?.country}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <strong>Position:</strong> {job?.job}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <strong>Salary:</strong> {job?.salary}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <strong>Contact Info:</strong> {job?.contactInfo}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                <strong>Description:</strong> {job?.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item >
            <Box sx={{ margin: "auto",  }}>
              <Card variant="outlined" sx={{ marginBottom: 2 }}>
                <CardHeader title="Comments" />
                <CardContent>
                
                  {replyComment ? 
                  <Grid container spacing={1} alignItems="flex-start">
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Typography style={{marginTop: '10px', fontSize: '14px'}}>
                    Replying to: <b>{replyComment.username}</b> {" "} his message:
                      {" " + (replyComment.commentContent.length > 50 ? `${replyComment.commentContent.slice(0, 47)}...` : replyComment.commentContent)}
                      <button onClick={stopReplying}>stop replying </button>
                  </Typography> 

                  </Grid>
                  <Grid item xs={10} md={10} lg={10} xl={10}>
                  <TextField
                      label="Write a comment"
                      multiline
                      fullWidth
                      value={commentText}
                      onChange={handleCommentChange}
                      sx={{ marginBottom: 2 }}
                      />
                  </Grid>
                  <Grid item xs={2} md={2} lg={2} xl={2}>
                      <Button sx={{ height: "100%", padding: 2 }} variant="contained" onClick={handleCommentSubmit} fullWidth>
                          Submit
                      </Button>
                  </Grid>
                  </Grid> :
                  <Grid container spacing={1} alignItems="flex-start">
                  <Grid item xs={10} md={10} lg={10} xl={10}>
                  <TextField
                      label="Write a comment"
                      multiline
                      fullWidth
                      value={commentText}
                      onChange={handleCommentChange}
                      sx={{ marginBottom: 2 }}
                      />
                  </Grid>
                  <Grid item xs={2} md={2} lg={2} xl={2}>
                      <Button sx={{ height: "100%", padding: 2 }} variant="contained" onClick={handleCommentSubmit} fullWidth>
                          Submit
                      </Button>
                  </Grid>
                  </Grid>
                  }
              
                  {job && job.comments && (
                    job.comments
                      .filter(comment => comment.depth === 0)
                      .map(comment => <CommentComponent key={comment.id} comment={comment} />)
                  )}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Modal show={showImageModal} onHide={closeImageModal} centered>
          <Modal.Body>
            <img src={selectedImage} alt="Selected Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Modal.Body>
        </Modal>

      </div>
  );
}

export default Job;
