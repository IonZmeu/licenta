import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';
import { Card, CardContent, CardMedia, Grid, Pagination, Skeleton, Typography } from '@mui/material';
import Sorter from '../components/JobSortComponent';
import { JobDTO } from '../interfaces/types';
import { Actions } from '../components/ActionsBarComponent';

const Jobs = () => {
  const [sort, setSort] = useState('new');
  const [jobName, setJobName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [min, setMin] = useState<number | undefined>();
  const [max, setMax] = useState<number | undefined>();
  const [jobs, setJobs] = useState<JobDTO[]>([]);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const [totalPages, setTotalPages] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [followedJobs, setFollowedJobs] = useState<number[]>([]);
  const [likedJobs, setLikedJobs] = useState<number[]>([]);
  const [dislikedJobs, setDislikedJobs] = useState<number[]>([]);
  const { page: currentPage } = useParams();
  const navigate = useNavigate();

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/jobs/${value}`); // Update URL with new page number
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchJobsSorted = async () => {
    try {
      const response = await axios.get(`http://localhost:4123/job/page/${currentPage}`, {
        params: {
          sort: sort,
          min: min,
          max: max,
          countryName: countryName,
          jobName: jobName
        }
      });
      console.log(response.data);
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const fetchUserActions = async () => {
    try {
      setDislikedJobs([]);
      setLikedJobs([]);
      setFollowedJobs([]);
      console.log(userId);
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

  useEffect(() => {
    setUserId(Number(localStorage.getItem('userId')))

    fetchJobsSorted();
    fetchUserActions();

    console.log(jobs);
  }, [currentPage, sort, min, max, countryName, jobName]);

  const fetchImage = async (imageId: number | string): Promise<string | null> => {
    try {
      const response = await axios.get(`http://localhost:4123/image/${imageId}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching image: ', error);
      return null;
    }
  };

  const handleCardClick = (jobId: number) => {
    navigate(`/job/${jobId}`);
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      const imageDataMap: { [key: string]: string } = {};
      for (const job of jobs) {
        if (job.mainImage) {
          const imageData = await fetchImage(job.mainImage.id);
          if (imageData) {
            imageDataMap[job.mainImage.id.toString()] = imageData;
          }
        }
      }
      setImageData(imageDataMap);
    };

    fetchAllImages();
  }, [jobs]);

  const handleApply = (sortBy: string, jobName: string, countryName: string, min: number | undefined, max: number | undefined) => {
    setSort(sortBy);
    setJobName(jobName);
    setCountryName(countryName);
    setMin(min);
    setMax(max);
  };

  return (
    <div>
      <Sorter onApply={handleApply}></Sorter>
      <div style={{ margin: '20px 5% 0' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {jobs.map((job) => {
              let imageUrl: string | undefined;
              if (job.mainImage) {
                imageUrl = imageData[job.mainImage.id?.toString() || ''];
              }
              return (
                <Grid item xs={12} md={6} lg={4} xl={3} key={job.id}>
                  <div>
                    <Card style={{ width: '100%', marginBottom: '20px' }}>
                      <div style={{ cursor: "pointer" }} onClick={() => handleCardClick(job.id)}>
                        {imageUrl ? (
                          <CardMedia component="img" height="200" image={imageUrl} alt={job.name || ''} />
                        ) : (
                          <Skeleton variant="rectangular" width={"100%"} height={"200px"} />
                        )}
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" align="center">
                            {job.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" >
                            <span style={{ fontWeight: 'bold' }}>Country:</span> {job.country}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" >
                            <span style={{ fontWeight: 'bold' }}>Position:</span> {job.job}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" >
                            <span style={{ fontWeight: 'bold' }}>Salary:</span> {job.salary + " " + job.currency}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" >
                            <span style={{ fontWeight: 'bold' }}>About us: </span>{job.description && job.description.length > 150 ? job.description.substring(0, 150) + "..." : job.description}
                          </Typography>
                        </CardContent>
                      </div>
                      <Actions
                        job={job}
                        likedJobs={likedJobs}
                        dislikedJobs={dislikedJobs}
                        followedJobs={followedJobs}
                        setLikedJobs={setLikedJobs}
                        setDislikedJobs={setDislikedJobs}
                        setFollowedJobs={setFollowedJobs}
                        handleCardClick={handleCardClick}
                      />
                    </Card>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
      <div className="d-flex justify-content-center">
        <div style={{ fontSize: '2.5rem' }}>
          <Pagination count={Number(totalPages)} page={Number(currentPage)} onChange={handleChangePagination} />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
