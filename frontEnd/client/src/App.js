import './App.css'
import Login from "./Components/login/login"
import Register from "./Components/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import CandidateHomePage from "./Components/CandidateHomePage";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBarComponent from "./Components/NavBarComponent";
import MentorHomePage from './Components/MentorHomePage';
import InternShipDetails from './Components/InternShipDetails';
import ListOfAppliedCandidates from './Components/ListOfAppliedCandidates';
import store from './store';
import { Provider } from 'react-redux';
import AppliedInternships from './Components/AppliedInternships';

function App() { 

  const [ user, setLoginUser] = useState({})
  const [arr, setarr] = useState([]);

  useEffect(()=>{
    let u = localStorage.getItem('user');
    let employee = JSON.parse(u)
    arr.push(employee);  
    if(arr.length <2)
    setLoginUser(employee)
  })

  return (
    <Provider store={store}> 
    <div className="App" style={{backgroundColor:'ghostwhite'}}>
      <NavBarComponent/>
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id  && user?.type == "candidate" ? 
                <CandidateHomePage  /> 
                  : 
                user?.type == "mentor" ?
                <MentorHomePage /> 
                  :
                <Login />
            }
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>                   

          <Route exact path="/candidateHomePage">
            <CandidateHomePage/>
          </Route>

          <Route exact path="/mentorHomePage">
            <MentorHomePage/>
          </Route>          

          <Route exact path="/createInternShip">
            <InternShipDetails/>
          </Route>

          <Route exact path="/list">
            <ListOfAppliedCandidates/>
          </Route> 

          <Route exact path="/appliedInternships">
            <AppliedInternships/>
          </Route>          

        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;