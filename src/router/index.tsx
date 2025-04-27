import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import UserRole from "../users/UserRole";
import mainFormulaire from "../users/authentification/mainForm/MainFormulaire";


const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        {/* router sans Header/Footer */}
        <Route exact path="/userrole" component={UserRole} />
        <Route exact path="/mainFormulaire" component={mainFormulaire} />

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

// code origine sans aucun nouveau router :
// const Router = () => {
//   return (
//     <Suspense fallback={null}>
//       <Styles />
//       <Header />
//       <Switch>
//         {routes.map((routeItem) => {
//           return (
//             <Route
//               key={routeItem.component}
//               path={routeItem.path}
//               exact={routeItem.exact}
//               component={lazy(() => import(../pages/${routeItem.component}))}
//             />
//           );
//         })}
//       </Switch>
//       <Footer />
//     </Suspense>
//   );
// };

// export default Router;
