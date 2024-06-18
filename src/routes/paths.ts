// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  classes: path(ROOTS_DASHBOARD, '/classes'),
  syllabus: path(ROOTS_DASHBOARD, '/syllabus'),
  // exam: path(ROOTS_DASHBOARD, '/exam'),
  leaderboard: path(ROOTS_DASHBOARD, '/leaderboard'),
  notice: path(ROOTS_DASHBOARD, '/notice'),// notice
  addsubject:path(ROOTS_DASHBOARD,'two/add-subject'),
  addClasses:path(ROOTS_DASHBOARD,'three/add-Class'),
  addSyllbus:path(ROOTS_DASHBOARD,'syllabus/add-syllabus'),
  studentlist:path(ROOTS_DASHBOARD,'/student'),

  exam: {
    root: path(ROOTS_DASHBOARD, '/exam'),
    creation: path(ROOTS_DASHBOARD, '/exam/creation'),
    marks: path(ROOTS_DASHBOARD, '/exam/marks'),
    per: path(ROOTS_DASHBOARD, '/exam/per'),
  },

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
};
// // ----------------------------------------------------------------------

// function path(root: string, sublink: string) {
//   return `${root}${sublink}`;
// }

// const ROOTS_DASHBOARD = '/dashboard';

// // ----------------------------------------------------------------------

// export const PATH_AUTH = {
//   login: '/login',
// };

// export const PATH_DASHBOARD = {
//   root: ROOTS_DASHBOARD,
//   one: path(ROOTS_DASHBOARD, '/one'),
//   two: path(ROOTS_DASHBOARD, '/two'),
//   three: path(ROOTS_DASHBOARD, '/three'),
//   classes: path(ROOTS_DASHBOARD, '/classes'),
//   syllabus: path(ROOTS_DASHBOARD, '/syllabus'),
//   // exam: path(ROOTS_DASHBOARD, '/exam'),
//   leaderboard: path(ROOTS_DASHBOARD, '/leaderboard'),
//   notice: path(ROOTS_DASHBOARD, '/Notice'),
//   addsubject:path(ROOTS_DASHBOARD,'two/add-subject'),
//   addClasses:path(ROOTS_DASHBOARD,'three/add-Class'),
//   addSyllbus:path(ROOTS_DASHBOARD,'syllabus/add-syllabus'),
//   studentlist:path(ROOTS_DASHBOARD,'/student'),

//   exam: {
//     root: path(ROOTS_DASHBOARD, '/exam'),
//     creation: path(ROOTS_DASHBOARD, '/exam/creation'),
//     marks: path(ROOTS_DASHBOARD, '/exam/marks '),
//     six: path(ROOTS_DASHBOARD, '/exam/six'),
//   },

//   user: {
//     root: path(ROOTS_DASHBOARD, '/user'),
//     four: path(ROOTS_DASHBOARD, '/user/four'),
//     five: path(ROOTS_DASHBOARD, '/user/five'),
//     six: path(ROOTS_DASHBOARD, '/user/six'),
//   },
// };
