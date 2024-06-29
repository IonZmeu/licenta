import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentIcon from '@mui/icons-material/Comment';
import { JobDTO, JobPageDTO, ThreadDTO } from '../interfaces/types';
import { handleFollowJob, handleLikeJob, handleDislikeJob } from '../functions/functions';
import { useAppContext } from '../components/AppContext';

interface ActionsProps {
    job: JobDTO;
    likedJobs: number[];
    dislikedJobs: number[];
    followedJobs: number[];
    setLikedJobs: React.Dispatch<React.SetStateAction<number[]>>;
    setDislikedJobs: React.Dispatch<React.SetStateAction<number[]>>;
    setFollowedJobs: React.Dispatch<React.SetStateAction<number[]>>;
    handleCardClick: (jobId: number, userId: number) => void;
}

const Actions: React.FC<ActionsProps> = ({
    job,
    likedJobs,
    dislikedJobs,
    followedJobs,
    setLikedJobs,
    setDislikedJobs,
    setFollowedJobs,
    handleCardClick,
}) => {
    const { value, setValue } = useAppContext();
    const handleLikeFront = (job: JobDTO) => {
        if (likedJobs.includes(job.id)) {
            setLikedJobs(likedJobs.filter(id => id !== job.id));
            if (job.likes !== undefined) {
                job.likes -= 1;
            }
        } else {
            setLikedJobs([...likedJobs, job.id]);
            if (job.likes !== undefined) {
                job.likes += 1;
            } else {
                job.likes = 1;
            }

            if (dislikedJobs.includes(job.id)) {
                setDislikedJobs(dislikedJobs.filter(id => id !== job.id));
                if (job.dislikes !== undefined) {
                    job.dislikes -= 1;
                }
            }
        }
    };

    const handleDislikeFront = (job: JobDTO) => {
        if (dislikedJobs.includes(job.id)) {
            setDislikedJobs(dislikedJobs.filter(id => id !== job.id));
            if (job.dislikes !== undefined) {
                job.dislikes -= 1;
            }
        } else {
            setDislikedJobs([...dislikedJobs, job.id]);
            if (job.dislikes !== undefined) {
                job.dislikes += 1;
            } else {
                job.dislikes = 1;
            }

            if (likedJobs.includes(job.id)) {
                setLikedJobs(likedJobs.filter(id => id !== job.id));
                if (job.likes !== undefined) {
                    job.likes -= 1;
                }
            }
        }
    };

    return (
        <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
                <IconButton
                    aria-label="like"
                    onClick={() => {
                        handleLikeJob(job.id, Number(localStorage.getItem('userId')));
                        handleLikeFront(job);
                    }}
                    color={likedJobs.includes(job.id) ? 'primary' : 'default'}
                >
                    <ThumbUpIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <Typography variant="body1" style={{ margin: '0 4px' }}>
                    {job.likes}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton
                    aria-label="dislike"
                    onClick={() => {
                        handleDislikeJob(job.id, Number(localStorage.getItem('userId')));
                        handleDislikeFront(job);
                    }}
                    style={{ color: dislikedJobs.includes(job.id) ? 'blue' : 'inherit' }}
                >
                    <ThumbDownIcon />
                </IconButton>
            </Grid>
            <Grid item>
                <Typography variant="body1" style={{ margin: '0 4px' }}>
                    {job.dislikes}
                </Typography>
            </Grid>
            {(job.userId !== Number(localStorage.getItem('userId'))) && (
                <Grid item>
                    <IconButton
                        aria-label="follow"
                        onClick={() => {
                            handleFollowJob(job.id, Number(localStorage.getItem('userId')));
                            if (followedJobs.includes(job.id)) {
                                setFollowedJobs(followedJobs.filter(id => id !== job.id));
                            } else {
                                setFollowedJobs([...followedJobs, job.id]);
                            }
                            setValue(!value);
                        }}
                        color={followedJobs.includes(job.id) ? 'primary' : 'default'}
                    >
                        <BookmarkIcon />
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );
};


export { Actions };
