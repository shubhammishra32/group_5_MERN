import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"


const MentorLogin = ({ setLoginUser}) => {

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
            alert(res.data.status)
            if(res.data.status?.includes("Login")){
                 localStorage.setItem('user', JSON.stringify({...res.data.data.userData[0], type:res.data.type}))

                history.push("/candidateHomePage");
                window.location.reload();
            }
        })
    }

    const mentorlogin = () => {
        axios.post("http://localhost:9002/mentorlogin", user)
        .then(res => {
            alert(res.data.status)
            if(res.data.status?.includes("Login")){
                 localStorage.setItem('user', JSON.stringify({...res.data.data.userData[0], type:res.data.type}))

                history.push("/candidateHomePage");
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
            <div className="button" onClick={login}>Login as Candidate</div>
            <div className="button"  onClick={mentorlogin}>Log in as Mentor</div> 
            <div>or</div>
            <div className="button"  onClick={handleRegister}>Register</div>

            

        </div>
    )
}

export default MentorLogin