import React, { useState } from 'react';
import './Register.scss';

import { NavLink } from 'react-router-dom';

import Line from '../UI/Line/Line';
import Button from '../UI/Button/Button';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';



const Register = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();

    const [ spassword, setSPassword ] = useState(false);
    const [ scpassword, setSCPassword ] = useState(false);



    const loginData = async (event) => {
        event.preventDefault();
        console.log(email, password)

        if (email && password) {
            if (email.includes('@')) {
                console.log(email)
                if (password < 6) {

                    alert("Password greater than 6 letters")
                }
            }
            else {
                alert("Invalid Email format")
            }
        }

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json();
        console.log(data);

        if (data.user) {
            alert('Login Sucessful');

        } else {
            alert("Add correct Details")
        }

        setName('');
        setPassword('');

    }

    return (
        <div className="main">
            <form className="main_container" onSubmit={loginData}>

                <div className="head">
                    <img src="https://kec.edu.np/wp-content/uploads/2016/04/logo.png" alt="" className='logo' />
                    <h1 className="text">
                        Welcome
                    </h1>
                </div>

                <div className="input_container">
                    <input type="text" name="name" value={name} id="email" placeholder='Enter your email here' onChange={(e) => setName(e.target.value)} className='input' />
                    <input type="email" name="email" value={email} id="email" placeholder='Enter your email here' onChange={(e) => setEmail(e.target.value)} className='input' />
                    
            
                    <div className="input_wrapper">
                        <input type={!spassword ? "password" : "text" } name="password" value={password} placeholder='Enter your Password here' onChange={(e) => setPassword(e.target.value)} className='password_input' />
                        {!spassword ? 
                            <AiFillEyeInvisible className='check'  color="white" onClick={() => setSPassword(!spassword)}/>
                             : <AiFillEye className='check'  color="white" onClick={() => setSPassword(!spassword)}/>
                             }
                    </div> 

                    <div className="input_wrapper">
                        <input type={!scpassword ? "password" : "text" } name="Password" value={cPassword} placeholder='Enter your Password here' onChange={(e) => setCPassword(e.target.value)} className='password_input' />
                        {!spassword ? 
                            <AiFillEyeInvisible className='check'  color="white" onClick={() => setSCPassword(!scpassword)}/>
                             : <AiFillEye className='check'  color="white" onClick={() => setSCPassword(!scpassword)}/>
                             }
                    </div>                     

                </div>

                <div className="button_container">
                    <Button>Register</Button>
                </div>


                <p style={{ padding: "none", margin: "10px" }}>Have an Account? </p>
                <NavLink to="/" style={({ isActive }) => ({
                    color: isActive ? 'greenyellow' : 'white'
                })}>
                    Login
                </NavLink>


                <Line />

                <a href="#" style={{ padding: "none", margin: "10px", textDecoration: "none", color: "black" }}>Forgot Password?</a>


            </form>

        </div>
    )
}

export default Register