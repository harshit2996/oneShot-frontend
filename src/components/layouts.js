import React, { useState } from 'react'
import {
  Container,
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
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
    <div className="h-full w-full">  
  <Menu inverted fixed="top" className="">
    <Menu.Item onClick={() =>setVisible(!visible) } >
      <Icon name="sidebar" />Menu
    </Menu.Item>          
  </Menu>
  <Sidebar.Pushable as={Segment} attached="bottom" inverted style={{minHeight:"100vh"}} >
    <Sidebar as={Menu}  animation="scale down" visible={visible} vertical inverted icon="labeled">
      <Menu.Item><Icon name="home" />Home</Menu.Item>
      <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
      <Menu.Item><Icon name="smile" />Friends</Menu.Item>
      <Menu.Item><Icon name="calendar" />History</Menu.Item>    
    </Sidebar>
    <Sidebar.Pusher>
      <div className="min-h-screen">
        <Home></Home>
      </div>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
  </div>
  )
  
}

export default Layout