import './App.css'
import Login from "./Components/login/login"
import Register from "./Components/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import CandidateHomePage from "./Components/CandidateHomePage";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import NavBarComponent from "./Components/NavBarComponent";
import MentorHomePage from './Components/MentorHomePage';
import InternShipDetails from './Components/InternShipDetails';
import ListOfAppliedIntenships from './Components/ListOfAppliedIntenships';
import ListOfAppliedCandidates from './Components/ListOfAppliedCandidates';

function App() {

  const [ user, setLoginUser] = useState({})
  return (
    <div className="App">
      <NavBarComponent/>
      {console.log("lll",user)}
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id  && user?.type == "candidate" ? 
                <CandidateHomePage setLoginUser={setLoginUser} /> 
                  : 
                user?.type == "mentor" ?
                <MentorHomePage setLoginUser={setLoginUser} /> 
                  :
                <Login setLoginUser={setLoginUser}/>
            }
          </Route>

          <Route exact path="/login">
            <Login setLoginUser={setLoginUser}/>
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

        </Switch>
      </Router>
    </div>
  );
}

export default App;