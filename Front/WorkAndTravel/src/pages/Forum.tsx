import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Carousel, Accordion, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ThreadView from "../components/ThreadView";
import { Pagination } from "@mui/material";

interface Image {
  id: number | string;
  imageUrl: string;
  imageType: string;
}

interface UserThreadDTO {
  id?: number | string;
  name?: string;
}

interface Threadobj {
  id: number | string;
  likes?: number;
  dislikes?: number;
  threadTitle?: string;
  threadContent?: string;
  author?: UserThreadDTO;
  parentThread?: Threadobj;
  responses?:Threadobj[];
  images:Image[];
}

interface ThreadDTO {
  id: number | string;
  authorId: number | string;
  likes?: number;
  dislikes?: number;
  authorName: string;
  threadTitle?: string;
  threadContent?: string;
  parentThread?: Threadobj;
  comments?:Threadobj[];
  images:Image[];
}

const Forum = () => {
  const [threads, setThreads] = useState<ThreadDTO[]>([]);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const [totalPages, setTotalPages] = useState<string>("");
  const { page: currentPage } = useParams();
  const navigate = useNavigate();


  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`/forum/${value}`); // Update URL with new page number
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    console.log("loaded");
    console.log(currentPage);
    
    const fetchThreadsAndImages = async () => {
      try {
        const response = await axios.get<ThreadDTO[]>(`http://localhost:4123/thread/page/${currentPage}`);
        setThreads(response.data);
      } catch (error) {
        console.log('Error fetching threads and images: ', error);
      }
    };
    const fetchTotalPages = async () => {
      try {
        const pagesResponse = await axios.get(`http://localhost:4123/thread/pages`);
        setTotalPages(pagesResponse.data);
      } catch (error) {
        console.log('Error fetching total pages: ', error);
      }
    };


    fetchTotalPages();
    fetchThreadsAndImages();

  }, [currentPage]);

  return (
    <div>
    {threads && threads.map((thread, index) => (
      <div key={index}>
        <ThreadView 
          date={"date"} 
          description={"thread.description"} 
          images={thread.images} 
          title={thread.threadTitle} 
          id={thread.id}
        />
      </div>
    ))}
    <div className="d-flex justify-content-center">
      <div style={{ fontSize: '2.5rem' }}>
        <Pagination count={Number(totalPages)} page={Number(currentPage)} onChange={handleChangePagination} />
      </div>
    </div>
  </div>
  );
};

export default Forum;