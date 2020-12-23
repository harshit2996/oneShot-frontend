import axios from 'axios'
import React, { Component } from 'react'

class Home extends Component{
  componentDidMount(){

    axios.get('http://api.example.test:3000')
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err.response)
    })
    
  }

  render(){    
    return(
      <div>Hi</div>
    )
  }
}

export default Home