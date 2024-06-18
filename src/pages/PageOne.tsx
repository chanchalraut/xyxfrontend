// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   FormControl, InputLabel, Select,
//    MenuItem,
//   Paper,
//   Box,Avatar,
// } from '@mui/material';
// import {MdSubject, MdClass, MdEvent, MdPeople } from 'react-icons/md';
// import { styled } from '@mui/system';
// import Image from '../components/image';
// import { SelectChangeEvent } from '@mui/material/Select';
// import CircularProgress, {
//   circularProgressClasses,
//   CircularProgressProps,
// } from '@mui/material/CircularProgress';

// import { Star, Grade } from '@mui/icons-material';
// import { keyframes } from '@mui/system';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface Exam {
//   _id: string;
//   name: string;
// }

// interface Class {
//   _id: string;
//   name: string;
// }

// // const StyledCard = styled(Card)(({ theme }) => ({
// //   padding: theme.spacing(1),
// //   maxWidth: '350px',
// // }));

// // const StyledIcon = styled('div')(({ theme }) => ({
// //   fontSize: 48,
// //   color: theme.palette.primary.main,
// //   marginBottom: theme.spacing(1),
// // }));

// // const StyledCount = styled(Typography)(({ theme }) => ({
// //   fontSize: 24,
// //   fontWeight: 'bold',
// // }));

// const LeaderboardItem = styled('div')(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(1),
//   border: `1px solid ${theme.palette.grey[300]}`,
//   borderRadius: theme.spacing(1),
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   backgroundColor: theme.palette.action.hover,
// }));

// // const LeaderboardContainer = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(2),
// //   marginBottom: theme.spacing(2),
// //   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
// // }));

// // const PodiumBox = styled(Box)(({ theme }) => ({
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'flex-end',
// //   marginTop: theme.spacing(4),
// // }));

// // const PodiumStep = styled(Box)(({ theme }) => ({
// //   width: '100px',
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   flexDirection: 'column',
// //   backgroundColor: theme.palette.primary.light,
// //   margin: theme.spacing(1),
// //   borderRadius: theme.spacing(1),
// //   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
// //   [theme.breakpoints.down('sm')]: {
// //     width: '70px',
// //   },
// //   position: 'relative',
// //   overflow: 'hidden',
// // }));

// // const PodiumStepFirst = styled(PodiumStep)(({ theme }) => ({
// //   height: '200px',
// //   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
// //   color: theme.palette.primary.contrastText,
// //   [theme.breakpoints.down('sm')]: {
// //     height: '130px',
// //   },
// // }));

// // const PodiumStepSecond = styled(PodiumStep)(({ theme }) => ({
// //   height: '180px',
// //   background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
// //   color: theme.palette.primary.contrastText,
// //   [theme.breakpoints.down('sm')]: {
// //     height: '120px',
// //   },
// // }));

// // const PodiumStepThird = styled(PodiumStep)(({ theme }) => ({
// //   height: '160px',
// //   background: `linear-gradient(135deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.primary.light} 100%)`,
// //   color: theme.palette.primary.contrastText,
// //   [theme.breakpoints.down('sm')]: {
// //     height: '110px',
// //   },
// // }));

// // const RankingText = styled(Typography)(({ theme }) => ({
// //   fontSize: '1.5rem',
// //   fontWeight: 'bold',
// //   position: 'absolute',
// //   top: '10px',
// // }));

// // const StudentNameText = styled(Typography)(({ theme }) => ({
// //   fontSize: '1rem',
// //   fontWeight: 'bold',
// //   marginTop: theme.spacing(1),
// // }));

// // const PercentageText = styled(Typography)(({ theme }) => ({
// //   fontSize: '0.875rem',
// //   marginTop: theme.spacing(0.5),
// // }));
// //chanchal
// // const bounce = keyframes`
// //   0%, 20%, 50%, 80%, 100% {
// //     transform: translateY(0) scale(1);
// //   }
// //   40% {
// //     transform: translateY(-30px) scale(1.1);
// //   }
// //   60% {
// //     transform: translateY(-15px) scale(1.05);
// //   }
// // `;

// // const fadeInLeft = keyframes`
// //   from {
// //     opacity: 0;
// //     transform: translateX(-100%);
// //   }
// //   to {
// //     opacity: 1;
// //     transform: translateX(0);
// //   }
// // `;

// // const zoomIn = keyframes`
// //   from {
// //     opacity: 0;
// //     transform: scale(0.5);
// //   }
// //   to {
// //     opacity: 1;
// //     transform: scale(1);
// //   }
// // `;

// // const PodiumBox = styled(Box)(({ theme }) => ({
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'flex-end',
// //   marginTop: theme.spacing(4),
// //   background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
// //   padding: theme.spacing(3),
// //   borderRadius: theme.spacing(2),
// //   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
// // }));

// // const PodiumStep = styled(Box)(({ theme }) => ({
// //   width: '100px',
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   flexDirection: 'column',
// //   backgroundColor: theme.palette.primary.light,
// //   margin: theme.spacing(1),
// //   borderRadius: theme.spacing(2),
// //   boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
// //   [theme.breakpoints.down('sm')]: {
// //     width: '70px',
// //   },
// //   position: 'relative',
// //   overflow: 'hidden',
// // }));

