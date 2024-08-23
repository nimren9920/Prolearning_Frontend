import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";

const CreateTestForm = ({ standard, subject, onClose }) => {
  const [formData, setFormData] = useState({
    standard: standard || '',
    subject: subject || '',
    chapters: [],
    topics: [],
    questionsPerTopic: ''
  });

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);

  const getSubjects = async (standardId) => {
    try {
      const response = await axios.get(`https://backend-pro-learning.vercel.app/api/subjects/standard/${standardId}`);
      return response.data.data.standards[0] ? response.data.data.standards[0].subjects : [];
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return [];
    }
  };

  const getChapters = async (subjectId) => {
    try {
      const response = await axios.get(`https://backend-pro-learning.vercel.app/api/subjects/${subjectId}`);
      return response.data.data.chapters;
    } catch (error) {
      console.error('Error fetching chapters:', error);
      return [];
    }
  };

  const getTopics = async (chapterId) => {
    try {
      const response = await axios.get(`https://backend-pro-learning.vercel.app/api/chapters/${chapterId}`);
      return response.data.data.topics;
    } catch (error) {
      console.error('Error fetching topics:', error);
      return [];
    }
  };

  useEffect(() => {
    if (formData.standard) {
      getSubjects(formData.standard).then(setSubjects);
    }
  }, [formData.standard]);

  useEffect(() => {
    if (formData.subject) {
      getChapters(formData.subject).then(setChapters);
    }
  }, [formData.subject]);

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = [];
      for (const chapterId of formData.chapters) {
        const chapterTopics = await getTopics(chapterId);
        topics.push(...chapterTopics);
      }
      setAvailableTopics(topics);
    };

    if (formData.chapters.length > 0) {
      fetchTopics();
    }
  }, [formData.chapters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChapterSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({
      ...formData,
      chapters: selectedOptions,
    });
  };

  const handleTopicSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({
      ...formData,
      topics: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const topicIdsArray = formData.topics.map(topic => topic.trim());

    try {
        axios.defaults.withCredentials = true;
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/physicaltest/physical-tests/auto/genrated`, {
        topicIds: topicIdsArray,
        questionsPerTopic: parseInt(formData.questionsPerTopic)
      });
      
      console.log('Questions retrieved successfully:', response.data);
      // Handle success (e.g., show a success message or display questions)
      if (onClose) onClose(response?.data?.data);

    } catch (error) {
      console.error('Error retrieving questions:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (

   <>
    
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
    
    <div className='flex flex-row justify-between gap-4'>
    <h2 className="text-2xl font-bold mb-4">Generate Question  </h2>

<IoClose className='m-1' size={30} onClick={()=>{onClose(false)}}/>
    </div>
      {/* Standard Dropdown */}
      <div className="mb-4">
        <label htmlFor="standard" className="block text-sm font-medium text-gray-700">Standard</label>
        <select
          name="standard"
          value={formData.standard}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select Standard</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(standard => (
            <option key={standard} value={standard}>{standard}</option>
          ))}
        </select>
      </div>

      {/* Subject Dropdown */}
      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Select Subject</option>
          {subjects.map(subject => (
            <option key={subject._id} value={subject._id}>{subject.name}</option>
          ))}
        </select>
      </div>

      {/* Chapters Multi-Select */}
      <div className="mb-4">
        <label htmlFor="chapters" className="block text-sm font-medium text-gray-700">Chapters</label>
        <select
          name="chapters"
          multiple
          value={formData.chapters}
          onChange={handleChapterSelection}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          {chapters.map(chapter => (
            <option key={chapter._id} value={chapter._id}>{chapter.name}</option>
          ))}
        </select>
      </div>

      {/* Topics Multi-Select */}
      <div className="mb-4">
        <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics</label>
        <select
          name="topics"
          multiple
          value={formData.topics}
          onChange={handleTopicSelection}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          {availableTopics.map(topic => (
            <option key={topic._id} value={topic._id}>{topic.name}</option>
          ))}
        </select>
      </div>

      {/* Questions Per Topic */}
      <div className="mb-4">
        <label htmlFor="questionsPerTopic" className="block text-sm font-medium text-gray-700">Questions Per Topic</label>
        <input
          type="number"
          name="questionsPerTopic"
          value={formData.questionsPerTopic}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md shadow-md">Retrieve Questions</button>
    
    </form>
   </>
  );
};

export default CreateTestForm;
