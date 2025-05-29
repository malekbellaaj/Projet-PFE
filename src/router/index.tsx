
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
import DashboardAdminWrapper from "../dashboardAdmin/DashboardAdminWrapper";
import AppRoutes from "../dashboardAdmin/routes/router";
import MainLayout from "../dashboardAdmin/layouts/main-layout";
import test from "../dashboardStudent/test";
import LoginFace from "../users/Connection/FaceConnection/login/Login";
import ForgotPasswordFace from "../users/Connection/FaceConnection/forget passeword/ForgotPassword";

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
        <Route path="/test" component={test} />
        <Route path="/loginFace" component={LoginFace} />
        <Route path="/reset-password-Face" component={ForgotPasswordFace} />

        {/* Routes du dashboard (protégées) */}
        <PrivateRoute
          path="/dashboard-admin"
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





