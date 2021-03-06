import Axios from '..'
import React, { useEffect, useState } from 'react'
import StudentDetails from '../components/studentDetails'

const Students = () =>{

  const [students,setStudents] = useState([])
  const [didLoad, setDidLoad] = useState(false);
  useEffect(()=>{
    if (!didLoad) {
    Axios.get('/getAllStudents')
    .then(res=>{
      if(((students.length === res.data.length) && students.every(function(element, index) {
        return element === res.data[index]; 
      }))){
      }
      else{
        setStudents(res.data)
      }
    })
    .catch(err=>console.log(err.response))
    setDidLoad(true)
  }
  },[didLoad,students])

  return(
    <div className="h-screen md:width-full flex flex-col justify-center w-full">

      <div className="p-12 w-full self-center" style={{maxHeight:"80vh"}}>
        <div className="border-b-2 border-black border-solid bg-purple-300 hover:bg-yellow-600 p-4 cursor-pointer p-0 text-black">List of All Students</div>
        <div className="h-full flex overflow-y-hidden justify-center">
          <div className=" md:flex w-full md:w-1/2 flex-col overflow-y-auto max-h-full">
            {
              students?students.map((student,index)=>{
                return <div key={index}  className="border-b-2 border-black border-solid bg-yellow-200 hover:bg-yellow-600 cursor-pointer p-0 text-black"><StudentDetails student={student} i={index}/>
                </div>
              })
              :undefined
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students