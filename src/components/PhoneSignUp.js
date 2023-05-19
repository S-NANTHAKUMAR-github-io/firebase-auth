// import React,{useState} from 'react'
// import { Button, Form } from 'react-bootstrap'
// import {Link} from 'react-router-dom'


// const PhoneSign = () => {
//     const [number, setNumber] = useState("")

//     const getOtp = (e) => {
//         e.preventDefault();
//         console.log(Number);
//     }
//     return (
//         <div>

//                 <div className="p-4 box">
//                     <h2 className="mb-3">Phone Auth</h2>
//                     {/* {Error && <Alert variant="danger">{Error}</Alert>} */}
//                     <Form onSubmit={getOtp}>
//                         <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
//                             <PhoneInput
//                             value={number}
//                             onChange={setNumber}
//                             placeholder='Enter Phone Number'
//                              />
//                         </Form.Group>
//                     </Form>
//                     <div className='button-right'>
//                         <Link to="/">
//                         <Button variant="secondary">Cancel</Button> &nbsp;
//                         </Link>
//                         <Button variant="primary" type='submit'>Send OTP</Button>

//                     </div>
//                 </div>

//         </div>
//     )
// }

// export default PhoneSign


import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Link } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext';

const PhoneSignUp = () => {
  const [number, setnumber] = useState("")
  const [error, seterror] = useState("")
  const {setUpRecaptha} = useUserAuth();


  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    seterror("");
    if(number === "" || number === undefined)
      return seterror("Please enter a valid Phone Number!");
    try{
      const response = await setUpRecaptha(number);
      console.log(response);
    }
    catch(error){
      seterror(error.message);
    }
    console.log(number);
  }
  

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Phone Auth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput
              defaultCountry='IN'
              value={number}
              onChange={setnumber}
              placeholder="Enter Phone Number"
            />
            <div id='recaptcha-container'></div>
          </Form.Group>
          <div className='button-right'>
            <Link to='/'>
              <Button variant='secondary'>Cancel</Button> &nbsp;
            </Link>
            <Button variant='primary' type='submit'>Send OTP</Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default PhoneSignUp