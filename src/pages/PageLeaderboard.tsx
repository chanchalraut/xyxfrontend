import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Typography,
  Avatar,
  Badge,
  styled,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

// Interfaces
interface Exam {
  _id: string;
  name: string;
}

interface Class {
  _id: string;
  name: string;
}

interface StudentResult {
  studentId: {
    _id: string;
    profileImage: string;
  };
  studentName: string;
  percentage: number;
}








const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const LeaderboardContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[3],
  borderRadius: theme.spacing(2),
}));

const TableWrapper = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const LoaderContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
}));

// Component
const PageLeaderboard: React.FC = () => {
  const theme = useTheme();
  const [exams, setExams] = useState<Exam[]>([]);
  const borderColor = theme.palette.primary.light;
    const borderStyle = `1px solid ${borderColor}`;
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/exams');
      setExams(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setLoading(false);
    }
  };

  const fetchClasses = async (examId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/percentage/classes/${examId}`);
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setLoading(false);
    }
  };

  const fetchResults = async (examId: string, classId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/percentage/${examId}/${classId}`);
      const sortedResults = response.data.sort((a: StudentResult, b: StudentResult) => b.percentage - a.percentage);
      setResults(sortedResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  const handleClassChange = (event: SelectChangeEvent) => {
    const classId = event.target.value as string;
    setSelectedClassId(classId);
    if (selectedExamId) {
      fetchResults(selectedExamId, classId);
    }
  };

  const handleExamChange = async (event: SelectChangeEvent) => {
    const examId = event.target.value as string;
    setSelectedExamId(examId);
    setSelectedClassId('');
    setResults([]);
    await fetchClasses(examId);
  };

  return (
    <>
      <Typography variant="h3" component="h1"   gutterBottom>
        Leaderboard
      </Typography>
      <LeaderboardContainer>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="exam-label">Select Exam</InputLabel>
              <Select
                labelId="exam-label"
                id="exam"
                value={selectedExamId}
                onChange={handleExamChange}
                label="Select Exam"
              >
                {exams.map((exam) => (
                  <MenuItem key={exam._id} value={exam._id}>
                    {exam.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="class-label">Select Class</InputLabel>
              <Select
                labelId="class-label"
                id="class"
                value={selectedClassId}
                onChange={handleClassChange}
                disabled={!selectedExamId}
                label="Select Class"
              >
                {classes.map((classItem) => (
                  <MenuItem key={classItem._id} value={classItem._id}>
                    {classItem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </LeaderboardContainer>

      {loading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        results.length > 0 && (
          <Paper>
          <TableWrapper >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell align="center">Rank</StyledTableHeadCell>
                  <StyledTableHeadCell align="center">Profile</StyledTableHeadCell>
                  <StyledTableHeadCell align="center">Student</StyledTableHeadCell>
                  <StyledTableHeadCell align="center">Percentage</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              
               <TableBody>
  {results
    .filter((result) => result.percentage > 35) // Filter out students with <= 35% score
    .map((result, index) => {
      let medalIcon;
      if (index === 0) {
        medalIcon = <span style={{ fontSize: '3.0em' }}>🥇</span>; // Gold medal for 1st place
      } else if (index === 1) {
        medalIcon = <span style={{ fontSize: '3.0em' }}>🥈</span>; // Silver medal for 2nd place
      } else if (index === 2) {
        medalIcon = <span style={{ fontSize: '3.0em' }}>🥉</span>; // Bronze medal for 3rd place
      }
      const formattedPercentage = result.percentage.toFixed(2);
      return (
        <StyledTableRow key={index} >
          <TableCell align="center" sx={{ fontWeight: 'bold'}}>{medalIcon || index + 1}</TableCell>
          <TableCell align="center">
    <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the content */}
      <Avatar src={`http://localhost:3000/${result.studentId.profileImage}`} alt={result.studentName} style={{ width: '50px', borderRadius: '50%' }} />
    </div>
  </TableCell>
          <TableCell align="center" sx={{ fontWeight: 'bold' }}> {result.studentName}</TableCell>
          <TableCell align="center" sx={{ fontWeight: 'bold'}}>{formattedPercentage}%</TableCell>
        </StyledTableRow>
      );
    })}
</TableBody>
            </Table>
          </TableWrapper>
          </Paper>
        )
      )}
    </>
  );
};

export default PageLeaderboard;








































// import React, { useState, useEffect } from 'react';
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Grid,
//   Typography,
//   styled,
// } from '@mui/material';
// import axios from 'axios';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { useTheme } from '@mui/material/styles';
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



// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.light,
//   color: theme.palette.primary.contrastText,
// }));



// const LeaderboardContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
//   boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
// }));

// const PageLeaderboard: React.FC = () => {
//   const theme = useTheme();
//   // const borderStyle = `1px solid ${theme.palette.divider}`;
//   const borderColor = theme.palette.primary.light;
//   const borderStyle = `1px solid ${borderColor}`;
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [selectedClassId, setSelectedClassId] = useState<string>('');
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//   const [results, setResults] = useState<StudentResult[]>([]);

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

  
//   const fetchResults = async (examId: string, classId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/percentage/${examId}/${classId}`);
//       const sortedResults = response.data.sort((a: StudentResult, b: StudentResult) => b.percentage - a.percentage);
//       console.log('Fetched results:', response.data); // Log the data to debug
//       setResults(sortedResults);
//     } catch (error) {
//       console.error('Error fetching results:', error);
//     }
//   };
  

//   const handleClassChange = (event: SelectChangeEvent) => {
//     const classId = event.target.value as string;
//     setSelectedClassId(classId);
//     if (selectedExamId) {
//       fetchResults(selectedExamId, classId);
//     }
//   };

//   const handleExamChange = async (event: SelectChangeEvent) => {
//     const examId = event.target.value as string;
//     setSelectedExamId(examId);
//     setSelectedClassId('');
//     setResults([]);
//     await fetchClasses(examId);
//   };

  

//   return (
//     <>
//       <Typography variant="h3" component="h1" sx={{ marginBottom: '20px' }}>
//         Leaderboard
//       </Typography>
//       <LeaderboardContainer>
//         <Grid container spacing={2} justifyContent="center">
//           <Grid item xs={6}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="exam-label">Exam</InputLabel>
//               <Select
//                 labelId="exam-label"
//                 id="exam"
//                 value={selectedExamId}
//                 onChange={handleExamChange}
//               >
//                 {exams.map((exam) => (
//                   <MenuItem key={exam._id} value={exam._id}>
//                     {exam.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={6}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="class-label">Class</InputLabel>
//               <Select
//                 labelId="class-label"
//                 id="class"
//                 value={selectedClassId}
//                 onChange={handleClassChange}
//                 disabled={!selectedExamId}
//               >
//                 {classes.map((classItem) => (
//                   <MenuItem key={classItem._id} value={classItem._id}>
//                     {classItem.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </LeaderboardContainer>

//       {results.length > 0 && (
       

// <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
// <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }}>
//   <TableHead>
//     <StyledTableRow sx={{ backgroundColor: '#f0f0f0' }}>
//       <StyledTableHeadCell align="center" sx={{ fontWeight: 'bold', border: borderStyle }}>Rank</StyledTableHeadCell>
//       <StyledTableHeadCell align="center" sx={{ fontWeight: 'bold', border: borderStyle }}>Student Name</StyledTableHeadCell>
//       <StyledTableHeadCell align="center" sx={{ fontWeight: 'bold', border: borderStyle }}>Percentage</StyledTableHeadCell>
    
//     </StyledTableRow>
//   </TableHead>

 
  
// <TableBody>
//   {results
//     .filter((result) => result.percentage > 35) // Filter out students with <= 35% score
//     .map((result, index) => {
//       let medalIcon;
//       if (index === 0) {
//         medalIcon = <span style={{ fontSize: '2.5em' }}>🥇</span>; // Gold medal for 1st place
//       } else if (index === 1) {
//         medalIcon = <span style={{ fontSize: '2.5em' }}>🥈</span>; // Silver medal for 2nd place
//       } else if (index === 2) {
//         medalIcon = <span style={{ fontSize: '2.5em' }}>🥉</span>; // Bronze medal for 3rd place
//       }
//       const formattedPercentage = result.percentage.toFixed(2);
//       return (
//         <StyledTableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
//           <TableCell align="center" sx={{ fontWeight: 'bold', border: borderStyle }}>{medalIcon || index + 1}</TableCell>
//           <TableCell align="center" sx={{ fontWeight: 'bold', border: borderStyle }}>
//             <img src={`http://localhost:3000/${result.studentId.profileImage}`} alt={result.studentName} style={{ width: '50px', borderRadius: '50%' }} />
//             {result.studentName}
//           </TableCell>
//           <TableCell align="center" sx={{ fontWeight: 'bold', border: borderStyle }}>{formattedPercentage}%</TableCell>
//         </StyledTableRow>
//       );
//     })}
// </TableBody>



// </Table>
// </TableContainer>

//       )}
//     </>
//   );
// };

// export default PageLeaderboard;
































