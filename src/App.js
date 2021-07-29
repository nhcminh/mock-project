import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./HOC/PrivateRoute";
import AuthRoute from "./HOC/AuthRoute";
import PageNotFound from "./components/PageNotFound";
import MainLayout from "./HOC/MainLayout";
import Login from "./components/Login";
import Home from "./components/Home";
import Details from "./components/Details";
import News from "./components/News";
import "antd/dist/antd.css";
import "./Scss/style.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/news" />
            </Route>
            <Route path="/news" exact component={News} />
            <Route path="/home" exact component={Home} />
            <PrivateRoute path="/details/:name" exact component={Details} />
            <AuthRoute path="/login" exact component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
