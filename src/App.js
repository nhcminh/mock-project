import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./HOC/PrivateRoute";
import AuthRoute from "./HOC/AuthRoute";
import PageNotFound from "./components/PageNotFound";
import LoadingSpinner from "./HOC/LoadingSpinner";
import "./Scss/style.scss";
import Details from "./components/Details";
import MainLayout from "./HOC/MainLayout";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const onLoadingCb = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);
  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/news" />
            </Route>
            <Route exact path="/news" component={Home} />
            <PrivateRoute exact component={Details} path="/details/:name" />
            <AuthRoute
              exact
              component={Login}
              onLoadingCb={onLoadingCb}
              path="/login"
            />
            <Route component={PageNotFound} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
