import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

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
    responses?:Threadobj[];
    images:Image[];
  }
  
    function Thread() {
    let { id } = useParams();
    const [thread, setThread] = useState<ThreadDTO>();
    const [imageData, setImageData] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const [redirectToMainPage, setRedirectToMainPage] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchThread = async () => {
        try {
            const response = await axios.get<ThreadDTO>(`http://localhost:4123/thread/${id}`);
            setThread(response.data);
            if (response.data.parentThread) {
                navigate('../Forum'); // Redirect if parent thread is not null
            }
        } catch (error) {
          console.log('Error fetching threads: ', error);
        }
      };
  
      fetchThread();
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
        if (thread){
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
  

    return (
        <div>
            <Stack className="">
            {thread && (
                <h1>{thread.threadTitle}</h1>
            )}
            {thread && thread.images.length > 0 && (
                <Carousel interval={null} className="mb-3">
                {thread.images.map((image, idx) => (
                    <Carousel.Item key={idx}>
                    <img
                        src={imageData[image.id.toString()]}
                        className="d-block w-100"
                        alt={`Image ${idx}`}
                        style={{ objectFit: "contain", maxHeight: "500px", cursor: "pointer" }}
                    />
                    </Carousel.Item>
                ))}
                </Carousel>
            )}
            {thread && (
                <p>{thread.threadContent}</p>
            )}
            </Stack>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Comments</Accordion.Header>
                    <Accordion.Body>
                        {thread && thread.responses && thread.responses.map((response, index) => (
                            <Accordion key={index}>
                                <Accordion.Item eventKey={index.toString()}>
                                    <Accordion.Header>{response.author?.name} - {response.threadTitle} - {response.threadContent}</Accordion.Header>
                                    
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
      );
};

export default Thread;