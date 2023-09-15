import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {

        const { name, email, password, reEnterPassword } = user

        if (!name || !email || !password || !reEnterPassword) {
            alert("Plear fill all fields")
        }
        else {
            if (name && email && password && (password === reEnterPassword)) {
                axios.post("http://localhost:9002/register", user)
                    .then(res => {
                        console.log("re",res)
                        alert(res.data.message)
                        history.push("/login")
                        window.location.reload()
                    })
                    .catch(error => {
                        alert(error?.response?.data?.data?.message)
                     })
            } else {
                alert("Passwwords do not match")
            }
        }

    }

    const handleLogin = () => {
        history.push('/login');
        window.location.reload()
    }

    return (
        <div className="register" style={{ marginTop: '146px', marginLeft: '480px' }}>
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={handleLogin}>Login</div>


        </div>
    )
}

export default Register