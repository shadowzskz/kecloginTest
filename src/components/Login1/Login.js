import React, { useState, useEffect, useRef } from 'react';
import './login.css';

import { NavLink } from 'react-router-dom';

import Line from '../UI/Line/Line';
import Button from '../UI/Button/Button';

import { AiFillEye, AiFillEyeInvisible, AiOutlineCheck } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import { BsCircle } from 'react-icons/bs'


const Login = () => {

    const nameRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [spassword, setSPassword] = useState(false);


    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, SetEmailFocus] = useState(false);

    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const email_regex = /^\w+([\.-]?\w+)*@\kec.edu.np/;
    const pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


    useEffect(() => {
        nameRef.current.focus();
    }, [])



    // useEffect(() => {
    //     setValidEmail(email_regex.test(email));
    // }, [email])

    // useEffect(() => {
    //     setValidPass(pass_regex.test(password));
    // }, [password])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [email, password])


    const loginData = async (e) => {
        e.preventDefault();
        const emailCheck = email_regex.test(email);
        const passCheck = pass_regex.text(password);

        if (!emailCheck || !passCheck) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
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

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

    }


    return (
        <>
            {
                success ? (
                    <div className='sucess'>
                        <h1>Success!</h1>
                        <p>
                            <a href="#">Sign In</a>
                        </p>
                    </div>
                ) : (
                    <div className="main">
                        <form className="main_container" onSubmit={loginData}>

                            <div className="field">
                                <div className="head">
                                    <img src="https://kec.edu.np/wp-content/uploads/2016/04/logo.png" alt="" className='logo' />
                                    <h1 className="text">
                                        Welcome
                                    </h1>
                                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                </div>


                                <div className="input_container">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        id="email"
                                        placeholder='Enter your email here'
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='input'
                                        autoComplete='off'
                                        aria-invalid={validEmail ? "false" : "true"}
                                        aria-describedby="msgEmail"
                                        onFocus={() => SetEmailFocus(true)}
                                        onBlur={() => SetEmailFocus(false)}
                                        required
                                    />
                                </div>


                                <div className="name_feild">
                                    <div className="row">
                                        <label htmlFor="name" className='labeltext'>
                                            Password:
                                            <AiOutlineCheck className={validPass ? "valid" : "hide"} />
                                            <RxCrossCircled className={validPass || !password ? "hide" : "invalid"} />
                                        </label>
                                    </div>
                                    <div className="input_row">
                                        <input
                                            type={!spassword ? "password" : "text"}
                                            name="password"
                                            value={password}
                                            placeholder='Enter your Password here'
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='input_pass'
                                            required
                                            aria-invalid={validPass ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPassFocus(true)}
                                            onBlur={() => setPassFocus(false)}
                                        />
                                        {!spassword ?
                                            <AiFillEyeInvisible className='check' color="white" onClick={() => setSPassword(!spassword)} />
                                            : <AiFillEye className='check' color="white" onClick={() => setSPassword(!spassword)} />
                                        }
                                    </div>
                                </div>
                            </div>




                            <div className="button_part">
                                <div className="button_container">
                                    <Button disabled={!validEmail || !validPass ? true : false} className="button">Login</Button>
                                </div>


                                <p style={{ padding: "none", margin: "10px" }}>Don't have an Account? </p>
                                <NavLink to="/register" style={({ isActive }) => ({
                                    color: isActive ? 'greenyellow' : 'white'
                                })}>
                                    Register
                                </NavLink>


                                <Line />
                            </div>
                            <div className="error">

                                <p id="msgEmail" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                    <h3>
                                        Email Must be of KEC Domain </h3>
                                </p>

                                <p id="pwdnote" className={password && !validPass ? "instructions" : "offscreen"}>

                                    Password not strong yet. Should includes <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>

                                <p ref={errRef} className={errMsg ? "err" : "none"}>{errMsg}</p>
                            </div>
                        </form>
                    </div>
                )
            }

        </>

    )
}

export default Login;