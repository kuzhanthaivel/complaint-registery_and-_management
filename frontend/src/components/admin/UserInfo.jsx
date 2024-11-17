import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Footer from '../common/FooterC'

import axios from 'axios';

const UserInfo = () => {
   const navigate = useNavigate();
   const [ordinaryList, setOrdinaryList] = useState([]);
   const [toggle, setToggle] = useState({})

   // const [count, setCount] = useState(0)

   const [updateUser, setUpdateUser] = useState({
      name: '',
      email: '',
      phone: '',
   })

   const handleChange = (e) => {
      setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (user_id) => {
      if (updateUser === "") {
         alert("atleast 1 fields need to be fill")
      }
      else {
         window.confirm("Are you sure you want to Update the user?");
         axios.put(`http://localhost:8000/user/${user_id}`, updateUser)
            .then((res) => {
               alert(`user updated successfully`)
               JSON.stringify(res.data)
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }

   useEffect(() => {
      const getOrdinaryRecords = async () => {
         try {
            const response = await axios.get('http://localhost:8000/OrdinaryUsers');
            const ordinary = response.data;
            setOrdinaryList(ordinary)
         } catch (error) {
            console.log(error);
         }
      };
      getOrdinaryRecords();
   }, [navigate]);

   const deleteUser = async (userId) => {
      try {
         const confirmed = window.confirm("Are you sure you want to delete the user?");
         if (confirmed) {
            await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
            setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
         }
      } catch (error) {
         console.log(error);
      }
   }

   const handleToggle = (complaintId) => {
      setToggle((prevState) => ({
         ...prevState,
         [complaintId]: !prevState[complaintId],
      }));
   };

   return (
      <>
         <div className="body">

            <Container>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {ordinaryList.length > 0 ? (
                        ordinaryList.map((user) => {
                           const open = toggle[user._id] || false;

                           return (
                              <tr key={user._id}>
                                 <td>{user.name}</td>
                                 <td>{user.email}</td>
                                 <td>{user.phone}</td>
                                 <td><Button onClick={() => handleToggle(user._id)}
                                    aria-controls={`collapse-${user._id}`}
                                    aria-expanded={open}
                                    className='mx-2'
                                    variant="outline-warning">
                                    Update
                                 </Button>
                                    <Collapse in={open}>
                                       <Form onSubmit={() => handleSubmit(user._id)} className='p-5'>
                                          <Form.Group className="mb-3" controlId="formBasic">
                                             <Form.Label>Full Name </Form.Label>
                                             <Form.Control name='name' value={updateUser.name} onChange={handleChange} type="text" placeholder="Enter name" />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formBasicEmail">
                                             <Form.Label>Email address</Form.Label>
                                             <Form.Control name='email' value={updateUser.email} onChange={handleChange} type="email" placeholder="Enter email" />
                                          </Form.Group>

                                          <Form.Group className="mb-3" controlId="formBasicTel">
                                             <Form.Label>Phone</Form.Label>
                                             <Form.Control name='phone' value={updateUser.phone} onChange={handleChange} type="tel" placeholder="Enter Phone no." />
                                          </Form.Group>

                                          <Button size='sm' variant="outline-success" type="submit">
                                             Submit
                                          </Button>
                                       </Form>
                                    </Collapse>
                                    <Button onClick={() => deleteUser(user._id)} className='mx-2' variant="outline-danger">Delete</Button></td>
                              </tr>
                           )
                        })
                     ) : (
                        <Alert variant="info">
                           <Alert.Heading>No Users to show</Alert.Heading>
                        </Alert>
                     )}
                  </tbody>
               </Table>
            </Container>
         </div>
            <Footer />
      </>
   )
}
export default UserInfo