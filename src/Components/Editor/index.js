import React, { useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'


export default function FormikRichText({ id, label, value, setValue  }) {

  const quillRef = useRef();
  const [loading,setloading]=useState(false)
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor)
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    
    
    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        setloading(true)
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        axios.defaults.withCredentials=true;
       const res =await axios.post(`${process.env.REACT_APP_API_URL}/api/upload/single`,formData) // upload data into server or aws or cloudinary
       
      setTimeout(() => {
        setloading(false)
      }, 2000);
        const url = res.data.data;
       console.log(url);
        
       editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        console.log('You could only upload images.');
      }
    };
  }
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', "strike"],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],   
        ['video', 'formula'],
        ['image', "link",],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), [])
  return (
    <>
   
        {loading &&<div id="toast-bottom-right" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <div class="text-sm font-normal">The Image is Uploading......</div>
</div>}


<div className="mb-4">
            <label
              htmlFor="content"
              className="py-2 block text-lg font-medium text-black"
            >
              Content:
            </label>

          <ReactQuill  className="mt-1 p-2 border min-h-100 rounded-md " theme="snow" ref={quillRef} value={value} modules={modules} onChange={setValue} />
         </div>
   
    </>

  )
}