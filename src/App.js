import React from "react";

import Home from "./components/Home";
import EventInfo from "./components/EventInfo";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import CreateEvent from "./components/CreateEvent";
import NotFound from "./components/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/crearevento" component={CreateEvent} />
        <Route exact path="/infoevento/:id" component={EventInfo} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
