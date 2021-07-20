import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';



export default function Register() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    let history = useHistory();
    
    const register = () => {
        axios.post('http://localhost:4000/register', {
            username,
            password
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            // console.log(res.data);
            if (res.data === "registered") {
                setUsername("");
                setPassword("");
                // window.location.href = "/login"
                
                history.push('/login');
        }
        })
    }
    
    return (
        <div className="login">
            <h1>Register</h1>
            <input className="login" type="text" value={username} placeholder="username" onChange={e => setUsername(e.target.value)} />
            <br/>
            <input className="login" type="text" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} />
            <br/>
            <button className="login" onClick={register}>Register</button>
        </div>
    )
}