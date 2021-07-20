import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        await axios.post('http://localhost:4000/login', {
            username,
            password
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            // console.log(res.data);
            if (res.data === "logged in") {
                window.location.href = "/"
            }
        }, () => {
            console.log("Failure");
        })
    }

    // const getUser = () => {
    //     axios.get("http://localhost:4000/user", {
    //         withCredentials: true
    //     }).then(res => {
    //         console.log(res.data);
    //     })
    // }

    return (
        <div className="login">
            <h1>Login</h1>
            <input className="login" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
            <br/>
            <input className="login" type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br/>
            <button className="login" onClick={login}>Login</button>
            {/* <button onClick={getUser}>Get User that's logged in</button> */}
        </div>
    )
}
