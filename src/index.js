import React from "react";
import UnalCanvas from "./Components/UnalTemplate/UnalCanvas";
import Home from "./Views/Home/Home";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { register } from "./serviceWorker";
ReactDOM.render(
  <BrowserRouter basename="/tpi-expoideas">
    <UnalCanvas>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </UnalCanvas>
  </BrowserRouter>,
  document.getElementById("root")
);
register();
