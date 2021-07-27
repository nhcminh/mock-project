import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./components/Login";
import Home from "./components/Home";
// import PrivateRoute from "./HOC/PrivateRoute";
import AuthRoute from "./HOC/AuthRoute";
import PageNotFound from "./components/PageNotFound";
import LoadingSpinner from "./HOC/LoadingSpinner";
import "./Scss/style.scss";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [isLoading]);
  return (
    <div className="App">
      {isLoading ? <LoadingSpinner /> : null}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/news" />
          </Route>
          <Route exact path="/news" component={Home} />
          <AuthRoute exact component={Login} path="/login" />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
