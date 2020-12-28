import React, { useState } from 'react'
import {
  Container,
  Dropdown,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

import Home from "./home";

const Layout = () =>{
  
  const [visible,setVisible] = useState(false)
  return(
  <div className="h-full w-screen">
    
    <Menu fixed='top' inverted>
      <Menu.Item onClick={()=>setVisible(!visible)} ><Icon name="bars" /></Menu.Item>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
          Project Name
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='Dropdown'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    <Sidebar.Pushable as={Segment} inverted  style={{ overflow: 'hidden' }}>
        
      <Sidebar
        inverted
        as={Menu}
        animation='slide out'
        direction='left'
        visible={visible}
        vertical
        
      >
          <Menu.Item className="mt-12"><Icon name="home" />Home</Menu.Item>
          <Menu.Item><Icon name="calendar" />History</Menu.Item> 

      </Sidebar>
    

    <Sidebar.Pusher>
      <Segment inverted  attached="top">
        <div className="h-screen p-12 w-full">
          <Home></Home>
        </div>
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
    
    </div>
  )
  
}

export default Layout