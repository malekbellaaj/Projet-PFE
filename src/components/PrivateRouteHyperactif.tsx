import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component?: React.ComponentType<RouteComponentProps>;
  render?: (props: RouteComponentProps) => JSX.Element;
  allowedRoles?: string[];
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  render,
  allowedRoles = ['admin'],
  redirectTo = '/login',
  ...rest
}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const isAuthenticated = token && allowedRoles.includes(role || '');

  console.log("🔐 PrivateRoute auth check:", {
    isAuthenticated,
    path: rest.path,
    redirectTo,
    role,
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          render ? render(props) : Component ? <Component {...props} /> : null
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

export default PrivateRoute;







