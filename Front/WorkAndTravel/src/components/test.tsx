import React, { useState } from 'react';

interface Comment {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  depth: number;
  children: Comment[];
}

const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div style={{ marginLeft: `${comment.depth * 20}px`, borderLeft: '2px solid #ccc', padding: '5px', marginBottom: '10px' }}>
      <p>{comment.content}</p>
      <p>By: {comment.author}</p>
      <p>Timestamp: {comment.timestamp}</p>
      {comment.children.map(child => (
        <CommentComponent key={child.id} comment={child} />
      ))}
    </div>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content: 'This is the root comment.',
      author: 'User1',
      timestamp: '2024-05-20',
      depth: 0,
      children: [
        {
          id: 2,
          content: 'Reply to root comment.',
          author: 'User2',
          timestamp: '2024-05-20',
          depth: 1,
          children: [
            {
              id: 3,
              content: 'Reply to root2 comment.',
              author: 'User3',
              timestamp: '2024-05-20',
              depth: 2,
              children: []
            }
          ]
        }
      ]
    }
  ]);

  const addComment = (parentId: number | null, content: string, author: string): void => {
    const newComment: Comment = {
      id: comments.length + 1,
      content,
      author,
      timestamp: new Date().toISOString(),
      depth: parentId ? comments.find(comment => comment.id === parentId)!.depth + 1 : 0,
      children: []
    };
    const updatedComments: Comment[] = [...comments];
    const parentComment: Comment | undefined = updatedComments.find(comment => comment.id === parentId);
    if (parentComment) {
      parentComment.children.push(newComment);
    } else {
      updatedComments.push(newComment);
    }
    setComments(updatedComments);
  };

  return (
    <div>
      {comments.map(comment => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
      <button onClick={() => addComment(null, 'New Root Comment', 'New User')}>Add Root Comment</button>
      <button onClick={() => addComment(1, 'New Reply', 'New User')}>Reply to Comment 1</button>
    </div>
  );
};

export default CommentSection;