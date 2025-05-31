// frontend/src/components/PrivateRoute.tsx
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
  const isAuthenticated = !!token && !!role && allowedRoles.includes(role);

  console.log("🔐 PrivateRoute auth check:", {
    isAuthenticated,
    path: rest.path,
    redirectTo,
    token: !!token,
    role,
    allowedRoles,
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          render ? render(props) : Component ? <Component {...props} /> : null
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;











// import React from 'react';
// import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

// interface PrivateRouteProps extends RouteProps {
//   component?: React.ComponentType<RouteComponentProps>;
//   render?: (props: RouteComponentProps) => JSX.Element;
//   allowedRoles?: string[];
//   redirectTo?: string;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({
//   component: Component,
//   render,
//   allowedRoles = ['admin'],
//   redirectTo = '/login',
//   ...rest
// }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const isAuthenticated = token && allowedRoles.includes(role || '');

//   console.log("🔐 PrivateRoute auth check:", {
//     isAuthenticated,
//     path: rest.path,
//     redirectTo,
//     role,
//   });

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           render ? render(props) : Component ? <Component {...props} /> : null
//         ) : (
//           <Redirect to={redirectTo} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
















// import React from 'react';
// import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

// interface PrivateRouteProps extends RouteProps {
//   component?: React.ComponentType<RouteComponentProps>;
//   render?: (props: RouteComponentProps) => JSX.Element;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, render, ...rest }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const isAdminRoute = rest.path?.toString().startsWith("/dashboard-admin");
//   const isStudentRoute = rest.path?.toString().startsWith("/dashboard-student");

//   const isAuthenticated = () => {
//     if (!token || !role) return false;
//     if (isAdminRoute && role === "admin") return true;
//     if (isStudentRoute && role === "student") return true;
//     return false;
//   };

//   const redirectPath = isAdminRoute
//     ? "/login"
//     : isStudentRoute
//     ? "/loginFace"
//     : "/";

//   console.log("🔐 PrivateRoute auth check:", {
//     path: rest.path,
//     role,
//     redirectTo: redirectPath,
//     isAuthenticated: isAuthenticated(),
//   });

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? (
//           render ? render(props) : Component ? <Component {...props} /> : null
//         ) : (
//           <Redirect to={redirectPath} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;






// import React from 'react';
// import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

// interface PrivateRouteProps extends RouteProps {
//   component?: React.ComponentType<RouteComponentProps>;
//   render?: (props: RouteComponentProps) => JSX.Element;
//   allowedRoles?: string[]; // 👈 ajout pour autoriser plusieurs rôles
//   redirectTo?: string; // 👈 route de redirection personnalisée
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({
//   component: Component,
//   render,
//   allowedRoles = ['admin'], // 👈 par défaut: admin
//   redirectTo = '/login',
//   ...rest
// }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const isAuthenticated = token && allowedRoles.includes(role || '');

//   console.log("🔐 PrivateRoute auth check:", {
//     isAuthenticated,
//     path: rest.path,
//     redirectTo,
//     role,
//   });

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           render ? render(props) : Component ? <Component {...props} /> : null
//         ) : (
//           <Redirect to={redirectTo} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;


























// import React from 'react';
// import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

// interface PrivateRouteProps extends RouteProps {
//   component?: React.ComponentType<RouteComponentProps>;
//   render?: (props: RouteComponentProps) => JSX.Element;
// }
// const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, render, ...rest }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const isAdminRoute = rest.path?.toString().startsWith("/dashboard-admin");
//   const isStudentRoute = rest.path?.toString().startsWith("/dashboard-student");

//   const isAuthenticated = () => {
//     if (!token || !role) return false;
//     if (isAdminRoute && role === "admin") return true;
//     if (isStudentRoute && role === "student") return true;
//     return false;
//   };

//   const redirectPath = isAdminRoute ? "/login" : isStudentRoute ? "/loginFace" : "/";

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? (
//           render ? render(props) : Component ? <Component {...props} /> : null
//         ) : (
//           <Redirect to={redirectPath} />
//         )
//       }
//     />
//   );
// };


// export default PrivateRoute;