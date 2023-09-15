import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveText } from "../Redux/UserActions.js"

export default function NavBarComponent() {


  const [currentUser, setCurrentUser] = useState('');
  const [searchText, setSearchText] = useState('');


  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let u = localStorage.getItem('user');
    setCurrentUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    //localStorage.setItem('search', JSON.stringify({searchText:searchText}))
    dispatch(saveText(searchText))
  }, [searchText])

  const handleLogout = () => {
    // history.push('/login');    
    window.location.reload();
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <>
      {currentUser && <nav className="navbar fixed-top navbar-expand-lg navbar-light " style={{ backgroundColor: '#8626c3', paddingLeft: '40px' }}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {currentUser?.type === "candidate" &&
          <a className="navbar-brand" style={{ color: 'white' }} href="/candidateHomePage">List of Intenships</a>
        }

        {currentUser?.type === "mentor" &&
          <a className="navbar-brand" style={{ color: 'white' }} href="/mentorHomePage">List of Intenships</a>
        }

        {currentUser?.type === "candidate" &&
          <a className="navbar-brand" style={{ color: 'white' }} href="/appliedInternships">Applied Internships</a>
        }


        {currentUser?.type === "mentor" &&
          <a className="navbar-brand" style={{ color: 'white' }} href="/createInternShip">Create Internship</a>
        }

        {/* <a className="navbar-brand" style={{ color: 'white' }} onClick={handleLogout}>Logout</a> */}
        <form className="form-inline my-2 my-lg-0">
          <input onChange={e => setSearchText(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search Profile" aria-label="Search" />
        </form>

        <h1 style={{ marginLeft: '20px', color: 'deepskyblue', fontFamily: 'Merienda' }}>{`Welcome ${currentUser?.name}`}</h1>
        <br />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a style={{ marginLeft: '100px', color: 'white' }} className="navbar-brand" onClick={handleLogout}>Logout</a>



      </nav>}


    </>
  )
}
