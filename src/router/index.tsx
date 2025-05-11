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
import AdminDashboard from "../dashboardAdmin/pages/home/Sales";


const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        {/* router sans Header/Footer */}
        <Route exact path="/userrole" component={UserRole} />
        <Route exact path="/allaboutform" component={AllAboutForm} />
        <Route exact path="/mainform" component={MainForm} />
        <Route path="/userroleconn" component={UserRoleConn} />
        <Route path="/login" component={Login} />
        <Route path="/reset-password" component={ForgotPassword} />
        <Route path="/register" component={MainForm} />
        <Route exact path="/admin-dashboard" component={AdminDashboard} />



        {/* router principale */}
        <Route path="/">
          <>
            <Header />
            <Switch>
              {routes.map((routeItem) => (
                <Route
                  key={routeItem.component}
                  path={routeItem.path}
                  exact={routeItem.exact}
                  component={lazy(
                    () => import(`../pages/${routeItem.component}`)
                  )}
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