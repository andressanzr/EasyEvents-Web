import React from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import EventInfo from "./components/EventInfo";
import { Route, BrowserRouter } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import UpdateEvent from "./components/UpdateEvent";
import PasswordReset from "./components/PasswordReset";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/crearevento" component={CreateEvent} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route exact path="/infoevento/:id" component={EventInfo} />
        <Route exact path="/updateevent" component={UpdateEvent} />
      </BrowserRouter>
    </div>
  );
}

export default App;
