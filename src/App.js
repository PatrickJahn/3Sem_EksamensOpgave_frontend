import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import WelcomePage from "./welcomePage";
import { Switch, Route, NavLink } from "react-router-dom";
import DogForm from "./dogAdd";
import UserDogs from "./UserDogs";
import Breeds from "./breeds";
import BreedDetails from "./breedDetails";
import AdminPage from "./adminpage";

function Header({ loggedIn, role }) {
  return (
    <div>
      <ul className="header">
       
        <li>
          <NavLink activeClassName="selected" to="/LoginPage">
           {loggedIn ? (<>Logout</>) : (<>Login</>)}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/Dogs">
            Dogs
          </NavLink>
        </li>

        {loggedIn && role == "user" && (
          <li>
          <NavLink activeClassName="selected" to="/MyDogs">
            My dogs
          </NavLink>
        </li>
        )}

        {loggedIn && role == "user"  && (
          <li>
          <NavLink activeClassName="selected" to="/AddDog">
            Add dog
          </NavLink>
        </li>
        )}

  {loggedIn && role == "admin" && (
          <li>
          <NavLink activeClassName="selected" to="/Admin">
            Admin
          </NavLink>
        </li>
        )}
      

      </ul>
    </div>
  );
}



function Home() {
  return <WelcomePage />;
}

function LoginPage({ setLoggedIn, loggedIn, setRole }) {
  const [loggedInError, setLoggedInError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => err.fullError)
      .then((data) => setLoggedInError(data));
  };

  if (loggedInError) {
    return (
      <div>
        <LogIn login={login} />
        <h3>{loggedInError.message}</h3>
      </div>
    );
  }

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn setRole={setRole}/>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn({setRole}) {
  const [dataFromServer, setDataFromServer] = useState("");
  const jwt = require("jsonwebtoken");
  const token = localStorage.getItem("jwtToken");
  const role = jwt.decode(token).roles;

  let roleToFetch = role;
  if (roleToFetch === "admin,user") {
    roleToFetch = "admin";
  }
  
  useEffect(() => {
    setRole(roleToFetch)
    facade.fetchData(roleToFetch).then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: {role}</h3>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState();


  return (
    <div>
      <Header loggedIn={loggedIn} role={role} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage setLoggedIn={setLoggedIn} setRole={setRole} loggedIn={loggedIn} />
        </Route>
        <Route exact path="/AddDog">  
          <DogForm />       
        </Route>
        <Route exact path="/MyDogs">  
          <UserDogs />       
        </Route>
        <Route exact path="/Dogs">  
          <Breeds />       
        </Route>

        <Route  path="/dogbreed/">  
          <BreedDetails />       
        </Route>

        <Route exact path="/admin">  
          <AdminPage />       
        </Route>
       
      </Switch>
    </div>
  );
}
export default App;
