import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import { Grid, Pagination, Skeleton } from '@mui/material';



interface Image {
  id: number | string;
  imageUrl: string;
  imageType: string;
}

interface Job {
  id: number | string;
  name?: string;
  country?: string;
  position?: string;
  salary?: string;
  currency?: string;
  description?: string;
  mainImage?: Image;
}



const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const [totalPages, setTotalPages] = useState<string>("");
  const { page: currentPage } = useParams();
  const navigate = useNavigate();


  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/jobs/${value}`); // Update URL with new page number
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {

    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>(`http://localhost:4123/job/page/${currentPage}`);
        setJobs(response.data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    const fetchTotalPages = async () => {
      try {
        const pagesResponse = await axios.get(`http://localhost:4123/job/pages`);
        setTotalPages(pagesResponse.data);
      } catch (error) {
        console.log('Error fetching total pages: ', error);
      }
    };

    fetchJobs();
    fetchTotalPages();
  }, [currentPage]);

  const fetchImage = async (imageId: number | string): Promise<string | null> => {
    try {
      const response = await axios.get(`http://localhost:4123/image/${imageId}`);
      return response.data; 
    } catch (error) {
      console.log('Error fetching image: ', error);
      return null;
    }
  };

  const handleCardClick = (id: string | number) => {
    navigate(`/job/${id}`);
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

  
  return (
    <div>
      <div style={{ margin: '20px 15% 0' }}>
        <Container fluid className="container-no-padding" style={{ overflowX: 'hidden' }}>
          <Row className='grid'>
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              {jobs.map((job, index) => {
                let imageUrl: string | undefined;
                if (job.mainImage) {
                  imageUrl = imageData[job.mainImage.id?.toString() || ''];
                }
                return (
                  <Grid item xs={3} key={job.id}>
                    <div onClick={() => handleCardClick(job.id)} style={{ cursor: "pointer" }}>
                      <Card className='non-empty-card' style={{ width: '100%', marginBottom: '20px' }}>
                        {imageUrl ? (
                          <Card.Img variant="top" src={imageUrl} style={{ width: "100%", height: "200px" }} alt={"1"} />
                        ) : (
                          <Skeleton variant="rectangular" width={"100%"} height={"200px"} />
                        )}
                        <Card.Body>
                          <Card.Title style={{ textAlign: "center", fontWeight: 'bold' }}>{job.name}</Card.Title>
                          <Card.Text className='card-text'><span style={{ fontWeight: 'bold' }}>Country:</span> {job.country}</Card.Text>
                          <Card.Text className='card-text'><span style={{ fontWeight: 'bold' }}>Position:</span> {job.position}</Card.Text>
                          <Card.Text className='card-text'><span style={{ fontWeight: 'bold' }}>Salary:</span> {job.salary + " " + job.currency}</Card.Text>
                          <Card.Text className='card-text'>
                            <span style={{ fontWeight: 'bold' }}>About us: </span>{job.description && job.description.length > 150 ? job.description.substring(0, 150) + "..." : job.description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Row>
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