// // const PodiumStepFirst = styled(PodiumStep)(({ theme }) => ({
// //   height: '300px',
// //   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
// //   color: theme.palette.primary.contrastText,
// //   [theme.breakpoints.down('sm')]: {
// //     height: '130px',
// //   },
// //   animation: `${bounce} 2s ease-in-out infinite`,
// // }));

// // const PodiumStepSecond = styled(PodiumStep)(({ theme }) => ({
// //   height: '200px',
// //   background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
// //   color: theme.palette.primary.contrastText,
// //   [theme.breakpoints.down('sm')]: {
// //     height: '120px',
// //   },
// //   animation: `${fadeInLeft} 1s ease-out 2s`,
// // }));

// // const PodiumStepThird = styled(PodiumStep)(({ theme }) => ({
// //   height: '160px',
// //   background: `linear-gradient(135deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.primary.light} 100%)`,
// //   color: theme.palette.primary.contrastText,
// //   [theme.breakpoints.down('sm')]: {
// //     height: '110px',
// //   },
// //   animation: `${zoomIn} 1s ease-in 1s`,
// // }));

// // const RankingText = styled(Typography)(({ theme }) => ({
// //   fontSize: '1.5rem',
// //   fontWeight: 'bold',
// //   position: 'absolute',
// //   top: '10px',
// //   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
// // }));

// // const StudentNameText = styled(Typography)(({ theme }) => ({
// //   fontSize: '1rem',
// //   fontWeight: 'bold',
// //   marginTop: theme.spacing(1),
// //   textAlign: 'center',
// //   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
// // }));

// // const PercentageText = styled(Typography)(({ theme }) => ({
// //   fontSize: '0.875rem',
// //   marginTop: theme.spacing(0.5),
// //   textAlign: 'center',
// //   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
// // }));

//  // Import Material-UI Icons

// const StyledCard = styled(Card)(({ theme }) => ({
//   padding: theme.spacing(1),
//   maxWidth: '350px',
// }));

// const StyledIcon = styled('div')(({ theme }) => ({
//   fontSize: 48,
//   color: theme.palette.primary.main,
//   marginBottom: theme.spacing(1),
// }));

// const StyledCount = styled(Typography)(({ theme }) => ({
//   fontSize: 24,
//   fontWeight: 'bold',
// }));

// const LeaderboardContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(2),
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//   borderRadius: theme.spacing(2),
//   background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
// }));

// const growShrink = keyframes`
//   0%, 100% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.1);
//   }
// `;

// const rotate = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// const PodiumContainer = styled(Box)`
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   margin-top: ${({ theme }) => theme.spacing(4)};
// `;

// const PodiumStep = styled(Box)`
//   width: 100px;
//   height: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   background-color: ${({ theme }) => theme.palette.primary.light};
//   margin: ${({ theme }) => theme.spacing(1)};
//   border-radius: ${({ theme }) => theme.spacing(1)};
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//   position: relative;
//   overflow: hidden;
//   animation: ${growShrink} 1.5s infinite alternate;
// `;

// const PodiumStepFirst = styled(PodiumStep)`
//   background: linear-gradient(135deg, ${({ theme }) => theme.palette.primary.main} 0%, ${({ theme }) => theme.palette.primary.dark} 100%);
//   color: ${({ theme }) => theme.palette.primary.contrastText};
// `;

// const PodiumStepSecond = styled(PodiumStep)`
//   background: linear-gradient(135deg, ${({ theme }) => theme.palette.primary.light} 0%, ${({ theme }) => theme.palette.primary.main} 100%);
//   color: ${({ theme }) => theme.palette.primary.contrastText};
// `;

// const PodiumStepThird = styled(PodiumStep)`
//   background: linear-gradient(135deg, ${({ theme }) => theme.palette.primary.lighter} 0%, ${({ theme }) => theme.palette.primary.light} 100%);
//   color: ${({ theme }) => theme.palette.primary.contrastText};
// `;

// const RankingText = styled(Typography)`
//   font-size: 1.5rem;
//   font-weight: bold;
//   position: absolute;
//   top: 10px;
// `;

// const StudentNameText = styled(Typography)`
//   font-size: 1rem;
//   font-weight: bold;
//   margin-top: ${({ theme }) => theme.spacing(1)};
// `;

// const PercentageText = styled(Typography)`
//   font-size: 0.875rem;
//   margin-top: ${({ theme }) => theme.spacing(0.5)};
// `;

// const TrophyIcon = styled(Star)`
//   width: 50px;
//   height: 50px;
//   color: gold;
//   animation: ${rotate} 2s linear infinite;
// `;

// const BadgeIcon = styled(Grade)`
//   width: 50px;
//   height: 50px;
//   color: #fff;
// `;
// const Dashboard: React.FC = () => {
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [selectedClassId, setSelectedClassId] = useState<string>('');
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//   const [subjectCount, setSubjectCount] = useState<number>(0);
//   const [classCount, setClassCount] = useState<number>(0);
//   const [examCount, setExamCount] = useState<number>(0);
//   const [studentCount, setStudentCount] = useState<number>(0);
//   const [leaderboardData, setLeaderboardData] = useState<{ studentName: string; percentage: number ,profileImage:string}[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchCounts();
//   }, []);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/exams');
//       setExams(response.data);
//     } catch (error) {
//       console.error('Error fetching exams:', error);
//     }
//   };

//   const fetchClasses = async (examId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/percentage/classes/${examId}`);
//       setClasses(response.data);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };

