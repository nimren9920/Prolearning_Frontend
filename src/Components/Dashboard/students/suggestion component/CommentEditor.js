import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const CommentEditor = ({ topicId, refreshComments }) => {
    const [editorContent, setEditorContent] = useState('');

    const handleChange = (content) => {
        setEditorContent(content);
    };

    const handleSubmit = async () => {
        try {
            axios.defaults.withCredentials=true;

            await axios.post(`${process.env.REACT_APP_API_URL}/api/topics/createcomment/${topicId}`, {
                comment: editorContent
            });
            refreshComments();
            setEditorContent('');  // Clear the editor after submitting
        } catch (error) {
            console.error("There was an error posting the comment!", error);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <ReactQuill value={editorContent} onChange={handleChange} />
            <button 
                onClick={handleSubmit} 
                className="mt-4 px-4 py-2 bg-[#FF725E] text-white rounded-xl transition  hover:delay-50 hover:scale-105"
            >
                Submit New Content
            </button>
        </div>
    );
};

export default CommentEditor;
