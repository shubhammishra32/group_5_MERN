import React from "react"
import "./homepage.css"

const Homepage = (props) => {

    const handleLogOut = () => {
        //history.push('/login')
    }

    return (
        <div className="homepage">
            //navbar(Home,applied internships,my profile,logout)
            // company skills experience apply
            // form to apply internship


            

            <h1>Hello Homepage</h1>
            <div className="button" onClick={handleLogOut} >Logout</div>
        </div>
    )
}

export default Homepage