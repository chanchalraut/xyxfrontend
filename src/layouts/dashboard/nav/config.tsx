// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  MenuBookIcon: icon('ic_MenuBookIcon'),
  mail:icon('ic_mail'),
  folder:icon('ic_folder'),
  menu:icon('ic_menu_item'),
  file:icon('ic_file'),
  blog:icon('ic_blog')
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general v4.0.0',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Student', path: PATH_DASHBOARD.studentlist, icon: ICONS.mail },
      { title: 'Subject', path: PATH_DASHBOARD.two, icon: ICONS.mail },
      { title: 'Classes', path: PATH_DASHBOARD.three, icon: ICONS.menu },
      { title: 'Subject Assign', path: PATH_DASHBOARD.classes, icon: ICONS.file },
      { title: 'Syllabus', path: PATH_DASHBOARD.syllabus, icon: ICONS.folder },
      // { title: 'Exam', path: PATH_DASHBOARD.exam, icon: ICONS.blog},
      // { title: 'Exam', path: PATH_DASHBOARD.leaderboard, icon: ICONS.blog},
      
      { title: 'Notice', path: PATH_DASHBOARD.notice, icon: ICONS.analytics },
      
    ],
  },
//EXam
//------------------------------------------------------------------------------------------------
{
  subheader: 'Exam',
  items: [
    {
      title: 'Exam',
      path: PATH_DASHBOARD.user.root,
      icon: ICONS.blog,
      children: [
        { title: 'Exam Creation', path: PATH_DASHBOARD.exam.creation },
       
        { title: 'Marks Obtained', path: PATH_DASHBOARD.exam.per}, 
         { title: 'Percentage', path: PATH_DASHBOARD.exam.marks},
         { title: 'Leaderborad', path: PATH_DASHBOARD.leaderboard },
      ],
    },
  ],
},


  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.four },
          { title: 'Five', path: PATH_DASHBOARD.user.five },
          { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  },
];

export default navConfig;

// // routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// // components
// import SvgColor from '../../../components/svg-color';

// // ----------------------------------------------------------------------

// const icon = (name: string) => (
//   <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
// );

// const ICONS = {
//   user: icon('ic_user'),
//   ecommerce: icon('ic_ecommerce'),
//   analytics: icon('ic_analytics'),
//   dashboard: icon('ic_dashboard'),
//   MenuBookIcon: icon('ic_MenuBookIcon'),
//   mail:icon('ic_mail'),
//   folder:icon('ic_folder'),
//   menu:icon('ic_menu_item'),
//   file:icon('ic_file'),
//   blog:icon('ic_blog')
// };

// const navConfig = [
//   // GENERAL
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'general v4.0.0',
//     items: [
//       { title: 'Dashboard', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
//       { title: 'Student', path: PATH_DASHBOARD.studentlist, icon: ICONS.mail },
//       { title: 'Subject', path: PATH_DASHBOARD.two, icon: ICONS.mail },
//       { title: 'Classes', path: PATH_DASHBOARD.three, icon: ICONS.menu },
//       { title: 'Subject Assign', path: PATH_DASHBOARD.classes, icon: ICONS.file },
//       { title: 'Syllabus', path: PATH_DASHBOARD.syllabus, icon: ICONS.folder },
//       // { title: 'Exam', path: PATH_DASHBOARD.exam, icon: ICONS.blog},
//       { title: 'Leaderboard', path: PATH_DASHBOARD.leaderboard,},
//       { title: 'Event', path: PATH_DASHBOARD.notice, icon: ICONS.blog},
      
      
//     ],
//   },
// //EXam
// //------------------------------------------------------------------------------------------------
// {
//   subheader: 'Exam',
//   items: [
//     {
//       title: 'Exam',
//       path: PATH_DASHBOARD.user.root,
//       icon: ICONS.blog,
//       children: [
//         { title: 'Exam Creation', path: PATH_DASHBOARD.exam.creation },
       
//         { title: 'Marks Obtained', path: PATH_DASHBOARD.exam.per}, 
//          { title: 'Percentage', path: PATH_DASHBOARD.exam.marks},
//          { title: 'Leaderboard', path: PATH_DASHBOARD.leaderboard},
//       ],
//     },
//   ],
// },


//   // MANAGEMENT
//   // ----------------------------------------------------------------------
//   {
//     subheader: 'management',
//     items: [
//       {
//         title: 'user',
//         path: PATH_DASHBOARD.user.root,
//         icon: ICONS.user,
//         children: [
//           { title: 'Four', path: PATH_DASHBOARD.user.four },
//           { title: 'Five', path: PATH_DASHBOARD.user.five },
//           { title: 'Six', path: PATH_DASHBOARD.user.six },
//         ],
//       },
//     ],
//   },
// ];

// export default navConfig;
