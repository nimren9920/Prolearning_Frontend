import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ topicId, refreshTrigger }) => {
    const [comments, setComments] = useState();
    const [editbutton,seteditbutton] =useState(false)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                axios.defaults.withCredentials=true;

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/topics/viewcomment/${topicId}`);
                //console.log(response)
                const sortedData = response.data.data.reviewdata.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
      
                setComments(sortedData);
            } catch (error) {
                console.error("There was an error fetching the comments!", error);
            }
        };

        fetchComments();
    }, [topicId, refreshTrigger]);
{/* <div 
                     key={index} 
                     className="p-2 border-b last:border-none" 
                     dangerouslySetInnerHTML={{ __html: comment.topic_comment }} 
                 /> */}
    return (

        <section class="bg-white py-8 antialiased lg:py-16">
<div class="mx-auto max-w-2xl px-4">
         
             {console.log(comments)}
             {comments && comments.map((comment, index) => (
                <article class="rounded-lg bg-white p-6 text-base" key={index}>
                <footer class="mb-2 flex items-center justify-between">
                  <div class="flex items-center">
                    <p class="mr-3 inline-flex items-center text-sm font-semibold  "><img class="mr-2 h-6 w-6 rounded-full" src={comment?.createdBy?.avatar} alt="Michael Gough" />{comment?.createdBy?.fullName}</p>
                    <p class="text-sm text-gray-600 "><time pubdate datetime="2022-02-08" title="February 8th, 2022"> {new Date(comment?.createdAt).toLocaleDateString()}</time></p>
                  </div>
                  
                  <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1" class="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 " type="button">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                    <span class="sr-only">Comment settings</span>
                  </button>
               
                  <div id="dropdownComment1" class="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow ">
                    <ul class="py-1 text-sm text-gray-700 " aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 ">Edit</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 ">Remove</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 ">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <h2 className='text-2xl'>{comment?.title}</h2>
                <p class="text-gray-500 "><div 
                     className="p-2 border-b last:border-none" 
                     dangerouslySetInnerHTML={{ __html: comment.topic_comment }} 
                 /></p>
              </article>
             ))}
        


  
</div>
</section>

    );
};

export default CommentList;
