import React from "react";
import UnalCanvas from "./Components/UnalTemplate/UnalCanvas";
import Home from "./Views/Home/Home";
import ReactDOM from "react-dom";
import MaterialUiTheme from "./material_theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { register } from "./serviceWorker";
ReactDOM.render(
  <ThemeProvider theme={MaterialUiTheme}>
    <BrowserRouter basename="/tpi-expoideas">
      <UnalCanvas>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </UnalCanvas>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
register();
