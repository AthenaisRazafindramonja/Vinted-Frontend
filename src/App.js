import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  console.log(userToken);
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 5 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  return (
    <div>
      <Router>
        <Header userToken={userToken} setUser={setUser} />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/publish">
            <Publish userToken={userToken} />
          </Route>
          <Route path="/">
            <Hero />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
