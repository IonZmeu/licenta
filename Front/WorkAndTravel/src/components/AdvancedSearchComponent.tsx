import React, { useEffect, useState } from 'react';
import "./AdvancedSearchComponent.css";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';


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
  description?: string;
  images?: Image[];
}



const AdvancedSearchComponent = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:4123/job');
        setJobs(response.data);
        console.log(jobs);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchJobs();
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

  const handleCardClick = (id: string | number) => {
    console.log("Clicked ID:", id);
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      const imageDataMap: { [key: string]: string } = {};
      for (const job of jobs) {
        if (job.images && job.images.length > 0) {
          for (const image of job.images) {
            if (image.id && image.imageType === "1") {
              const imageData = await fetchImage(image.id);
              if (imageData) {
                imageDataMap[image.id.toString()] = imageData;
              }
            }
          }
        }
      }
      setImageData(imageDataMap);
    };

    fetchAllImages();
  }, [jobs]);

  //const emptySlotsCount = 24 - jobs.length;

  
  return (
    <Container fluid className="container-no-padding" style={{overflowX: 'hidden'}}>
      <Row className='grid'>
        {/* Render job cards */}
        {jobs.map((job, index) => {
          const imageId = job.images?.find(image => image.imageType === "1")?.id;
          const imageUrl = imageData[imageId?.toString() || ''];

          return (
            <Col key={index} md={"auto"} style={{ padding: "10px", paddingLeft: "43px" }}>
              <div onClick={() => handleCardClick(job.id)}> {/* Add onClick handler */}
                <Card className='non-empty-card' style={{ width: '22rem', margin: '0 auto' }}>
                  <Card.Img variant="top" src={imageUrl} style={{ width: "100%", height: "250px" }} alt={"1"} />
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontWeight: 'bold' }}>{job.name}</Card.Title>
                    <Card.Text className='card-text'><span style={{fontWeight: 'bold'}}>Country:</span> {job.country}</Card.Text>
                    <Card.Text className='card-text'><span style={{fontWeight: 'bold'}}>Position:</span> {job.position}</Card.Text>
                    <Card.Text className='card-text'><span style={{fontWeight: 'bold'}}>Salary:</span> {job.salary}</Card.Text>
                    <Card.Text className='card-text'>
                    <span style={{fontWeight: 'bold'}}>About us: </span>{job.description && job.description.length > 150 ? job.description.substring(0, 150) + "..." : job.description }
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AdvancedSearchComponent;
