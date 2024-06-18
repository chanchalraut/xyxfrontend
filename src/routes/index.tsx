import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config';
//
import {
  Page404,
  PageOne,
  PageTwo,
  PageClasses,
 PageSix,
  PageFour,
  PageFive,
  LoginPage,
  PageThree,
  PageSyllabus,
  EditSubject,
 
  
  
  
  
} from './elements';
import PageExam from 'src/pages/PageExam';
import PageLeaderboard from 'src/pages/PageLeaderboard';
import Subject from 'src/pages/AddSubject';
import { replace } from 'lodash';
import AddSubject from 'src/pages/AddSubject';
// import EditSubject from 'src/pages/EditSubject';
import AddClasses from 'src/pages/AddClasses';
import SyllabusForm from 'src/pages/PageSyllabus';
// import AddSyllbusFrom from 'src/pages/AddSyllabus'
import EditClass from 'src/pages/EditClass';
import CreateExamForm from 'src/pages/PageExam';
import AddStudentForm from 'src/pages/StudentCreation';
import Notice from 'src/pages/Notice';
import RegistrationForm from 'src/pages/RegistrationForm'; 


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
                    path: 'register', 
                    element: <RegistrationForm />,
                  },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <PageOne /> },
        {path:'student', element:<AddStudentForm/>},
       
        { path: 'two', element: <PageTwo /> },
        {path:'two/add-subject', element:<AddSubject></AddSubject>},
        {path:'two/edit-subject/:id',element:<EditSubject></EditSubject>},
        
        
        
        { path: 'three', element: <PageThree /> },
        {path:'three/add-class', element:<AddClasses></AddClasses>},
        {path:'three/Edit-class',element:<EditClass></EditClass>},

        { path: 'classes', element: <PageClasses /> },
        { path: 'syllabus', element: <PageSyllabus /> },
        // {path:'syllabus/add-syllabus',element:<AddSyllbusFrom></AddSyllbusFrom>},
        { path: 'exam', element: <PageExam/> },
        { path: 'leaderboard', element: <PageLeaderboard /> },
        { path: 'notice', element: <Notice /> },
        {
          path: 'exam',
          children: [
            { element: <Navigate to="/dashboard/exam/creation" replace />, index: true },
            { path: 'creation', element: <PageExam/> },
           
            { path: 'per', element: <PageFour/> }, //marks
             { path: 'marks', element:  <PageSix/> }, //per
            
          ],
        },
        
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
            
          ],
        },
        
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },


   
    
    
  ]);
  
}
// import { Navigate, useRoutes } from 'react-router-dom';
// // auth
// import AuthGuard from '../auth/AuthGuard';
// import GuestGuard from '../auth/GuestGuard';
// // layouts
// import CompactLayout from '../layouts/compact';
// import DashboardLayout from '../layouts/dashboard';
// // config
// import { PATH_AFTER_LOGIN } from '../config';
// //
// import {
//   Page404,
//   PageOne,
//   PageTwo,
//   PageClasses,
//  PageSix,
//   PageFour,
//   PageFive,
//   LoginPage,
//   PageThree,
//   PageSyllabus,
//   EditSubject,
 
  
  
  
  
// } from './elements';
// import PageExam from 'src/pages/PageExam';
// import PageLeaderboard from 'src/pages/PageLeaderboard';
// import Subject from 'src/pages/AddSubject';
// import { replace } from 'lodash';
// import AddSubject from 'src/pages/AddSubject';
// // import EditSubject from 'src/pages/EditSubject';
// import AddClasses from 'src/pages/AddClasses';
// import SyllabusForm from 'src/pages/PageSyllabus';
// // import AddSyllbusFrom from 'src/pages/AddSyllabus'
// import EditClass from 'src/pages/EditClass';
// import CreateExamForm from 'src/pages/PageExam';
// import AddStudentForm from 'src/pages/StudentCreation';
// import Notice from 'src/pages/Notice';
// import RegistrationForm from 'src/pages/RegistrationForm'; 



// // ----------------------------------------------------------------------

// export default function Router() {
//   return useRoutes([
//     {
//       path: '/',
//       children: [
//         { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
//         {
//           path: 'login',
//           element: (
//             <GuestGuard>
//               <LoginPage />
//             </GuestGuard>
//           ),
//         },
//         {
//           path: 'register', 
//           element: <RegistrationForm />,
//         },
//       ],
//     },
//     {
//       path: '/dashboard',
//       element: (
//         <AuthGuard>
//           <DashboardLayout />
//         </AuthGuard>
//       ),
//       children: [
//         { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
//         { path: 'one', element: <PageOne /> },
//         {path:'student', element:<AddStudentForm/>},
       
//         { path: 'two', element: <PageTwo /> },
//         {path:'two/add-subject', element:<AddSubject></AddSubject>},
//         {path:'two/edit-subject/:id',element:<EditSubject></EditSubject>},
        
        
        
//         { path: 'three', element: <PageThree /> },
//         {path:'three/add-class', element:<AddClasses></AddClasses>},
//         {path:'three/Edit-class',element:<EditClass></EditClass>},

//         { path: 'classes', element: <PageClasses /> },
//         { path: 'syllabus', element: <PageSyllabus /> },
//         // {path:'syllabus/add-syllabus',element:<AddSyllbusFrom></AddSyllbusFrom>},
//         { path: 'exam', element: <PageExam/> },
//         { path: 'leaderboard', element: <PageLeaderboard /> },
//         { path: 'notice', element: <Notice /> },

//         {
//           path: 'exam',
//           children: [
//             { element: <Navigate to="/dashboard/exam/creation" replace />, index: true },
//             { path: 'creation', element: <PageExam/> },
           
//             { path: 'four', element: <PageFour /> }, //marks
//              { path: 'six', element:  <PageSix/> }, //per
            
//           ],
//         },
        
//         {
//           path: 'user',
//           children: [
//             { element: <Navigate to="/dashboard/user/four" replace />, index: true },
//             { path: 'four', element: <PageFour /> },
//             { path: 'five', element: <PageFive /> },
//             { path: 'six', element: <PageSix /> },
            
//           ],
//         },
        
//       ],
//     },
//     {
//       element: <CompactLayout />,
//       children: [{ path: '404', element: <Page404 /> }],
//     },
//     { path: '*', element: <Navigate to="/404" replace /> },


   
    
    
//   ]);
  
// }
