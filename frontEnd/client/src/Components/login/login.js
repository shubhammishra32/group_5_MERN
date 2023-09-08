import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"


const Login = ({ setLoginUser}) => {

    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            console.log("rrr",res,res.data.message,res.data.message.includes("login"))
            alert(res.data.message)
            if(res.data.message.includes("Login")){
                setLoginUser(res.data.user)
                history.push("/employeeHome");
                window.location.reload();
            }
        })
    }

    const handleRegister = () => {
           history.push('/register');
           window.location.reload()
    }

    
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button"  onClick={handleRegister}>Register</div>
            

        </div>
    )
}

export default Login