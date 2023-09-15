import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"


const Login = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }




    const login = () => {
        if (!user.email.length || !user.password) {
            alert("Please fill all fields first")
        }
        else {
            if(user?.email?.includes("@infosys")){
                alert("Invalid Credentials")
            }
            else{
            axios.post("http://localhost:9002/login", user)
                .then(res => {
                    alert(res.data.status)
                    if (res.data.status?.includes("Login")) {
                        localStorage.setItem('user', JSON.stringify({ ...res.data.data.data, type: res.data.type }))

                        history.push("/candidateHomePage");
                        window.location.reload();
                    }
                    else{
                        alert("invalid credentials")
                    }
                })
            }
        }
    }

    const mentorlogin = () => {
        if (!user.email.length || !user.password) {
            alert("Please fill all fields first")
        }
        else {
        axios.post("http://localhost:9002/mentorlogin", user)
            .then(res => {
                alert("Logged in Successfully")
                if (res.data.status?.includes("success")) {
                    localStorage.setItem('user', JSON.stringify({ ...res.data.data.mentorData[0], type: res.data.type }))
                    history.push("/mentorHomePage");
                    window.location.reload();
                }
            })
        }
    }

    const handleRegister = () => {
        history.push('/register');
        window.location.reload()
    }


    return (
        <form className="register" style={{ marginTop: '146px', marginLeft: '480px' }}>
            <h1>Login</h1>
            <input required type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" />
            <div className="button" onClick={login}>Login as Candidate</div>
            <div className="button" onClick={mentorlogin}>Log in as Mentor</div>
            <div>or</div>
            <div className="button" onClick={handleRegister}>Register</div>
        </form>
    )
}

export default Login