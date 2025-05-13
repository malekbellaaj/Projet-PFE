import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps>;
  render?: (props: RouteComponentProps) => JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, render, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "admin";
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          render ? render(props) : Component ? <Component {...props} /> : null
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;