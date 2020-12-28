import axios from 'axios'
import React, { useState } from 'react'
import CollegeDetails from './collegeDetails'

async function getData(stateName){
  let data = []
  await axios.post('http://api.example.test:3000/collegesByStates', stateName)
  .then(res=>{
    res.data.forEach(element => {
      data.push(element)
    })
  })
  .catch(err=>{
    console.log(err.response)
  })
  
  return data
}

const CollegeListByState = ( { active, payload, label } )=>{ 
  
  const [data, setData] = useState(null)
  const [stateName, setStateName] = useState(null)

  if(active){
    if(stateName !== payload[0].name){
      setStateName(payload[0].name)
      getData(payload[0].name).then(res=>{
        setData(res)
      })
    }   
    
    return(
      
      <div className="bg-yellow-100 h-full flex-col flex text-base md:rounded-xl md:mx-12">
        <div className="border-b-2 border-black border-solid md:rounded-t-xl p-4 text-black bg-red-200">
          <div className="self-center">{payload[0].name}</div>
        </div>
        <div className="overflow-y-hidden flex-1" >
          <div className="overflow-y-auto max-h-full" >
            {
              data?data.map((college,index)=>{
                return <div key={index}  className="border-b-2 border-black border-solid cursor-pointer p-0 text-black"><CollegeDetails college={college}/></div>
              })
              :undefined
            }
          </div>
        </div>
      </div>
    )
    
  }
  return null
}



export default CollegeListByState
