import React, { useEffect, useState } from 'react'

export default function NavBarComponent() {


  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    let u = localStorage.getItem('user');
    setCurrentUser(JSON.parse(u));
    console.log("uuu", u, JSON.parse(u))
  }, []);

  const handleLogout = () => {
    // history.push('/login');    
    window.location.reload();
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light " style={{ backgroundColor: '#8626c3' }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" style={{ color: 'white' }} href="/candidateHomePage">List of Intenships</a>

        {currentUser?.type === "mentor" &&
          <a className="navbar-brand" style={{ color: 'white' }} href="/createInternShip">Create Internship</a>
        }
        <a className="navbar-brand" style={{ color: 'white' }} onClick={handleLogout}>Logout</a>




      </nav>
    </>
  )
}
