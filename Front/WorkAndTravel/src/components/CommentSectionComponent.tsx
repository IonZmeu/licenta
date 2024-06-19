import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import CommentComponent from './CommentComponent';
import { CommentDTO } from '../interfaces/types';

interface CommentSectionProps {
  jobComments: CommentDTO[] | undefined;
  handleReply: (comment: CommentDTO) => void;
  handleCommentSubmit: () => void;
  handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stopReplying: () => void;
  commentText: string;
  replyComment: CommentDTO | null;
  likedComments: number[];
  setLikedComments: React.Dispatch<React.SetStateAction<number[]>>;
  dislikedComments: number[];
  setDislikedComments: React.Dispatch<React.SetStateAction<number[]>>;
}


const CommentSection: React.FC<CommentSectionProps> = ({
  jobComments,
  handleReply,
  handleCommentSubmit,
  handleCommentChange,
  stopReplying,
  commentText,
  replyComment,
  likedComments,
  setLikedComments,
  dislikedComments,
  setDislikedComments
}) => {
  const [showButtons, setShowButtons] = useState<boolean>(false);

  return (
    <Grid item xs={12} md={12} lg={12} xl={12}>
      <Box sx={{ margin: 'auto' }}>
        <Card variant="elevation" sx={{ marginBottom: 2, boxShadow: 'none' }}>
          <CardContent>
            <Grid container spacing={1} alignItems="flex-start">
              <Grid item xs={12}>
                {replyComment && (
                  <Typography style={{ fontSize: '14px' }}>
                    Replying to: <b>{replyComment.username}</b> his message:{' '}
                    {replyComment.commentContent.length > 50
                      ? `${replyComment.commentContent.slice(0, 47)}...`
                      : replyComment.commentContent}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Leave a comment"
                  multiline
                  fullWidth
                  value={commentText}
                  onChange={handleCommentChange}
                  onFocus={() => setShowButtons(true)} // Show buttons when input field is focused
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                {showButtons && (
                  <Box display="flex" justifyContent="flex-end">
                    <Button sx={{ height: '100%', padding: 1, marginRight: 1 }} size="small" variant="contained" onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                      Post
                    </Button>
                    <Button sx={{ height: '100%', padding: 1 }} size="small" variant="contained" onClick={() => {
                      stopReplying();
                      setShowButtons(false);
                    }}>
                      Cancel
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>


            <Grid item xs={12}>
              {jobComments &&
                jobComments
                  .filter(comment => comment.depth === 0) // Filter comments with depth 0
                  .map(comment => (
                    <CommentComponent
                      key={comment.id}
                      comment={comment}
                      handleReply={handleReply}
                      likedComments={likedComments}
                      setLikedComments={setLikedComments}
                      dislikedComments={dislikedComments}
                      setDislikedComments={setDislikedComments}
                    />
                  ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

interface CommentSectionPropsThread {
  threadComments: CommentDTO[] | undefined;
  handleReply: (comment: CommentDTO) => void;
  handleCommentSubmit: () => void;
  handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stopReplying: () => void;
  commentText: string;
  replyComment: CommentDTO | null;
  handleFollowThread: () => void;
  likedComments: number[];
  setLikedComments: React.Dispatch<React.SetStateAction<number[]>>;
  dislikedComments: number[];
  setDislikedComments: React.Dispatch<React.SetStateAction<number[]>>;
}



const ForumCommentSection: React.FC<CommentSectionPropsThread> = ({
  threadComments,
  handleReply,
  handleCommentSubmit,
  handleCommentChange,
  stopReplying,
  commentText,
  replyComment,
  likedComments,
  setLikedComments,
  dislikedComments,
  setDislikedComments
}) => {
  const [showButtons, setShowButtons] = useState<boolean>(false);

  return (
    <Grid item xs={12} md={12} lg={12} xl={12}>
      <Box sx={{ margin: 'auto' }}>
        <Card variant="elevation" sx={{ marginBottom: 2, boxShadow: 'none' }}>
          <CardContent>
            <Grid container spacing={1} alignItems="flex-start">
              <Grid item xs={12}>
                {replyComment && (
                  <Typography style={{ fontSize: '14px' }}>
                    Replying to: <b>{replyComment.username}</b> his message:{' '}
                    {replyComment.commentContent.length > 50
                      ? `${replyComment.commentContent.slice(0, 47)}...`
                      : replyComment.commentContent}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Leave a comment"
                  multiline
                  fullWidth
                  value={commentText}
                  onChange={handleCommentChange}
                  onFocus={() => setShowButtons(true)} // Show buttons when input field is focused
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                {showButtons && (
                  <Box display="flex" justifyContent="flex-end">
                    <Button sx={{ height: '100%', padding: 1, marginRight: 1 }} size="small" variant="contained" onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                      Post
                    </Button>
                    <Button sx={{ height: '100%', padding: 1 }} size="small" variant="contained" onClick={() => {
                      stopReplying();
                      setShowButtons(false);
                    }}>
                      Cancel
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>


            <Grid item xs={12}>
              {threadComments &&
                threadComments
                  .filter(comment => comment.depth === 0) // Filter comments with depth 0
                  .map(comment => (
                    <CommentComponent
                      key={comment.id}
                      comment={comment}
                      handleReply={handleReply}
                      likedComments={likedComments}
                      setLikedComments={setLikedComments}
                      dislikedComments={dislikedComments}
                      setDislikedComments={setDislikedComments}
                    />
                  ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export { CommentSection, ForumCommentSection };
