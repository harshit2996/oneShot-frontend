import Axios from '..'
import React, { useState } from 'react'
import { Button, Form, Icon, Modal, Segment, Table, TableCell, TableRow } from 'semantic-ui-react'

const Colleges = () =>{

  const [collegeName,setCollegeName] = useState('')
  const [college,setCollege] = useState(null)
  const [open,setOpen] = useState(true)

  function getCollege() {
    console.log(collegeName)
    Axios.post('http://api.example.test:3000/getCollegeDetails',collegeName).then(res=>{
      console.log(res.data[0])
      setCollege(res.data[0])
    })
  }

  return(
    <div>
      <div className="flex justify-center">
      <Segment className="md:w-1/2" secondary>
        <Form className="flex" onSubmit={getCollege}>
      <Form.Field className="flex-1">
        <label>Enter College Name</label>
        <input name="collegeName" value={collegeName} onChange={(event) => setCollegeName(event.target.value)} placeholder='College Name' />
      </Form.Field>
      <Form.Field className="flex items-stretch  p-2 pb-0">
        <Button className="self-center" type='submit'>Submit</Button>
      </Form.Field>
    </Form>
      </Segment>
      </div>
      {
        college?(
          <Modal
      open={open}
      onClose={() => {
        setOpen(false)
        setCollege(null)
        setOpen(true)
      }}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header style={{backgroundColor:"purple", color:"white"}}>{collegeName}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Table definition striped >
          <Table.Body>
              {
                Object.keys(college).map((key,index)=> {
                  if(String(key)!=="__v" && String(key)!=="_id"){
                    if(key==="Average Fees"){
                      var formatter = new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                      })
                      let formattedFees = formatter.format(college[key])
                      return (
                        <TableRow key={index}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{formattedFees}</TableCell>
                        </TableRow> 
                      )
                    }
                    return (
                    <TableRow key={index}>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                      {
                        Array.isArray(college[key])?(college[key].map((element,i) => {
                          return (<div key={i}>{element}</div>)
                        }) ):(
                        

                        college[key]
                        )
                      }
                      </TableCell>
                    </TableRow> 
                    )
                  }
                  else{
                    return null
                  }
                })
              }
            </Table.Body>
          </Table>         
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="purple" onClick={() => {
        setOpen(false)
        setCollege(null)
        setOpen(true)
      }}>
          <Icon name='arrow left' /> Back
        </Button>
      </Modal.Actions>
    </Modal>
        ):undefined
      }
      
    </div>
  )
}

export default Colleges