//   const fetchCounts = async () => {
//     try {
//       const [subjectsResponse, classesResponse, examsResponse, studentsResponse] = await Promise.all([
//         axios.get('http://localhost:3000/api/subjects'),
//         axios.get('http://localhost:3000/api/classes'),
//         axios.get('http://localhost:3000/api/exams'),
//         axios.get('http://localhost:3000/api/students'),
//       ]);

//       setSubjectCount(subjectsResponse.data.length);
//       setClassCount(classesResponse.data.length);
//       setExamCount(examsResponse.data.length);
//       setStudentCount(studentsResponse.data.length);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching counts:', error);
//       setLoading(false);
//     }
//   };

//   const handleClassChange = (event: SelectChangeEvent) => {
//     const classId = event.target.value as string;
//     setSelectedClassId(classId);
//     if (selectedExamId) {
//       fetchLeaderboardData(selectedExamId, classId);
//     }
//   };

//   const handleExamChange = async (event: SelectChangeEvent) => {
//     const examId = event.target.value as string;
//     setSelectedExamId(examId);
//     setSelectedClassId('');
//     await fetchClasses(examId);
//   };

//   const fetchLeaderboardData = async (examId: string, classId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/percentage/${examId}/${classId}`);
//       setLeaderboardData(response.data.slice(0, 3)); // Only top 3 students
//       // setLeaderboardData(response.data)
//     } catch (error) {
//       console.error('Error fetching leaderboard data:', error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h3" component="h1" paragraph>
//         Dashboard
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={3}>
//           <StyledCard>
//             <CardContent>
//               <Grid container alignItems="center" spacing={2}>
//                 <Grid item xs>
//                   <StyledCount>{subjectCount}</StyledCount>
//                   <Typography>Subjects</Typography>
//                 </Grid>
//                 <Grid item>
//                   <StyledIcon as={MdSubject} />
//                 </Grid>
//                   {/* <Box position="relative" display="inline-flex"> */}
//                     {/* <CircularProgress
//                       variant="determinate"
//                       size={50}
//                       thickness={4}
//                       value={(subjectCount / 100) * 100} // Assuming MAX_SUBJECTS is defined elsewhere
//                       sx={{
//                         color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
//                         animationDuration: '550ms',
//                         position: 'absolute',
//                         left: 0,
//                         [`& .${circularProgressClasses.circle}`]: {
//                           strokeLinecap: 'round',
//                         },
//                       }}
//                     /> */}
//                     {/* <Box
//                       top={0}
//                       left={0}
//                       bottom={0}
//                       right={0}
//                       position="absolute"
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="center"
//                     >
//                       <Typography variant="caption" component="div" color="textSecondary">
//                         {`${Math.round((subjectCount / 100) * 100)}%`}
//                       </Typography>
//                     </Box>
//                   </Box> */}

//               </Grid>
//             </CardContent>
//           </StyledCard>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <StyledCard>
//             <CardContent>
//               <Grid container alignItems="center" spacing={2}>
//                 <Grid item>

//                 </Grid>
//                 <Grid item xs>
//                   <StyledCount>{classCount}</StyledCount>
//                   <Typography>Classes</Typography>
//                 </Grid>
//                 <Grid item>
//                   <StyledIcon as={MdClass} />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </StyledCard>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <StyledCard>
//             <CardContent>
//               <Grid container alignItems="center" spacing={2}>
//                 <Grid item>

//                 </Grid>
//                 <Grid item xs>
//                   <StyledCount>{examCount}</StyledCount>
//                   <Typography>Exams</Typography>
//                 </Grid>
//                 <Grid item>
//                   <StyledIcon as={MdEvent} />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </StyledCard>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <StyledCard>
//             <CardContent>
//               <Grid container alignItems="center" spacing={2}>

//                 <Grid item xs>
//                   <StyledCount>{studentCount}</StyledCount>
//                   <Typography>Students</Typography>
//                 </Grid>
//                 <Grid item>
//                   <StyledIcon as={MdPeople} />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </StyledCard>
//         </Grid>
//       </Grid>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <Box
//             sx={{
//               width: '100%',
//               height: '200px',
//               backgroundColor: (theme) => theme.palette.primary.lighter,
//               padding: '20px',
//               borderRadius: '15px',
//               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//               display: 'flex',
//               marginTop: '20px',
//               flexDirection: { xs: 'column', md: 'row' },
//               alignItems: { xs: 'center', md: 'flex-start' },
//               gap: '20px',
//             }}
//           >
//             <Box>
//               <Typography
//                 variant="h4"
//                 style={{ fontFamily: 'Poppins', color: 'black', marginBottom: '10px' }}
//               >
//                 Welcome To Academix! Academix brings you the expertise to help you control your
//                 schools in real-time from anywhere.
//               </Typography>
//             </Box>
//             <Box sx={{ margin: '-87px' }}>
//               <Image
//                 disabledEffect
//                 visibleByDefault
//                 alt="auth"
//                 src={'/assets/images/Tanu.png'}
//                 sx={{
//                   maxWidth: '80%',
//                   display: { xs: 'none', md: 'block' },
//                 }}
//               />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>

