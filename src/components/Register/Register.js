import React, { useState, useEffect, useRef } from 'react';
import './Register.css';

import { NavLink } from 'react-router-dom';

import Line from '../UI/Line/Line';
import Button from '../UI/Button/Button';

import { AiFillEye, AiFillEyeInvisible, AiOutlineCheck } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import { BsCircle } from 'react-icons/bs'


const Register = () => {

    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();
    const [spassword, setSPassword] = useState(false);
    const [scpassword, setSCPassword] = useState(false);

    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);


    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, SetEmailFocus] = useState(false);

    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);


    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const name_regex = /^[A-z][A-z0-9-_]{3,23}$/;
    const email_regex = /^\w+([\.-]?\w+)*@\kec.edu.np/;
    const pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


    useEffect(() => {
        nameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(name_regex.test(name));
    }, [name])

    useEffect(() => {
        setValidEmail(email_regex.test(email));
    }, [email])

    useEffect(() => {
        setValidPass(pass_regex.test(password));
        setValidMatch(password === cPassword);
    }, [password, cPassword])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, cPassword])


    const registerData = async (e) => {
        e.preventDefault();
        const userCheck = name_regex.test(name);
        const passCheck = pass_regex.text(password);

        if (!userCheck || !passCheck) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/register', {
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
                        <form className="main_container" onSubmit={registerData}>

                            <div className="field">
                            <div className="head">
                                <img src="https://kec.edu.np/wp-content/uploads/2016/04/logo.png" alt="" className='logo' />
                                <h1 className="text">
                                    Welcome
                                </h1>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            </div>
                            <div className="name_feild">
                                <div className="row">
                                    <label htmlFor="name" className='labeltext'>
                                        name:
                                        <AiOutlineCheck className={validName ? "valid" : "hide"} />
                                        <RxCrossCircled className={validName || !name ? "hide" : "invalid"} />
                                    </label>
                                </div>
                                <div className="input_container">
                                    <input
                                        className="input"
                                        type="text"
                                        id="username"
                                        ref={nameRef}
                                        autoComplete="off"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        placeholder="Enter your name here"
                                    />
                                </div>
                            </div>

                            <div className="name_feild">
                                <div className="row">
                                    <label htmlFor="name" className='labeltext'>
                                        Email:
                                        <AiOutlineCheck className={validEmail ? "valid" : "hide"} />
                                        <RxCrossCircled className={validEmail || !email ? "hide" : "invalid"} />
                                    </label>
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
                            <div className="name_feild">
                                <div className="row">
                                    <label htmlFor="name" className='labeltext'>
                                        Confrim Password:
                                        <AiOutlineCheck className={validMatch ? "valid" : "hide"} />
                                        <RxCrossCircled className={validMatch || !cPassword ? "hide" : "invalid"} />
                                    </label>
                                </div>

                                <div className="input_row">
                                    <input
                                        type={!scpassword ? "password" : "text"}
                                        name="cpassword"
                                        value={cPassword}
                                        placeholder='Enter your Password here'
                                        onChange={(e) => setCPassword(e.target.value)}
                                        className='input_pass'
                                        required
                                        aria-invalid={validPass ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    {!scpassword ?
                                        <AiFillEyeInvisible className='check' color="white" onClick={() => setSCPassword(!scpassword)} />
                                        : <AiFillEye className='check' color="white" onClick={() => setSCPassword(!scpassword)} />
                                    }
                                </div>
                            </div>
                            

                       
                            </div>
                            <div className="button_part">
                            <div className="button_container">
                            <Button disabled={!validName || !validPass || !validMatch ? true : false} className="button">Register</Button>
                        </div>


                        <p style={{ padding: "none", margin: "10px" }}>Don't have an Account? </p>
                        <NavLink to="/" style={({ isActive }) => ({
                            color: isActive ? 'greenyellow' : 'white'
                        })}>
                            Login
                        </NavLink>


                        <Line />
                            </div>
                            <div className="error">
                                <p id="uidnote" className={userFocus && name && !validName ? "instructions" : "offscreen"}>
                                    <BsCircle />
                                    Invalid username
                                </p>
                                <p id="msgEmail" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <h3>
                                    Email Must be of KEC Domain </h3>
                            </p>

                        <p id="pwdnote" className={password && !validPass ? "instructions" : "offscreen"}>
                            
                            Password not strong yet. Should includes <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            
                            Must match the first password input field.
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

export default Register