import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReplyEditor from './ReplayEditor.js'; // Ensure the path is correct

const CommentList = ({ topicId, refreshTrigger,refreshComments }) => {
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null); // State to track which comment is being replied to

  useEffect(() => {
    const fetchComments = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/topics/viewcomment/${topicId}`);
        const sortedData = response.data.data.reviewdata
          .filter(comment => !comment.parentId) // Only top-level comments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(sortedData);
      } catch (error) {
        console.error("There was an error fetching the comments!", error);
      }
    };

    fetchComments();
  }, [topicId, refreshTrigger]);

  const renderComments = (comments) => {
    return comments.map((comment, index) => (
      <article className="rounded-lg bg-white p-6 text-base" key={index}>
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-sm font-semibold">
              <img className="mr-2 h-6 w-6 rounded-full" src={comment?.createdBy?.avatar} alt={comment?.createdBy?.fullName} />
              {comment?.createdBy?.fullName}
            </p>
            <p className="text-sm text-gray-600">
              <time pubdate datetime={comment?.createdAt} title={new Date(comment?.createdAt).toDateString()}>
                {new Date(comment?.createdAt).toLocaleDateString()}
              </time>
            </p>
          </div>
        </footer>
        <h2 className="text-2xl">{comment?.title}</h2>
        <div className="text-gray-500 p-2 border-b last:border-none" dangerouslySetInnerHTML={{ __html: comment.topic_comment }} />
        <button
          className="mt-2 text-blue-500 hover:underline"
          onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
        >
          Reply
        </button>
        {replyTo === comment._id && (
          <ReplyEditor
            topicId={topicId}
            parentId={comment._id}
            refreshComments={refreshComments} // Close editor on refresh
          />
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-6 mt-4 border-l-2 pl-4">
            {renderComments(comment.replies)}
          </div>
        )}
      </article>
    ));
  };

  return (
    <section className="bg-white py-8 antialiased lg:py-16">
      <div className="mx-auto max-w-2xl px-4">
        {renderComments(comments)}
      </div>
    </section>
  );
};

export default CommentList;
