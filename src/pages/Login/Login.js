import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAstronaut } from 'react-icons/fa';
import './Login.css'

const handleLogin = (username, password, navigate, setIsAuthed) => {
    if (username === 'user' && password === 'root') {
        sessionStorage.setItem('role', 'user');
        sessionStorage.setItem('userId', 'userId');
        sessionStorage.setItem('authenticated', true);
        navigate('/');
        setIsAuthed(true)
    }
    else if (username === 'admin' && password === 'root') {
        sessionStorage.setItem('role', 'manager');
        sessionStorage.setItem('authenticated', true);
        navigate('/bookManagement');
        setIsAuthed(true)
    }
    else if( username !== '' && password !== '') {
        alert("Incorrect username and password. \n\nTips: Try user/root or admin/root :)")
    }
}

const Login = ({ setIsAuthed }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');

    return (
        <div className="login-wrapper">
            <form className="form" autoComplete="off">
                <FaUserAstronaut size="50" />
                <h2>Login</h2>
                <div className="input-group">
                    <input type="text" id="loginUser" required
                        onChange={(e) => setUsername(e.target.value)}></input>
                    <label htmlFor="loginUser">User Name</label>
                </div>
                <div className="input-group">
                    <input type="password" id="loginPassword" required
                        onChange={(e) => setPassword(e.target.value)}></input>
                    <label htmlFor="loginPassword">Password</label>
                </div>
                <input type="submit" value="Login" className="submit-btn"
                    onClick={() => handleLogin(username, password, navigate, setIsAuthed)}></input>
            </form>
        </div>
    )
}

export default Login;