import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface Image {
  id: number | string;
  imageUrl: string;
}

interface Job {
  id: number | string;
  name?: string;
  email?: string;
  lat_coordinate?: string;
  long_coordinate?: string;
  images?: Image[];
}

const Test = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get<Job[]>('http://localhost:4123/job');
        setJobs(response.data);
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

  useEffect(() => {
    const fetchAllImages = async () => {
      const imageDataMap: { [key: string]: string } = {};
      for (const job of jobs) {
        if (job.images && job.images.length > 0) {
          for (const image of job.images) {
            if (image.id) {
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

  return (
      <div className="container text-center">
      <div className="row row-cols-auto">
      {jobs.map((job, index) => (
          <div className="col" key={index}>
            <div className="card" id="card">
              <img 
                src={imageData[job.id.toString()]} 
                className="card-img-top" 
                alt="Job Image"
                style={{ width: "100%px", height: "200px" }} // Set the width and height here
              />
              <div className="card-body">
                <h5 className="card-title">{job.name}</h5>
                <p className="card-text">{job.email}</p>
                <p className="card-text">{job.lat_coordinate}, {job.long_coordinate}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        ))}
        <div className="col">
        <div className="card" id="card">
          <img src="src\assets\imgs\temp.png" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Test;