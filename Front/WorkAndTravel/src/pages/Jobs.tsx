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

const Jobs = () => {
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
    <div>
      <h1>Jobs</h1>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h3>{job.name}</h3>
            <p>Email: {job.email}</p>
            <p>Location: {job.lat_coordinate}, {job.long_coordinate}</p>
            {job.images && job.images.length > 0 && (
              <div>
                <h4>Images</h4>
                <ul>
                  {job.images.map(image => (
                    <li key={image.id}>
                      {image.imageUrl}
                      {image.id && imageData[image.id.toString()] && (
                        <img src={imageData[image.id.toString()]} alt={`Image ${image.id}`} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;