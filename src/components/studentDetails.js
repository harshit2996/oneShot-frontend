import React from 'react'
import { Button, Icon, Modal, Table, TableCell, TableRow } from 'semantic-ui-react'

const StudentDetails = ({student,i}) => {
  const [open, setOpen] = React.useState(false)
  let studentName = student.firstName + " " + student.lastName
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<div className="stretch h-full w-full flex hover:bg-yellow-500 p-4" >
        <div className="col col-shrink">
        {i+1}.</div>
        <div className="flex flex-1 justify-center text-center ">{studentName}</div>
      </div>}
    >
      <Modal.Header style={{backgroundColor:"purple", color:"white"}}>{studentName}</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Table definition striped >
            <Table.Body>
              {
                Object.keys(student).map((key,index)=> {
                  <TableRow key={index}>

                      <TableCell>Name</TableCell>
                      <TableCell>{studentName}</TableCell>
                    </TableRow> 
                  if(String(key)!=="__v" && key!=="firstName" && key!=="lastName"){                   
                    return (
                      <TableRow key={index}>
                      <TableCell>{key}</TableCell>
                      <TableCell>
                      {
                        Array.isArray(student[key])?(student[key].map((element,i) => {
                          return (<div key={i}>{element}</div>)
                        }) ):(
                        

                        student[key]
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
        <Button color="purple" onClick={() => setOpen(false)}>
          <Icon name='arrow left' /> Back
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default StudentDetails