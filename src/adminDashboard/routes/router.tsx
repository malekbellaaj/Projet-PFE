import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import paths, { rootPaths } from './paths';
import Error404 from '../pages/errors/Error404';

const Sales = lazy(() => import('../pages/home/Sales'));
const Teachers = lazy(() => import('../pages/enseignants/Teachers'));
const Students = lazy(() => import('../pages/élèves/Students'));
const Admins = lazy(() => import('../pages/admins/Admins'));
const Reclamations = lazy(() => import('../pages/réclamations/reclamation'));

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={paths.home} component={Sales} />
      <Route exact path={paths.teachers} component={Teachers} />
      <Route exact path={paths.students} component={Students} />
      <Route exact path={paths.admins} component={Admins} />
      <Route exact path={paths.complaints} component={Reclamations} />
      <Route exact path={paths[404]} component={Error404} />
      <Route path="*" component={Error404} />
    </Switch>
  );
};

export default AppRoutes;
















// import { Suspense, lazy } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import paths, { rootPaths } from './paths';
// import PageLoader from '../components/loading/PageLoader';
// import Splash from '../components/loading/Splash';
// import MainLayout from '../layouts/main-layout';
// import Error404 from '../pages/errors/Error404';
// import Sales from '../pages/home/Sales';
// import Teachers from '../pages/enseignants/Teachers';
// import Students from '../pages/élèves/Students';
// import Admins from '../pages/admins/Admins';
// import Reclamations from '../pages/réclamations/reclamation';

// const AppRoutes = () => {
//   return (
//     <Suspense fallback={<Splash />}>
//       <Switch>
//         <Route path={rootPaths.homeRoot}>
//           <MainLayout>
//             <Suspense fallback={<PageLoader />}>
//               <Switch>
//                 <Route exact path={paths.home} component={Sales} />
//                 <Route exact path={paths.teachers} component={Teachers} />
//                 <Route exact path={paths.students} component={Students} />
//                 <Route exact path={paths.admins} component={Admins} />
//                 <Route exact path={paths.complaints} component={Reclamations} />
//                 <Route exact path={paths[404]} component={Error404} />
//               </Switch>
//             </Suspense>
//           </MainLayout>
//         </Route>
//         <Route path="*" component={Error404} />
//       </Switch>
//     </Suspense>
//   );
// };

// export default AppRoutes;














//origine
// import { Suspense, lazy } from 'react';
// import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';

// import paths, { rootPaths } from './paths';

// import PageLoader from '../components/loading/PageLoader';
// import Splash from 'components/loading/Splash';

// const App = lazy(() => import('App'));
// const MainLayout = lazy(async () => {
//   return Promise.all([
//     import('layouts/main-layout'),
//     new Promise((resolve) => setTimeout(resolve, 1000)),
//   ]).then(([moduleExports]) => moduleExports);
// });

// const Error404 = lazy(async () => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   return import('pages/errors/Error404');
// });

// const Sales = lazy(async () => {
//   return Promise.all([
//     import('pages/home/Sales'),
//     new Promise((resolve) => setTimeout(resolve, 500)),
//   ]).then(([moduleExports]) => moduleExports);
// });

// const Teachers = lazy(async () => {
//   return Promise.all([
//     import('./../pages/enseignants/Teachers'),
//     new Promise((resolve) => setTimeout(resolve, 500)),
//   ]).then(([moduleExports]) => moduleExports);
// });

// const Students = lazy(async () => {
//   return Promise.all([
//     import('./../pages/élèves/Students'),
//     new Promise((resolve) => setTimeout(resolve, 500)),
//   ]).then(([moduleExports]) => moduleExports);
// });

// const Admins = lazy(async () => {
//   return Promise.all([
//     import('./../pages/admins/Admins'),
//     new Promise((resolve) => setTimeout(resolve, 500)),
//   ]).then(([moduleExports]) => moduleExports);
// });

// const Reclamations = lazy(async () => {
//   return Promise.all([
//     import('./../pages/réclamations/reclamation'),
//     new Promise((resolve) => setTimeout(resolve, 500)),
//   ]).then(([moduleExports]) => moduleExports);
// });

// const routes: RouteObject[] = [
//   {
//     element: (
//       <Suspense fallback={<Splash />}>
//         <App />
//       </Suspense>
//     ),
//     children: [
//       {
//         path: rootPaths.homeRoot,
//         element: (
//           <MainLayout>
//             <Suspense fallback={<PageLoader />}>
//               <Outlet />
//             </Suspense>
//           </MainLayout>
//         ),
//         children: [
//           {
//             path: paths.home,
//             element: <Sales />,
//           },
//           {
//             path: paths.teachers,
//             element: <Teachers />,
//           },
//           {
//             path: paths.students,
//             element: <Students />,
//           },
//           {
//             path: paths.admins,
//             element: <Admins />,
//           },
//           {
//             path: paths.complaints,
//             element: <Reclamations />,
//           },
//         ],
//       },
//       {
//         path: '*',
//         element: <Error404 />,
//       },
//     ],
//   },
// ];

// const router = createBrowserRouter(routes, { basename: '/elegent' });

// export default router;