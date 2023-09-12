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
            console.log("rrr",res,res.data.data.userData[0])
            alert(res.data.status)
            if(res.data.status?.includes("Login")){
                setLoginUser(res.data.user)
                 localStorage.setItem('user', JSON.stringify({...res.data.data.userData[0], type:res.data.type}))

                history.push("/candidateHomePage");
               // window.location.reload();
            }
        })
    }

    const mentorlogin = () => {
        console.log("ooo",user)
        axios.post("http://localhost:9002/mentorlogin", user)
        .then(res => {
            console.log("rrr",res,res.data.data.mentorData[0])
            alert(res.data.status)
            if(res.data.status?.includes("success")){
                setLoginUser(res.data.user)
                 localStorage.setItem('user', JSON.stringify({...res.data.data.mentorData[0], type:res.data.type}))

                history.push("/mentorHomePage");
                window.location.reload();
            }
        })
    }

    const handleRegister = () => {
           history.push('/register');
           window.location.reload()
    }

    
    return (
        <div className="login" style={{marginTop:'146px', marginLeft:'480px'}}>
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button"  onClick={handleRegister}>Register</div>
            <div className="button"  onClick={mentorlogin}>Log in as Mentor</div>

            

        </div>
    )
}

export default Login