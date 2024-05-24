    import * as React from 'react';
    import Typography from '@mui/material/Typography';
    import Grid from '@mui/material/Grid';
    import Card from '@mui/material/Card';
    import CardActionArea from '@mui/material/CardActionArea';
    import CardContent from '@mui/material/CardContent';
    import CardMedia from '@mui/material/CardMedia';
    import axios from 'axios';
    import { useEffect, useState } from 'react';
    import { Carousel } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import { Skeleton } from '@mui/material';


    interface Image {
        id: number | string;
    }

    interface ThreadViewProps {
        date: string | undefined;
        description: string | undefined;
        images: Image[];
        title: string | undefined;
        id : Number | string;
    }

    

    export default function ThreadView({ date, description, images, title, id }: ThreadViewProps) {
        const navigate = useNavigate();
            
        const [imageUrls, setImageUrls] = useState<string[]>([]);

        useEffect(() => {
            const fetchImages = async () => {
                const urls = await Promise.all(images.map(async (image) => {
                    try {
                        const response = await axios.get(`http://localhost:4123/image/${image.id}`);
                        return response.data; // Assuming backend returns the base64 string directly
                    } catch (error) {
                        console.log('Error fetching image: ', error);
                        return null;
                    }
                }));
                setImageUrls(urls);
            };
    
            fetchImages(); // Fetch images when component mounts or images array changes
        }, [images]);


        const handleOpenThread = () => {
            navigate(`/forum/thread/${id}`);
        };

        return (
            <Grid item xs={12} md={6} sx={{ margin: '20px 20% 0' }}>
                {imageUrls.length === 0 ? (
                <CardActionArea component="a" onClick={() => handleOpenThread()}>
                    <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                        {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                        {date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                        {description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                        Continue reading... {imageUrls.length}
                        </Typography>
                    </CardContent>
                    </Card>
                </CardActionArea>
                ) : (
                    <CardActionArea component="b">
                        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent onClick={() => handleOpenThread()}> 
                                <Typography component="h2" variant="h5">
                                    {title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {date}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    {description}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Continue reading... dadsd {imageUrls.length}
                                </Typography>
                            </CardContent>
                            <Carousel interval={null} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                {imageUrls.map((imageUrl, index) => (
                                    <Carousel.Item key={index}>
                                        {imageUrl ? ( // Render image if available, otherwise render Skeleton
                                            <img
                                            src={imageUrl}
                                            className="d-block w-100"
                                            alt={`Image ${index}`}
                                            style={{ objectFit: "contain", width: "100%", height: "500px", cursor: "pointer" }}
                                        />
                                        ) : (
                                            <Skeleton variant="rectangular" width={"100%"} height={"500px"} />
                                        )}
                                        
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Card>
                    </CardActionArea>
                )}
            </Grid>
        );
    }