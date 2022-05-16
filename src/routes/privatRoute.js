import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  const LoginData = useSelector(state => state.loginData)

  return (
    <>
    
    <Route
      {...rest}
      render={(props) =>
        LoginData.loginSuccesData?.accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect 
            to={{ 
              pathname: "/",
              state: { from: props.location } 
            }} 
          />
        )
      }
    />
    </>
  );
}
export default PrivateRoute;