//       <Paper>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={8}>
//             <Box sx={{ flexGrow: 1 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth margin="normal" size="small" sx={{ width: '150px' }}>
//                     <InputLabel id="exam-label">Exam</InputLabel>
//                     <Select
//                       labelId="exam-label"
//                       id="exam"
//                       value={selectedExamId}
//                       onChange={handleExamChange}
//                     >
//                       {exams.map((exam) => (
//                         <MenuItem key={exam._id} value={exam._id}>
//                           {exam.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth margin="normal" size="small" sx={{ width: '150px' }}>
//                     <InputLabel id="class-label">Class</InputLabel>
//                     <Select
//                       labelId="class-label"
//                       id="class"
//                       value={selectedClassId}
//                       onChange={handleClassChange}
//                       disabled={!selectedExamId}
//                     >
//                       {classes.map((classItem) => (
//                         <MenuItem key={classItem._id} value={classItem._id}>
//                           {classItem.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

// {/* {leaderboardData.length > 0 && (
//         <LeaderboardContainer>
//           <Typography variant="h6" gutterBottom>
//             Top 3 Students
//           </Typography>
//           <PodiumBox>
//             {leaderboardData[1] && (
//               <PodiumStepSecond>
//                 <Typography variant="h6">2</Typography>
//                 <Typography variant="body1">{leaderboardData[1].studentName}</Typography>
//                 <Typography variant="body2">{leaderboardData[1].percentage}%</Typography>
//               </PodiumStepSecond>
//             )}
//             {leaderboardData[0] && (
//               <PodiumStepFirst>
//                 <Typography variant="h6">1</Typography>
//                 <Typography variant="body1">{leaderboardData[0].studentName}</Typography>
//                 <Typography variant="body2">{leaderboardData[0].percentage}%</Typography>
//               </PodiumStepFirst>
//             )}
//             {leaderboardData[2] && (
//               <PodiumStepThird>
//                 <Typography variant="h6">3</Typography>
//                 <Typography variant="body1">{leaderboardData[2].studentName}</Typography>
//                 <Typography variant="body2">{leaderboardData[2].percentage}%</Typography>
//               </PodiumStepThird>
//             )}
//           </PodiumBox>
//         </LeaderboardContainer>
//       )} */}

// <LeaderboardContainer>
//         <Typography variant="h4" align="center" gutterBottom>
//           Leaderboard
//         </Typography>

//         <PodiumContainer>
//           {leaderboardData.length >= 1 && (
//             <PodiumStepFirst>
//               <RankingText>1st</RankingText>
//              <Avatar src={`http://localhost:3000/${leaderboardData[0].profileImage}`}
//                 sx={{ width: 100, height: 100, margin: '0 auto 20px' }}
//               />
//               <StudentNameText>{leaderboardData[0].studentName}</StudentNameText>
//               <PercentageText>{leaderboardData[0].percentage}%</PercentageText>
//               <TrophyIcon />
//             </PodiumStepFirst>
//           )}
//           {leaderboardData.length >= 2 && (
//             <PodiumStepSecond>
//               <RankingText>2nd</RankingText>
//               <Avatar
//                 src={`http://localhost:3000/${leaderboardData[1].profileImage}`}
//                 sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
//               />
//               <StudentNameText>{leaderboardData[1].studentName}</StudentNameText>
//               <PercentageText>{leaderboardData[1].percentage}%</PercentageText>
//               <BadgeIcon />
//             </PodiumStepSecond>
//           )}
//           {leaderboardData.length >= 3 && (
//             <PodiumStepThird>
//               <RankingText>3rd</RankingText>
//               <Avatar
//                 src={`http://localhost:3000/${leaderboardData[2].profileImage}`}
//                 sx={{ width: 80, height: 80, margin: '0 auto 20px' }}
//               />
//               <StudentNameText>{leaderboardData[2].studentName}</StudentNameText>
//               <PercentageText>{leaderboardData[2].percentage}%</PercentageText>
//               <BadgeIcon />
//             </PodiumStepThird>
//           )}
//         </PodiumContainer>
//       </LeaderboardContainer>
//     </div>
//   );
// };

// export default Dashboard;

//Correct Code
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   Grid,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
//   Box,
//   Avatar,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { Star, Grade } from '@mui/icons-material';
// import { keyframes } from '@mui/system';

// interface Exam {
//   _id: string;
//   name: string;
// }

// interface Class {
//   _id: string;
//   name: string;
// }

// interface StudentResult {
//   studentId: {
//     _id: string;
//     profileImage: string;
//   };
//   studentName: string;
//   percentage: number;
// }

// const LeaderboardContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(2),
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//   borderRadius: theme.spacing(2),
//   background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
// }));

// const growShrink = keyframes`
//   0%, 100% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.1);
//   }
// `;

// const PodiumContainer = styled(Box)`
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   margin-top: ${({ theme }) => theme.spacing(4)};
// `;

// const PodiumStep = styled(Box)`
//   width: 100px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   background-color: ${({ theme }) => theme.palette.primary.light};
//   margin: ${({ theme }) => theme.spacing(1)};
//   border-radius: ${({ theme }) => theme.spacing(1)};
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
//   position: relative;
//   overflow: hidden;
//   animation: ${growShrink} 1.5s infinite alternate;
// `;

// const PodiumStepFirst = styled(PodiumStep)`
//   height: 200px;
//   background: linear-gradient(135deg, ${({ theme }) => theme.palette.primary.main} 0%, ${({ theme }) => theme.palette.primary.dark} 100%);
//   color: ${({ theme }) => theme.palette.primary.contrastText};
// `;

