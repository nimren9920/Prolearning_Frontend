import React ,{useState ,useEffect, useRef} from 'react'
import Header from '../../../../Navbar/header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Physicaltestupload = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const {id}=useParams()
    const [data,Setdata]=useState('')
    const pdffile=useRef('')
    useEffect(() => {
        function testdata(){
            axios.defaults.withCredentials = true;
            axios.get(`${process.env.REACT_APP_API_URL}/api/physicaltest/physical-tests/${id}`).then(res=>Setdata(res.data.data)).catch(err=>console.log(err))
        }
        testdata()
    }, [id])

    function submittest() {
        console.log(pdffile.current.file[0]);
    }
    
  return (
    <>
          <div className={`${isSideNavOpen ? 'sm:ml-64' : ''}`}>
          <Header isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} />
   {data && <div className='flex justify-center items-center'>
    <div class="bg-background rounded-lg border p-6 w-full max-w-3xl ">
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-6 h-6 text-muted-foreground"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          <h1 class="text-2xl font-bold">{data.name}</h1>
        </div>
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>{data.teacher.fullName}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        </svg>
        <span>{data.subject}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
          <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
        </svg>
        <span>Grade {data.standard}</span>
      </div>
    </div>
    <div class="grid gap-4 bg-muted p-4 rounded-md">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5 text-muted-foreground"
          >
            <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"></path>
            <path d="M16 8 2 22"></path>
            <path d="M17.5 15H9"></path>
          </svg> */}
          <h2 class="text-xl font-bold"></h2>
        </div>
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-5 h-5"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
          <span>Total Marks :{data.score}</span>
        </div>
      </div>
     
     <div>

     
      {  data.questions.map((items,index)=>{
            return (<div className='flex flex-row justify-between'><div key={index}>{items.question}  </div><div>Marks: {items.score}</div></div>)
        })}
   
     </div>
     
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <input ref={pdffile}
       // value={pdffile}
          class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
          type="file"
          id="pdf-upload"
        />
      </div>
      <button onClick={submittest} class="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" x2="12" y1="3" y2="15"></line>
        </svg>
        <span>Submit as PDF</span>
      </button>
    </div>
  </div>
</div>
    </div>}
          </div>
    </>
  )
}

export default Physicaltestupload