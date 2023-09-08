import './App.css'
import Homepage from "./Components/homepage/homepage"
import Login from "./Components/login/login"
import Register from "./Components/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
function App() {

  const [ user, setLoginUser] = useState({})
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              true || user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>

          <Route exact path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>
         
          <Route exact path="/employeeHome">
            <Homepage />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;