// const PodiumStepSecond = styled(PodiumStep)`
//   height: 150px;
//   background: linear-gradient(135deg, ${({ theme }) => theme.palette.primary.light} 0%, ${({ theme }) => theme.palette.primary.main} 100%);
//   color: ${({ theme }) => theme.palette.primary.contrastText};
// `;

// const PodiumStepThird = styled(PodiumStep)`
//   height: 100px;
//   background: linear-gradient(135deg, ${({ theme }) => theme.palette.primary.lighter} 0%, ${({ theme }) => theme.palette.primary.light} 100%);
//   color: ${({ theme }) => theme.palette.primary.contrastText};
// `;

// const RankingText = styled(Typography)`
//   font-size: 1.5rem;
//   font-weight: bold;
//   position: absolute;
//   top: 10px;
// `;

// const StudentNameText = styled(Typography)`
//   font-size: 1rem;
//   font-weight: bold;
//   margin-top: ${({ theme }) => theme.spacing(1)};
// `;

// const PercentageText = styled(Typography)`
//   font-size: 0.875rem;
//   margin-top: ${({ theme }) => theme.spacing(0.5)};
// `;

// const TrophyIcon = styled(Star)`
//   width: 50px;
//   height: 50px;
//   color: #fff;
// `;

// const BadgeIcon = styled(Grade)`
//   width: 50px;
//   height: 50px;
//   color: #fff;
// `;

// const AvatarContainer = styled(Box)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: ${({ theme }) => theme.spacing(2)};
// `;

// const Dashboard: React.FC = () => {
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [selectedClassId, setSelectedClassId] = useState<string>('');
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//   const [leaderboardData, setLeaderboardData] = useState<StudentResult[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   const fetchExams = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/exams');
//       setExams(response.data);
//     } catch (error) {
//       console.error('Error fetching exams:', error);
//     }
//   };

//   const fetchClasses = async (examId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/percentage/classes/${examId}`);
//       setClasses(response.data);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };

//   const handleClassChange = (event: SelectChangeEvent) => {
//     const classId = event.target.value as string;
//     setSelectedClassId(classId);
//     if (selectedExamId) {
//       fetchLeaderboardData(selectedExamId, classId);
//     }
//   };

//   const handleExamChange = async (event: SelectChangeEvent) => {
//     const examId = event.target.value as string;
//     setSelectedExamId(examId);
//     setSelectedClassId('');
//     await fetchClasses(examId);
//   };

//   const fetchLeaderboardData = async (examId: string, classId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/percentage/${examId}/${classId}`);
//       setLeaderboardData(response.data.slice(0, 3)); // Only top 3 students
//     } catch (error) {
//       console.error('Error fetching leaderboard data:', error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h3" component="h1" paragraph>
//         Dashboard
//       </Typography>
//       <Paper>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={8}>
//             <Box sx={{ flexGrow: 1 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth margin="normal" size="small" sx={{ width: '150px' }}>
//                     <InputLabel id="exam-label">Exam</InputLabel>
//                     <Select
//                       labelId="exam-label"
//                       id="exam"
//                       value={selectedExamId}
//                       onChange={handleExamChange}
//                     >
//                       {exams.map((exam) => (
//                         <MenuItem key={exam._id} value={exam._id}>
//                           {exam.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth margin="normal" size="small" sx={{ width: '150px' }}>
//                     <InputLabel id="class-label">Class</InputLabel>
//                     <Select
//                       labelId="class-label"
//                       id="class"
//                       value={selectedClassId}
//                       onChange={handleClassChange}
//                       disabled={!selectedExamId}
//                     >
//                       {classes.map((classItem) => (
//                         <MenuItem key={classItem._id} value={classItem._id}>
//                           {classItem.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       <LeaderboardContainer>
//         <Typography variant="h4" align="center" gutterBottom>
//           Leaderboard
//         </Typography>

//         <PodiumContainer>
//           {leaderboardData.length >= 2 && (
//             <AvatarContainer>
//               <Avatar
//                 src={`http://localhost:3000/${leaderboardData[1].studentId.profileImage}`}
//                 sx={{ width: 80, height: 80, marginBottom: '10px' }}
//               />
//               <StudentNameText>{leaderboardData[1].studentName}</StudentNameText>
//               <PercentageText>{leaderboardData[1].percentage}%</PercentageText>
//               <PodiumStepSecond>
//                 <RankingText>2nd</RankingText>
//                 <BadgeIcon />
//               </PodiumStepSecond>
//             </AvatarContainer>
//           )}
//           {leaderboardData.length >= 1 && (
//             <AvatarContainer>
//               <Avatar
//                 src={`http://localhost:3000/${leaderboardData[0].studentId.profileImage}`}
//                 sx={{ width: 100, height: 100, marginBottom: '10px' }}
//               />
//               <StudentNameText>{leaderboardData[0].studentName}</StudentNameText>
//               <PercentageText>{leaderboardData[0].percentage}%</PercentageText>
//               <PodiumStepFirst>
//                 <RankingText>1st</RankingText>
//                 <TrophyIcon />
//               </PodiumStepFirst>
//             </AvatarContainer>
//           )}
//           {leaderboardData.length >= 3 && (
//             <AvatarContainer>
//               <Avatar
//                 src={`http://localhost:3000/${leaderboardData[2].studentId.profileImage}`}
//                 sx={{ width: 80, height: 80, marginBottom: '10px' }}
//               />
//               <StudentNameText>{leaderboardData[2].studentName}</StudentNameText>
//               <PercentageText>{leaderboardData[2].percentage}%</PercentageText>
//               <PodiumStepThird>
//                 <RankingText>3rd</RankingText>
//                 <BadgeIcon />
//               </PodiumStepThird>
//             </AvatarContainer>
//           )}
//         </PodiumContainer>
//       </LeaderboardContainer>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
  Paper,
  Box,
  Avatar,
 Button,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useTheme } from '@mui/material/styles';
