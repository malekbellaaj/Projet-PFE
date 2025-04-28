import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import UserRole from "../users/UserRole";
import AllAboutForm from "../users/authentification/teacherForm/AllAboutForm";
import MainForm from "../users/authentification/studentForm/MainForm";


const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        {/* router sans Header/Footer */}
        <Route exact path="/userrole" component={UserRole} />
        <Route exact path="/allaboutform" component={AllAboutForm} />
        <Route exact path="/mainform" component={MainForm} />

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