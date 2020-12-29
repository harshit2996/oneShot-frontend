import React, { useState } from 'react'
import {  
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "../pages/home";
import Colleges from "../pages/colleges";
import Students from "../pages/students";

const Layout = () =>{
  
  const [visible,setVisible] = useState(false)
  return(
    <Router>
      <div className="h-full w-full">  
        <Menu inverted fixed="top" className="flex" >
          <Menu.Item onClick={() =>setVisible(!visible) } >
            <Icon name="sidebar" /><div>Menu</div>
          </Menu.Item >  
          <Menu.Item><Link to="/"><Icon name="home" /><div>Home</div></Link> </Menu.Item>
          <Menu.Item><Link to="/students"><Icon name="student" /><div>Students</div></Link> </Menu.Item>
          <Menu.Item><Link to="/colleges"><Icon name="building" /><div>Colleges</div></Link> </Menu.Item>        
        </Menu>
        {/* <Sidebar.Pushable as={Segment} attached="bottom" inverted style={{minHeight:"100vh"}} > */}
      <Sidebar as={Menu} animation='overlay' onHide={() => setVisible(false)} visible={visible} vertical inverted icon="labeled">
          <Menu.Item onClick={() =>setVisible(!visible) } >
            <Icon name="sidebar" /><div>Menu</div>
          </Menu.Item >  
          <Menu.Item><Link to="/"><Icon name="home" /><div>Home</div></Link> </Menu.Item>
          <Menu.Item><Link to="/students"><Icon name="student" /><div>Students</div></Link> </Menu.Item>
          <Menu.Item><Link to="/colleges"><Icon name="building" /><div>Colleges</div></Link> </Menu.Item> 
      </Sidebar>       
      {/* <Sidebar.Pusher>
        <div className="min-h-screen">
          <Home></Home>
        </div>
      </Sidebar.Pusher> */}
    {/* </Sidebar.Pushable> */}
      
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/students">
            <Students/>
          </Route>
          <Route path="/colleges">
            <Colleges />
          </Route>
        </Switch>

      </div>
    </Router>
  )
  
}

export default Layout