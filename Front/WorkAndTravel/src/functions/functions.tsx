import axios from 'axios';

export const handleFollowThread = (threadId: number, userId: number) => {
  axios.put('http://localhost:4123/thread/follow', null, {
    params: {
      threadId: threadId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Followed thread successfully');
    })
    .catch(error => {
      console.error('Error following thread:', error);
    });
};

export const handleLikeThread = (threadId: number, userId: number) => {
  axios.post('http://localhost:4123/like/like', null, {
    params: {
      threadId: threadId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Liked thread successfully');
    })
    .catch(error => {
      console.error('Error Liking thread:', error);
    });
};

export const handleDislikeThread = (threadId: number, userId: number) => {
  axios.post('http://localhost:4123/like/dislike', null, {
    params: {
      threadId: threadId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Disiked thread successfully');
    })
    .catch(error => {
      console.error('Error Disliking thread:', error);
    });
};

export const handleFollowJob = (jobId: number, userId: number) => {
  axios.put('http://localhost:4123/job/follow', null, {
    params: {
      jobId: jobId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Followed job successfully');
    })
    .catch(error => {
      console.error('Error following job:', error);
    });
};

export const handleLikeJob = (jobId: number, userId: number) => {
  axios.post('http://localhost:4123/like/like', null, {
    params: {
      jobId: jobId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Liked job successfully');
    })
    .catch(error => {
      console.error('Error Liking job:', error);
    });
};

export const handleDislikeJob = (jobId: number, userId: number) => {
  axios.post('http://localhost:4123/like/dislike', null, {
    params: {
      jobId: jobId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Disliked job successfully');
    })
    .catch(error => {
      console.error('Error Disliking job:', error);
    });
};

export const handleLikeComment = (commentId: number, userId: number) => {
  axios.post('http://localhost:4123/like/like', null, {
    params: {
      commentId: commentId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Liked comment successfully');
    })
    .catch(error => {
      console.error('Error Liking job:', error);
    });
};

export const handleDislikeComment = (commentId: number, userId: number) => {
  axios.post('http://localhost:4123/like/dislike', null, {
    params: {
      commentId: commentId,
      userId: userId
    }
  })
    .then(response => {
      console.log('Disliked comment successfully');
    })
    .catch(error => {
      console.error('Error Disliking job:', error);
    });
};