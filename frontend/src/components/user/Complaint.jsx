import axios from 'axios'
import React, { useState } from 'react'

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'))
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target
      setUserComplaint({ ...userComplaint, [name]: value })
   }

   const handleClear = () => {
      setUserComplaint({
         userId: '',
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: '',
         comment: ''
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const user = JSON.parse(localStorage.getItem('user'))
      const { _id } = user
      axios.post(`http://localhost:8000/Complaint/${_id}`, userComplaint)
         .then(res => {
            JSON.stringify(res.data.userComplaint)
            alert("Your Complaint has been send!!")
            handleClear()
         })
         .catch(err => {
            console.log(err)
            alert("Something went wrong!!")
         })
   }
   return (
      <>
         <div className="text-white complaint-box">
            <form onSubmit={handleSubmit} className="compliant-form row bg-dark ">

               <div className="col-md-6 p-3 p-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" id="name" required />
               </div>
               <div className="col-md-6 p-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" id="address" required />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" id="city" required />
               </div>
               <div className="col-md-6 p-3">
                  <label htmlFor="state" className="form-label">State</label>
                  <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" id="state" required />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="pincode" className="form-label">Pincode</label>
                  <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="text" className="form-control" id="pincode" required />
               </div>
               
               {/* <div className="col-md-6 p-3">
                  <label htmlFor="file" className="form-label">Document</label>
                  <input name="file" type="file" className="form-control" id="file" required />
               </div> */}

               <div className="col-md-6 p-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <input placeholder='type pending' name="status" onChange={handleChange} value={userComplaint.status} type="text" className="form-control" id="pincode" required />
               </div>


               <label className=" p-3form-label text-light" htmlFor="comment">Descrption</label>
               <div className="form-floating">
                  <textarea name="comment" onChange={handleChange} value={userComplaint.comment} className="form-control" required></textarea>
               </div>
               <div className="text-center p-1 col-12">
                  <button type="submit" onClick={handleSubmit} className="mt-2 btn btn-success">Register</button>
               </div>
            </form>
         </div>
      </>
   )
}

export default Complaint