import Image from '../components/image';
import { styled } from '@mui/system';
import { MdSubject, MdClass, MdEvent, MdPeople } from 'react-icons/md';
import { SelectChangeEvent } from '@mui/material/Select';
import { Star, Grade, Height } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { keyframes } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
interface Event {
  title: string;
  date: string;
  starttime: string;
  endtime: string;
  description: string;
}
interface Exam {
  _id: string;
  name: string;
}

interface Class {
  _id: string;
  name: string;
}
interface Student {
  _id: string;
  gender: string;
}

interface StudentResult {
  studentId: {
    _id: string;
    profileImage: string;
  };
  studentName: string;
  percentage: number;
}
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  maxWidth: '350px',
}));

const StyledIcon = styled('div')(({ theme }) => ({
  fontSize: 48,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const StyledCount = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
}));
const LeaderboardContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',

  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
}));
const PercentageText = styled(Typography)`
  font-size: 0.875rem;
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
  color: ${({ theme }) => theme.palette.primary.main}; // or any other color from your theme
`;

const growShrink = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const PodiumContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const PodiumStep = styled(Box)`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.primary.light};
  margin: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.spacing(1)};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  animation: ${growShrink} 1.5s infinite alternate;
`;

const PodiumStepFirst = styled(PodiumStep)`
  height: 200px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.primary.main} 0%,
    ${({ theme }) => theme.palette.primary.dark} 100%
  );
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const PodiumStepSecond = styled(PodiumStep)`
  height: 150px;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.primary.light} 0%,
    ${({ theme }) => theme.palette.primary.main} 100%
  );
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const PodiumStepThird = styled(PodiumStep)`
  height: 100px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.primary.lighter} 0%,
    ${({ theme }) => theme.palette.primary.light} 100%
  );
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const RankingText = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  position: absolute;
  top: 10px;
`;

const StudentNameText = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const TrophyIcon = styled(EmojiEventsIcon)`
  width: 50px;
  height: 50px;
  color: #fff;
`;

const BadgeIcon = styled(Star)`
  width: 40px;
  height: 50px;
  color: #fff;
`;

const AvatarContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);

  const [exams, setExams] = useState<Exam[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [leaderboardData, setLeaderboardData] = useState<StudentResult[]>([]);
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [classCount, setClassCount] = useState<number>(0);
  const [examCount, setExamCount] = useState<number>(0);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [genderData, setGenderData] = useState<{ name: string; value: number }[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  
  const colors = [
    '#FFFDD7',
    '#DFF5FF',
    '#FFE6E6',
    '#BBE2EC',
    '#E1F0DA',
    '#EEF5FF',
    '#F6F7C4',
    '#F1EAFF',
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      'Jan', 'Feb', 'March', 'April', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    return monthNames[date.getMonth()];
  };

  const formatTime = (timeString: string) => {
    const time = timeString.split(":");
    let hours = parseInt(time[0], 10);
    let minutes = time[1];
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    return hours + ":" + minutes + " " + ampm;
  };
  useEffect(() => {
    fetchCounts();
    fetchGenderData();
  }, []);
  useEffect(() => {
    fetchExams();
  }, []);
  // useEffect(() => {
  //   if (selectedExamId && selectedClassId) {
  //     fetchLeaderboardData(selectedExamId, selectedClassId);
  //   }
  // }, [selectedExamId, selectedClassId]);

  // useEffect(() => {
  //   if (classes.length > 0) {
  //     setSelectedClassId(classes[0]._id); // Set the first class as default
  //   }
  // }, [classes]);
  useEffect(() => {
    if (selectedExamId && selectedClassId) {
      fetchLeaderboardData(selectedExamId, selectedClassId);
    }
  }, [selectedExamId, selectedClassId]);

  useEffect(() => {
    if (exams.length > 0) {
      setSelectedExamId(exams[0]._id); // Set the first exam as default
      fetchClasses(exams[0]._id); // Fetch classes for the first exam
    }
  }, [exams]);

  useEffect(() => {
    if (classes.length > 0) {
      setSelectedClassId(classes[0]._id); // Set the first class as default
      if (selectedExamId) {
        fetchLeaderboardData(selectedExamId, classes[0]._id);
      }
    }
  }, [classes, selectedExamId]);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/exams');
      setExams(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };
  const fetchClasses = async (examId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/percentage/classes/${examId}`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchCounts = async () => {
    try {
      const [subjectsResponse, classesResponse, examsResponse, studentsResponse] =
        await Promise.all([
          axios.get('http://localhost:3000/api/subjects'),
          axios.get('http://localhost:3000/api/classes'),
          axios.get('http://localhost:3000/api/exams'),
          axios.get('http://localhost:3000/api/students'),
        ]);

      setSubjectCount(subjectsResponse.data.length);
      setClassCount(classesResponse.data.length);
      setExamCount(examsResponse.data.length);
      setStudentCount(studentsResponse.data.length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching counts:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/event');

        setEvents(response.data.slice(0,4));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);
  const fetchGenderData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students');
      const students: Student[] = response.data;
      const genderCounts = students.reduce(
        (acc, student) => {
          if (student.gender === 'male') acc.male++;
          else if (student.gender === 'female') acc.female++;
          else acc.other++;
          return acc;
        },
        { male: 0, female: 0, other: 0 }
      );
      setGenderData([
        { name: 'Male', value: genderCounts.male },
        { name: 'Female', value: genderCounts.female },
        { name: 'Other', value: genderCounts.other },
      ]);
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };

  const COLORS: { [key: string]: string } = {
    male: theme.palette.primary.lighter,
    female: theme.palette.primary.main,
    other: theme.palette.primary.light,
  };
  console.log('COLORS:', COLORS);
  console.log('genderData:', genderData);
  const handleClassChange = (event: SelectChangeEvent) => {
    const classId = event.target.value as string;
    setSelectedClassId(classId);
    if (selectedExamId) {
      fetchLeaderboardData(selectedExamId, classId);
    }
  };

  const handleExamChange = async (event: SelectChangeEvent) => {
    const examId = event.target.value as string;
    setSelectedExamId(examId);
    setSelectedClassId('');
    await fetchClasses(examId);
  };

  const fetchLeaderboardData = async (examId: string, classId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/percentage/${examId}/${classId}`);
      setLeaderboardData(response.data.slice(0, 3)); // Only top 3 students
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  return (
    <div>
      <Typography variant="h3" component="h1" paragraph>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <StyledCard>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                  <StyledCount>{subjectCount}</StyledCount>
                  <Typography>Subjects</Typography>
                </Grid>
                <Grid>
                  <StyledIcon as={MdSubject} />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <StyledCard>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item></Grid>
                <Grid item xs>
                  <StyledCount>{classCount}</StyledCount>
                  <Typography>Classes</Typography>
                </Grid>
                <Grid item>
                  <StyledIcon as={MdClass} />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <StyledCard>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item></Grid>
                <Grid item xs>
                  <StyledCount>{examCount}</StyledCount>
                  <Typography>Exams</Typography>
                </Grid>
                <Grid item>
                  <StyledIcon as={MdEvent} />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={3}>
          <StyledCard>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs>
                  <StyledCount>{studentCount}</StyledCount>
                  <Typography>Students</Typography>
                </Grid>
                <Grid item>
                  <StyledIcon as={MdPeople} />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ height: '100%' }}>
        <Grid item xs={12} sm={7} lg={8}>
          <Box
            sx={{
              width: '100%',
              height: '200px',
              backgroundColor: (theme) => theme.palette.primary.lighter,
              padding: '20px',
              borderRadius: '15px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              marginTop: '20px',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: '20px',
            }}
          >
            <Box>
              <Typography
                variant="h4"
                style={{ fontFamily: 'Poppins', color: 'black', marginBottom: '10px' }}
              >
                Welcome To Academix! Academix brings you the expertise to help you control your
                schools in real-time from anywhere.
              </Typography>
            </Box>
            <Box sx={{ margin: '-87px' }}>
              <Image
                disabledEffect
                visibleByDefault
                alt="auth"
                src={'/assets/images/Tanu.png'}
                sx={{
                  maxWidth: '80%',
                  display: { xs: 'none', md: 'block' },
                }}
              />
            </Box>
          </Box>
          <Box sx={{display:'flex'}}> 
          <Box sx={{ marginTop: '5px',width:'70%' }}>
            <LeaderboardContainer>
              <Typography variant="h4" gutterBottom>
                Leaderboard
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Box display="flex" justifyContent="flex-start">
                          <FormControl
                            fullWidth
                            margin="normal"
                            size="small"
                            sx={{ width: '150px' }}
                          >
                            <InputLabel id="exam-label">Exam</InputLabel>
                            <Select
                              labelId="exam-label"
                              id="exam"
                              value={selectedExamId}
                              onChange={handleExamChange}
                              label="Exam"
                            >
                              {exams.map((exam) => (
                                <MenuItem key={exam._id} value={exam._id}>
                                  {exam.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sx={{ float: 'right' }}>
                        <Box display="flex" justifyContent="flex-end">
                          <FormControl
                            fullWidth
                            margin="normal"
                            size="small"
                            sx={{ width: '150px' }}
                          >
                            <InputLabel id="class-label">Class</InputLabel>
                            <Select
                              labelId="class-label"
                              id="class"
                              value={selectedClassId}
                              onChange={handleClassChange}
                              disabled={!selectedExamId}
                              label="Class"
                            >
                              {classes.map((classItem) => (
                                <MenuItem key={classItem._id} value={classItem._id}>
                                  {classItem.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <PodiumContainer>
                {leaderboardData.length >= 2 && (
                  <AvatarContainer>
                    <Avatar
                      src={`http://localhost:3000/${leaderboardData[1].studentId.profileImage}`}
                      sx={{ width: 80, height: 80, marginBottom: '10px' }}
                    />
                    <StudentNameText>{leaderboardData[1].studentName}</StudentNameText>
                    <PercentageText>{leaderboardData[1].percentage.toFixed(2)}%</PercentageText>
                    <PodiumStepSecond>
                      <RankingText>2nd</RankingText>
                      <BadgeIcon sx={{ color: '#fff' }} />
                    </PodiumStepSecond>
                  </AvatarContainer>
                )}
                {leaderboardData.length >= 1 && (
                  <AvatarContainer>
                    <Avatar
                      src={`http://localhost:3000/${leaderboardData[0].studentId.profileImage}`}
                      sx={{ width: 100, height: 100, marginBottom: '10px' }}
                    />
                    <StudentNameText>{leaderboardData[0].studentName}</StudentNameText>
                    <PercentageText>{leaderboardData[0].percentage.toFixed(2)}%</PercentageText>
                    <PodiumStepFirst>
                      <RankingText>1st</RankingText>
                      <TrophyIcon sx={{ color: '#fff' }} />
                    </PodiumStepFirst>
                  </AvatarContainer>
                )}
                {leaderboardData.length >= 3 && (
                  <AvatarContainer>
                    <Avatar
                      src={`http://localhost:3000/${leaderboardData[2].studentId.profileImage}`}
                      sx={{ width: 80, height: 80, marginBottom: '10px' }}
                    />
                    <StudentNameText>{leaderboardData[2].studentName}</StudentNameText>
                    <PercentageText>{leaderboardData[2].percentage.toFixed(2)}%</PercentageText>
                    <PodiumStepThird>
                      <RankingText>3rd</RankingText>
                      <BadgeIcon sx={{ color: '#fff', marginTop: '10px' }} />
                    </PodiumStepThird>
                  </AvatarContainer>
                )}
              </PodiumContainer>
            </LeaderboardContainer>
          </Box>
         
          <Box >
          <Grid item xs={12} sm={8} lg={4}>
          <Paper
            sx={{
              padding: 2,
              height: 565,
              width:400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // height: '100%',
              marginTop: 3,
              marginBottom: 2,
              marginLeft:2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
            }}
          >
            <ResponsiveContainer width="80%" height={400}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? theme.palette.primary.lighter : index === 1 ? theme.palette.primary.main : theme.palette.primary.light}
                    />
                  
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
          </Grid>
          </Box>
         
          </Box>
       
        </Grid>
      
 <Grid item xs={12} sm={5} lg={4}>
 <Paper
    sx={{
      padding: 3,
      height: '95%',
      marginTop: 3,
      marginBottom: 2,
      marginLeft: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: 3,
      backgroundColor: theme.palette.primary.lighter,
    }}
  ><Box sx={{display:'flex',justifyContent:'space-between'}}>
    <Typography variant="h4" gutterBottom style={{ color:  theme.palette.primary.main }}>
      Upcoming Events
    </Typography>
    <Button  >
           More
          </Button>
          </Box>
    {events.map((event, index) => (
      <Card key={index} sx={{
        marginBottom: '20px',
        width: '100%',
        borderRadius: 3,
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        },
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            // backgroundImage: `url(${event.imageURL})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            opacity: 0.1,
          }}
        />
        <CardContent>
          <Typography variant="h5" component="h2" sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            marginBottom: '10px',
            paddingLeft: '10px',
            textAlign: 'center',
          }}>
            {event.title}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <EventIcon style={{ marginRight: '10px', color: theme.palette.primary.main }} />
            <Typography variant="subtitle1" style={{ color: '#555' }}>
              {event.date.split('-')[2]} {getMonthName(event.date)} {event.date.split('-')[0]}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <WatchLaterOutlinedIcon style={{ marginRight: '10px', color: theme.palette.primary.main }} />
            <Typography variant="subtitle1" style={{ color: '#555' }}>
              {formatTime(event.starttime)}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <LocationOnIcon style={{ marginRight: '10px', color: theme.palette.primary.main }} /> */}
            {/* <Typography variant="subtitle1" style={{ color: '#555' }}>
              {event.location}
            </Typography> */}
          </div>
        </CardContent>
      </Card>
    ))}
  </Paper>


       </Grid>
      
        {/* <Grid item xs={12} sm={5} lg={4}>
          <Card sx={{ marginTop: 2, padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              {events.map((event, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary">
                            {event.date}
                          </Typography>
                          {' - '}
                          {event.description}
                        </>
                      }
                    />
                  </ListItem>
                  {index < events.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </Card>
        </Grid> */}
      
      </Grid>
    </div>
  );
};

export default Dashboard;

{/* <Paper
  sx={{
    padding: 3,
    height: '100%',
    marginTop: 3,
    marginBottom: 2,
    marginLeft: 2,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
  }}
>
  <Typography variant="h4" gutterBottom>
    Upcoming Events
  </Typography>
  {events.map((event, index) => (
    <Card key={index} sx={{
      marginBottom: '20px', 
      width: '100%', 
      marginTop: '20px', 
      // background: 'linear-gradient(135deg, #ece9e6 0%, #ffffff 100%)', 
      borderRadius: 3, 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
      }
    }}>
      <CardContent>
        <div style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: '10px', 
          backgroundColor: getRandomColor(), 
          padding: '10px', 
          borderRadius: '6px'
        }}>
          <Typography variant="h5" component="h2" style={{ color: '#ffffff', fontWeight: 700 }}>
            {event.title}
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <EventIcon style={{ marginRight: '10px', color: '#5f6368' }} />
          <Typography variant="subtitle1" style={{ color: '#424242' }}>
            {event.date.split('-')[2]} {getMonthName(event.date)} {event.date.split('-')[0]}
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#5f6368' }}>
          <WatchLaterOutlinedIcon style={{ marginRight: '10px' }} />
          <Typography variant="subtitle1" style={{ color: '#424242' }}>
            {formatTime(event.starttime)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  ))}
</Paper> */}