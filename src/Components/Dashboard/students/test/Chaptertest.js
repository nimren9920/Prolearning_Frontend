import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from '../../../Navbar/header'
import Loading from '../../../Loading/Loading'
export const Chaptertest = () => {
  const {Id}=useParams()
  const [test, setTest] = useState(null);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  
  useEffect(() => {
    const fetchTest = async () => {
      try {
        axios.defaults.withCredentials=true;

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chapters/chapter-tests/chapter/${Id}`);
        setTest(response.data.data);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [Id]);
  return (
    <>
        
   
     <div className={`${isSideNavOpen? 'sm:ml-64': ''}`} >
     <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
    
    
    
    {
      test ? test.map((data,index)=>{
        return (
          <Link key={index} to={`/student/test/${data?._id}`}>{data?.testName}</Link>
        )
      }) : <Loading/>
    }
     </div>
    </>
  )
}
