import React from "react";
import { Redirect, Route } from "react-router-dom";

function AuthRoute({ component: Component, ...rest }) {
  !localStorage.getItem("ac") &&
    localStorage.setItem(
      "ac",
      JSON.stringify([{ email: "admin@admin", password: "admin" }])
    );
  const checkToken = () => {
    return JSON.parse(localStorage.getItem("isLogin"));
  };
  return (
    <Route
      {...rest}
      render={(props) => {
        return checkToken() === null ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/home" }} />
        );
      }}
    />
  );
}

export default AuthRoute;
