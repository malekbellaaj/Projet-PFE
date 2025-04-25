import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import UserRole from "../users/UserRole";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        {/* router de users sans Header/Footer */}
        <Route exact path="/userrole" component={UserRole} />

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
