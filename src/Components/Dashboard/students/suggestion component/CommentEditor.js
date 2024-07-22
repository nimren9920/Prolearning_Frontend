import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const CommentEditor = ({ topicId, refreshComments }) => {
    const [editorContent, setEditorContent] = useState('');
    const suggestiontitle=useRef()

    const handleChange = (content) => {
        setEditorContent(content);
    };

    const handleSubmit = async () => {
        try {
            axios.defaults.withCredentials=true;
            if(!editorContent || !suggestiontitle.current.value){
                console.log("All field are required ");
                return
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/api/topics/createcomment/${topicId}`, {
                comment: editorContent ,title:suggestiontitle?.current?.value
            });
            refreshComments();
            setEditorContent('');  // Clear the editor after submitting
        } catch (error) {
            console.error("There was an error posting the comment!", error);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <div >
                <label className='pt-2 '>Suggestion Title </label>
                    <input className='pt-2 mt-2 pb-2 mb-2 w-full border rounded-sm' type='text' ref={suggestiontitle}/>
                    
            </div>
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
