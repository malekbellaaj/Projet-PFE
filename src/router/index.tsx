
import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import UserRole from "../users/UserRoleAuth";
import AllAboutForm from "../users/authentification/teacherForm/AllAboutForm";
import MainForm from "../users/authentification/studentForm/MainForm";
import UserRoleConn from "../users/UserRoleConn";
import Login from "../users/Connection/NormalConnection/Login";
import ForgotPassword from "../users/Connection/NormalConnection/ForgotPassword";
import PrivateRoute from "../components/PrivateRoute";
import DashboardAdminWrapper from "../adminDashboard/DashboardAdminWrapper";
import AppRoutes from "../adminDashboard/routes/router";
import MainLayout from "../adminDashboard/layouts/main-layout";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        {/* Routes sans Header/Footer */}
        <Route exact path="/userrole" component={UserRole} />
        <Route exact path="/allaboutform" component={AllAboutForm} />
        <Route exact path="/mainform" component={MainForm} />
        <Route path="/userroleconn" component={UserRoleConn} />
        <Route path="/login" component={Login} />
        <Route path="/reset-password" component={ForgotPassword} />
        <Route path="/register" component={MainForm} />

        {/* Routes du dashboard (protégées) */}
        <PrivateRoute
          path="/admin-dashboard"
          render={() => (
            <DashboardAdminWrapper>
              <MainLayout>
                <AppRoutes />
              </MainLayout>
            </DashboardAdminWrapper>
          )}
        />

        {/* Route principale avec Header/Footer */}
        <Route path="/">
          <>
            <Header />
            <Switch>
              {routes.map((routeItem) => (
                <Route
                  key={routeItem.component}
                  path={routeItem.path}
                  exact={routeItem.exact}
                  component={lazy(() => import(`../pages/${routeItem.component}`))}
                />
              ))}
            </Switch>
            <Footer />
          </>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Router;
















// import { lazy, Suspense } from "react";
// import { Switch, Route } from "react-router-dom";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import routes from "./config";
// import { Styles } from "../styles/styles";
// import UserRole from "../users/UserRoleAuth";
// import AllAboutForm from "../users/authentification/teacherForm/AllAboutForm";
// import MainForm from "../users/authentification/studentForm/MainForm";
// import UserRoleConn from "../users/UserRoleConn";
// import Login from "../users/Connection/NormalConnection/Login";
// import ForgotPassword from "../users/Connection/NormalConnection/ForgotPassword";
// import PrivateRoute from "../components/PrivateRoute";
// import MainLayout from "../adminDashboard/layouts/main-layout";
// import DashboardAdminWrapper from "../adminDashboard/DashboardAdminWrapper";
// import AdminDashboardRoutes from "../adminDashboard/routes/router";

// // Composants du dashboard (lazy-loaded)
// const Sales = lazy(() => import("../adminDashboard/pages/home/Sales"));

// const Router = () => {
//   return (
//     <Suspense fallback={null}>
//       <Styles />
//       <Switch>
//         {/* Routes sans Header/Footer */}
//         <Route exact path="/userrole" component={UserRole} />
//         <Route exact path="/allaboutform" component={AllAboutForm} />
//         <Route exact path="/mainform" component={MainForm} />
//         <Route path="/userroleconn" component={UserRoleConn} />
//         <Route path="/login" component={Login} />
//         <Route path="/reset-password" component={ForgotPassword} />
//         <Route path="/register" component={MainForm} />
//         <Route path="/admin-dashboard" render={() => <AdminDashboardRoutes />}
//         />

//         {/* Routes du dashboard (protégées) */}
//         <PrivateRoute
//           path="/dashboard"
//           render={() => (
//             <DashboardAdminWrapper>
//               <MainLayout>
//                 <Switch>
//                   <Route exact path="/dashboard" component={Sales} />
//                 </Switch>
//               </MainLayout>
//             </DashboardAdminWrapper>
//           )}
//         />

//         {/* Route principale avec Header/Footer */}
//         <Route path="/">
//           <>
//             <Header />
//             <Switch>
//               {routes.map((routeItem) => (
//                 <Route
//                   key={routeItem.component}
//                   path={routeItem.path}
//                   exact={routeItem.exact}
//                   component={lazy(
//                     () => import(`../pages/${routeItem.component}`)
//                   )}
//                 />
//               ))}
//             </Switch>
//             <Footer />
//           </>
//         </Route>
//       </Switch>
//     </Suspense>
//   );
// };

// export default Router;


















// code mrigel mais avant dashboard admin

// import { lazy, Suspense } from "react";
// import { Switch, Route } from "react-router-dom";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import routes from "./config";
// import { Styles } from "../styles/styles";
// import UserRole from "../users/UserRoleAuth";
// import AllAboutForm from "../users/authentification/teacherForm/AllAboutForm";
// import MainForm from "../users/authentification/studentForm/MainForm";
// import UserRoleConn from "../users/UserRoleConn";
// import Login from "../users/Connection/NormalConnection/Login";
// import ForgotPassword from "../users/Connection/NormalConnection/ForgotPassword";
// import AdminDashboard from "../dashboardAdmin/pages/home/Sales";

// const Router = () => {
//   return (
//     <Suspense fallback={null}>
//       <Styles />
//       <Switch>
//         {/* router sans Header/Footer */}
//         <Route exact path="/userrole" component={UserRole} />
//         <Route exact path="/allaboutform" component={AllAboutForm} />
//         <Route exact path="/mainform" component={MainForm} />
//         <Route path="/userroleconn" component={UserRoleConn} />
//         <Route path="/login" component={Login} />
//         <Route path="/reset-password" component={ForgotPassword} />
//         <Route path="/register" component={MainForm} />
//         <Route exact path="/admin-dashboard" component={AdminDashboard} />

//         {/* router principale */}
//         <Route path="/">
//           <>
//             <Header />
//             <Switch>
//               {routes.map((routeItem) => (
//                 <Route
//                   key={routeItem.component}
//                   path={routeItem.path}
//                   exact={routeItem.exact}
//                   component={lazy(
//                     () => import(`../pages/${routeItem.component}`)
//                   )}
//                 />
//               ))}
//             </Switch>
//             <Footer />
//           </>
//         </Route>
//       </Switch>
//     </Suspense>
//   );
// };

// export default Router;
