
import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));

export const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
export const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
export const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
export const PageClasses = Loadable(lazy(() => import('../pages/PageClasses')));
export const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
export const PageSyllabus = Loadable(lazy(() => import('../pages/PageSyllabus')));
export const PageExam = Loadable(lazy(() => import('../pages/PageExam')));

export const PageLeaderboard = Loadable(lazy(() => import('../pages/PageLeaderboard')));
export const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
export const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
export const Subject=Loadable(lazy(()=>import('../pages/AddSubject')))
export const EditSubject=Loadable(lazy(()=>import('../pages/EditSubject')))
export const Class=Loadable(lazy(()=>import('../pages/AddClasses')))
export const EditClass=Loadable(lazy(()=>import('../pages/EditClass')))
export const StudentCreation=Loadable(lazy(()=>import('../pages/StudentCreation')))
export const Notice=Loadable(lazy(()=>import('../pages/Notice')))

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
// import { Suspense, lazy, ElementType } from 'react';
// // components
// import LoadingScreen from '../components/loading-screen';

// // ----------------------------------------------------------------------

// const Loadable = (Component: ElementType) => (props: any) =>
//   (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );

// // ----------------------------------------------------------------------

// export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));

// export const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
// export const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
// export const PageThree = Loadable(lazy(() => import('../pages/PageThree')));
// export const PageClasses = Loadable(lazy(() => import('../pages/PageClasses')));
// export const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
// export const PageSyllabus = Loadable(lazy(() => import('../pages/PageSyllabus')));
// export const PageExam = Loadable(lazy(() => import('../pages/PageExam')));
// export const PageLeaderboard = Loadable(lazy(() => import('../pages/PageLeaderboard')));
// export const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
// export const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
// export const Subject=Loadable(lazy(()=>import('../pages/AddSubject')))
// export const EditSubject=Loadable(lazy(()=>import('../pages/EditSubject')))
// export const Class=Loadable(lazy(()=>import('../pages/AddClasses')))
// export const EditClass=Loadable(lazy(()=>import('../pages/EditClass')))
// export const StudentCreation=Loadable(lazy(()=>import('../pages/StudentCreation')))
// export const Notice=Loadable(lazy(()=>import('../pages/Notice')))


// export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
