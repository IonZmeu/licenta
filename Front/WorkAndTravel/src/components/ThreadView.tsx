import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { ThreadDTO } from '../interfaces/types';
import { handleDislikeThread, handleFollowThread, handleLikeThread } from '../functions/functions';
import { useAppContext } from '../components/AppContext';

import ImageSlider from './ImageSlider';

interface Props {
    thread: ThreadDTO;
    setFollowedThreads: React.Dispatch<React.SetStateAction<number[]>>;
    setLikedThreads: React.Dispatch<React.SetStateAction<number[]>>;
    setDislikedThreads: React.Dispatch<React.SetStateAction<number[]>>;
    followedThreads: number[];
    likedThreads: number[];
    dislikedThreads: number[];
}

const ThreadView: React.FC<Props> = ({ thread, setFollowedThreads, setLikedThreads, setDislikedThreads, followedThreads, likedThreads, dislikedThreads }) => {
    const navigate = useNavigate();

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [pfp, setPfp] = useState<string>("");

    const { value, setValue } = useAppContext();

    function timeAgo(timeCreated: string): string {
        const createdDate = new Date(timeCreated);
        const now = new Date();

        const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
        ];

        for (const interval of intervals) {
            const time = Math.floor(seconds / interval.seconds);
            if (time > 0) {
                return `${time} ${interval.label}${time !== 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    }

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(thread.images.map(async (image) => {
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

        const fetchAndSetImage = async (authorId: string | number) => {
            const profileImage = await fetchImage(authorId);
            setPfp(profileImage);
        };

        fetchAndSetImage(thread.authorId);
        fetchImages();
        console.log("useEffect called");
    }, [thread.images]);

    const fetchImage = async (imageId: number | string): Promise<string> => {
        try {
            const response = await axios.get(`http://localhost:4123/image/pfp/${imageId}`);
            return response.data; // Assuming backend returns the base64 string directly
        } catch (error) {
            console.log('Error fetching image: ', error);
            return "";
        }
    };

    const handleOpenThread = () => {
        navigate(`/forum/thread/${thread.id}`);
    };

    const handleOpenProfile = (id: number) => {
        navigate(`/profile/${id}`);
    };

    const handleLikeFront = (thread: ThreadDTO) => {
        if (likedThreads.includes(thread.id)) {
            setLikedThreads(likedThreads.filter(id => id !== thread.id));
            if (thread.likes !== undefined) {
                thread.likes -= 1;
            }
        } else {
            setLikedThreads([...likedThreads, thread.id]);
            if (thread.likes !== undefined) {
                thread.likes += 1;
            } else {
                thread.likes = 1;
            }

            if (dislikedThreads.includes(thread.id)) {
                setDislikedThreads(dislikedThreads.filter(id => id !== thread.id));
                if (thread.dislikes !== undefined) {
                    thread.dislikes -= 1;
                }
            }
        }
    };

    const handleDislikeFront = (thread: ThreadDTO) => {
        if (dislikedThreads.includes(thread.id)) {
            setDislikedThreads(dislikedThreads.filter(id => id !== thread.id));
            if (thread.dislikes !== undefined) {
                thread.dislikes -= 1;
            }
        } else {
            setDislikedThreads([...dislikedThreads, thread.id]);
            if (thread.dislikes !== undefined) {
                thread.dislikes += 1;
            } else {
                thread.dislikes = 1;
            }

            if (likedThreads.includes(thread.id)) {
                setLikedThreads(likedThreads.filter(id => id !== thread.id));
                if (thread.likes !== undefined) {
                    thread.likes -= 1;
                }
            }
        }
    };

    return (
        <Grid item xs={12} md={6} sx={{ margin: '20px 14% 0' }}>
            <Grid sx={{
                padding: '5px 20px',
                boxShadow: 'none',
                borderRadius: '25px',
                '&:hover': {
                    boxShadow: 'none',
                }
            }}>
                <Card sx={{ boxShadow: 'none' }}>
                    <CardContent >
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            {pfp ? (
                                <Avatar src={pfp} style={{ marginRight: '10px' }} />
                            ) : (
                                <Avatar style={{ marginRight: '10px' }}>
                                    {thread.authorName ? thread.authorName.slice(0, 2).toUpperCase() : 'NA'}
                                </Avatar>
                            )}
                            <Typography
                                variant="h5"
                                onClick={() => handleOpenProfile(thread.authorId)}
                                sx={{
                                    marginRight: '10px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                {thread.authorName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                sx={{
                                    marginRight: '10px',
                                }}
                            >
                                {thread?.timeCreated ? timeAgo(thread?.timeCreated) : <></>}
                            </Typography>
                        </Grid>
                        <Grid onClick={() => handleOpenThread()}
                            sx={{
                                marginRight: '10px',
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}>
                            <Typography variant="h5" component="h2">
                                {thread.threadTitle}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="subtitle1" paragraph>
                                {thread.threadContent}
                            </Typography>
                        </Grid>
                    </CardContent>
                    {imageUrls.length === 1 ? (
                        <div>
                            <img
                                src={imageUrls[0]}
                                alt="Image 0"
                                style={{ objectFit: 'contain', width: '100%' }}
                            />
                        </div>
                    ) : imageUrls.length > 1 ? (
                        <ImageSlider imageUrls={imageUrls} onImageClick={() => ""} />
                    ) : null}
                </Card>
                <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item>
                        <IconButton
                            aria-label="like"
                            onClick={() => {
                                handleLikeThread(thread.id, Number(localStorage.getItem('userId')));
                                handleLikeFront(thread);
                            }}
                            color={likedThreads.includes(thread.id) ? 'primary' : 'default'}
                        >
                            <ThumbUpIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ margin: '0 4px' }}>
                            {thread.likes}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="dislike"
                            onClick={() => {
                                handleDislikeThread(thread.id, Number(localStorage.getItem('userId')));
                                handleDislikeFront(thread);
                            }}
                            style={{ color: dislikedThreads.includes(thread.id) ? 'blue' : 'inherit' }}
                        >
                            <ThumbDownIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ margin: '0 4px' }}>
                            {thread.dislikes}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {(thread.authorId !== Number(localStorage.getItem('userId'))) && (
                            <IconButton
                                aria-label="follow"
                                onClick={() => {
                                    handleFollowThread(thread.id, Number(localStorage.getItem('userId')));
                                    if (followedThreads.includes(thread.id)) {
                                        setFollowedThreads(followedThreads.filter(id => id !== thread.id));
                                    } else {
                                        setFollowedThreads([...followedThreads, thread.id]);
                                    }
                                    setValue(!value);
                                }}
                                color={followedThreads.includes(thread.id) ? 'primary' : 'default'}
                            >
                                <BookmarkIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ThreadView;
