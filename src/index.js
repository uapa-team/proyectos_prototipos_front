import React from "react";
import UnalCanvas from "./Components/UnalTemplate/UnalCanvas";
import Home from "./Views/Home/Home";
import Video from "./Views/Video/Video";
import ReactDOM from "react-dom";
import MaterialUiTheme from "./material_theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { unregister } from "./serviceWorker";
ReactDOM.render(
  <ThemeProvider theme={MaterialUiTheme}>
    <BrowserRouter basename="/primiferia_bienestar">
      <UnalCanvas>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/video/:id" component={Video} />
        </Switch>
      </UnalCanvas>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
unregister();
