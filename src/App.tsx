import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Share from "./pages/Share";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/share">
            <Share />
          </Route>
        </Switch>
      </Router>
      <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-database.js"></script>
      <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>
    </div>
  );
}

export default App;
