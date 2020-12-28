import React from 'react'
import { Button, Icon, Modal, Table, TableCell, TableRow } from 'semantic-ui-react'

const CollegeDetails = ({college}) => {
  const [open, setOpen] = React.useState(false)
  console.log(college["College Name"])
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
                  console.log(college)
                  if(String(key)!=="__v" && String(key)!=="_id"){
                    if(key==="Average Fees"){
                      var formatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'INR',
                      });
                      let formattedFees = formatter.format(Math.ceil(college[key]))
                      college[key] = formattedFees
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