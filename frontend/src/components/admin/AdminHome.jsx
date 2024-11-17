import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');

   const [userName, setUserName] = useState('');


   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
   }, [navigate]);



   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <Navbar className="text-white" bg="dark" expand="lg">
            <Container fluid>
               <Navbar.Brand className="text-white" href="#">
                  Hi Admin {userName}
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="text-white me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('dashboard')}
                     >
                        Dashboard
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'UserInfo' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('UserInfo')}
                     >
                        User
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'Agent' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('Agent')}
                     >
                        Agent
                     </NavLink>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-danger">
                     Log out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <div className="content">
            {activeComponent === 'Agent' ? <AgentInfo /> : null}
            {activeComponent === 'dashboard' ? <AccordionAdmin /> : null}
            {activeComponent === 'UserInfo' ? <UserInfo /> : null}
         </div>
      </>
   )


};

export default AdminHome;


