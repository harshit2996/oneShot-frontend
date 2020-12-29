import React from 'react'
import { Button, Icon, Modal, Table, TableCell, TableRow } from 'semantic-ui-react'

const CollegeDetails = ({college}) => {
  const [open, setOpen] = React.useState(false)
  let collegeName = college["College Name"]
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<div className="stretch h-full w-full hover:bg-yellow-500 p-4" >{collegeName}</div>}
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
                          {
                          }
                          <TableCell>{key}</TableCell>
                          <TableCell>{formattedFees}</TableCell>
                        </TableRow> 
                      )


                    }
                    return (
                    <TableRow key={index}>
                      {
                      }
                      <TableCell>{key}</TableCell>
                      <TableCell>{college[key]}</TableCell>
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

export default CollegeDetails