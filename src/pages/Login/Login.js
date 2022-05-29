import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const handleLogin = (username, password, navigate, setIsAuthed) => {
    if (username === 'user' && password === 'password') {
        sessionStorage.setItem('role', 'user');
        sessionStorage.setItem('userId', 'userId');
        sessionStorage.setItem('authenticated', true);
        navigate('/');
        setIsAuthed(true)
        return;
    }
    if (username === 'admin' && password === 'password') {
        sessionStorage.setItem('role', 'admin');
        sessionStorage.setItem('authenticated', true);
        navigate('/bookManagement');
        setIsAuthed(true)
        return; 
    }
}

const Login = ({setIsAuthed}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');

    return(
        <div style={{'display': 'flex', 'flexDirection': 'column', 'width': '100px'}}>
            <input id="username" onChange={(e) => setUsername(e.target.value)}></input>
            <input id="password" onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={() => handleLogin(username, password, navigate, setIsAuthed)}>submit</button>
        </div>
    )
}

export default Login;