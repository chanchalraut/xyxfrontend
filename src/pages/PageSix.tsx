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
  Box,
  Button,
  styled,
  CircularProgress,
  Snackbar,
  IconButton,
  SnackbarContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSettingsContext } from '../components/settings';

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

interface StyledPercentageCellProps {
  pass: boolean;
}

const StyledPercentageCell = styled(TableCell)<StyledPercentageCellProps>`
  font-weight: bold;
  color: ${(props) => (props.pass ? '#388e3c' : '#d32f2f')};
`;

const StyledStatusCell = styled(TableCell)<StyledPercentageCellProps>`
  color: ${(props) => (props.pass ? '#388e3c' : '#d32f2f')};
  font-weight: bold;
`;

interface FetchSubjectsParams {
  subjectIds: string[];
  examId: string;
  classId: string;
}

const PageSix: React.FC = () => {
  const { themeStretch } = useSettingsContext();

  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [exams, setExams] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [marksData, setMarksData] = useState<any[]>([]);
  const [examId, setExamId] = useState<string>(''); // Set the exam ID here
  const [classId, setClassId] = useState<string>(''); // Set the class ID here
  const [subjects, setSubjects] = useState<any[]>([]); // State to store subjects
  const [uniqueStudentNames, setUniqueStudentNames] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExamId && selectedClassId) {
      fetchMarksData(selectedExamId, selectedClassId);
    }
  }, [selectedExamId, selectedClassId]);

  useEffect(() => {
    console.log('First object in marksData:', marksData[0]); // Add this line
  }, [marksData]);

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
      const response = await axios.get(`http://localhost:3000/api/marks/classes/${examId}`);
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchMarksData = async (examId: string, classId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/marks/${examId}/${classId}`);
      const marksData = response.data;
      const subjectIds = marksData.map((mark: any) => mark.subjectId?._id);
      await fetchSubjects({ subjectIds, examId, classId });
      extractUniqueStudentNames(marksData);
      setMarksData(marksData);
    } catch (error) {
      console.error('Error fetching marks data:', error);
    }
  };

  const fetchSubjects = async ({ subjectIds, examId, classId }: FetchSubjectsParams) => {
    try {
      // Fetch subjects based on the subject IDs obtained from marks data
      const response = await axios.get(`http://localhost:3000/api/subjects?ids=${subjectIds.join(',')}&examId=${examId}&classId=${classId}`);
      const subjectsWithMarks = response.data.filter((subject: any) => subjectIds.includes(subject._id));
      setSubjects(subjectsWithMarks);
      console.log('subjects:', subjectsWithMarks); // Log subjects here
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const extractUniqueStudentNames = (data: any[]) => {
    const uniqueNames = Array.from(new Set(data.map(mark => mark.studentMarks[0]?.studentId?.studentName)));
    setUniqueStudentNames(uniqueNames);
  };

  const handleExamChange = async (event: SelectChangeEvent) => {
    const examId = event.target.value as string;
    setSelectedExamId(examId);
    setSelectedClassId(''); // Reset selected class when exam changes
    await fetchClasses(examId);
    setSubjects([]); // Reset subjects when exam changes
  };

  const handleClassChange = (event: SelectChangeEvent) => {
    setSelectedClassId(event.target.value as string);
  };

  const handleSaveAllPercentages = async () => {
    try {
      const studentData = uniqueStudentNames.map((studentName) => {
        const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === studentName);
        const studentId = studentMarks[0]?.studentMarks[0]?.studentId._id;
        let totalMarks = 0;
        subjects.forEach((subject) => {
          const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
          totalMarks += mark ? mark.studentMarks[0].marks : 0;
        });
        const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
        const percentage = (totalMarks / maxPossibleMarks) * 100;

        // Return an object containing all necessary data including percentage
        return { examId: selectedExamId, studentId, classId: selectedClassId, studentName, percentage };
      });

      await axios.post('http://localhost:3000/api/percentage/save', studentData);
      setSnackbarMessage('All percentages saved successfully');
      setSnackbarOpen(true);
      console.log('All percentages saved successfully');
    } catch (error) {
      console.error('Error saving percentages:', error);
    }
  };

  return (
    <div>
      <Typography variant="h3" component="h1">
        Percentage
      </Typography>
      <Paper elevation={10} sx={{ padding: '20px', marginTop: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="exam-label">Exam</InputLabel>
              <Select
                labelId="exam-label"
                id="exam"
                value={selectedExamId}
                onChange={handleExamChange}
                label="Class"
              >
                {exams.map((exam) => (
                  <MenuItem key={exam._id} value={exam._id}>
                    {exam.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
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
          </Grid>
        </Grid>
      </Paper>
      {selectedExamId && selectedClassId && (
        <Paper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell align="center">Student Name</StyledTableHeadCell>
                  {subjects.map((subject) => (
                    <StyledTableHeadCell key={subject._id} align="center">{subject.name}</StyledTableHeadCell>
                  ))}
                  <StyledTableHeadCell align="center">Percentage</StyledTableHeadCell>
                  <StyledTableHeadCell align="center">Status</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueStudentNames.map((studentName) => {
                  const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === studentName);
                  let totalMarks = 0;
                  subjects.forEach((subject) => {
                    const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
                    totalMarks += mark ? mark.studentMarks[0].marks : 0;
                  });
                  const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
                  const percentage = (totalMarks / maxPossibleMarks) * 100;
                  const isPass = percentage > 35;
                  return (
                    <StyledTableRow key={studentName}>
                      <TableCell align="center">{studentName}</TableCell>
                      {subjects.map((subject) => {
                        const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
                        return <TableCell key={subject._id} align="center">{mark ? mark.studentMarks[0].marks : 'N/A'}</TableCell>;
                      })}
                      <StyledPercentageCell align="center" pass={isPass}>{percentage.toFixed(2)}%</StyledPercentageCell>
                      <StyledStatusCell align="center" pass={isPass}>{isPass ? 'Pass' : 'Fail'}</StyledStatusCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableWrapper>
        </Paper>
      )}
      <Box textAlign="right" mt={2}>
        <Button variant="contained" color="primary" onClick={handleSaveAllPercentages}>
          Save All
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent
          style={{ backgroundColor: 'green', color: 'white' }}
          message={
            <Box display="flex" alignItems="center">
              <CheckCircleIcon style={{ marginRight: '8px' }} />
              {snackbarMessage}
            </Box>
          }
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
};

export default PageSix;

// import React, { useState, useEffect } from 'react';
// import {
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TableContainer,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,Paper,Grid,Typography,Box,Button
//   } from '@mui/material';
// import axios from 'axios';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { styled } from '@mui/system';
// const StyledTableContainer = styled(TableContainer)`
//   margin: 20px;
// `;

// const StyledPaper = styled(Paper)`
//   background: linear-gradient(45deg, #f3f3f3 30%, #ffffff 90%);
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const StyledTable = styled(Table)`
//   min-width: 650px;
// `;

// const StyledTableHead = styled(TableHead)`
//   background-color: #1976d2;
//   color: white;
// `;

// const StyledTableRow = styled(TableRow)`
//   &:nth-of-type(odd) {
//     background-color: #ffffff;
//   }
// `;

// const StyledTableCell = styled(TableCell)`
//   padding: 16px;
//   font-weight: bold;
// `;

// // const StyledPercentageCell = styled(TableCell)`
// //   font-weight: bold;
// //   color: #388e3c;
// // `;
// interface StyledPercentageCellProps {
//   pass: boolean;
// }

// const StyledPercentageCell = styled(TableCell)<StyledPercentageCellProps>`
//   font-weight: bold;
//   color: ${(props) => (props.pass ? '#388e3c' : '#d32f2f')};
// `;

// const StyledStatusCell = styled(TableCell)<StyledPercentageCellProps>`
//   color: ${(props) => (props.pass ? '#388e3c' : '#d32f2f')};
//   font-weight: bold;
// `;

// interface FetchSubjectsParams {
//   subjectIds: string[];
//   examId: string;
//   classId: string;
// }
// const PageSix: React.FC = () => {
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//   const [exams, setExams] = useState<any[]>([]);
//   const [classes, setClasses] = useState<any[]>([]);
//   const [selectedClassId, setSelectedClassId] = useState<string>('');
//   const [marksData, setMarksData] = useState<any[]>([]);
//   const [examId, setExamId] = useState<string>(''); // Set the exam ID here
//   const [classId, setClassId] = useState<string>(''); // Set the class ID here
//   const [subjects, setSubjects] = useState<any[]>([]); // State to store subjects
//   const [uniqueStudentNames, setUniqueStudentNames] = useState<string[]>([]);
  


//   useEffect(() => {
//     fetchExams();
//   }, []);
  
//   useEffect(() => {
//     if (selectedExamId && selectedClassId) {
//       fetchMarksData(selectedExamId, selectedClassId);
//     }
//   }, [selectedExamId, selectedClassId]);
  
//   useEffect(() => {
//     console.log('First object in marksData:', marksData[0]); // Add this line
//   }, [marksData]);
  
//     const fetchExams = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/exams');
//       setExams(response.data);
//     } catch (error) {
//       console.error('Error fetching exams:', error);
//     }
//   };

//   const fetchClasses = async (examId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/marks/classes/${examId}`);
//       setClasses(response.data);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };
  
//   const fetchMarksData = async (examId: string, classId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/marks/${examId}/${classId}`);
//       const marksData = response.data;
//       const subjectIds = marksData.map((mark: any) => mark.subjectId?._id);
//       await fetchSubjects({ subjectIds, examId, classId });
//       extractUniqueStudentNames(marksData);
//       setMarksData(marksData);
//     } catch (error) {
//       console.error('Error fetching marks data:', error);
//     }
//   };
  
//   const fetchSubjects = async ({ subjectIds, examId, classId }: FetchSubjectsParams) => {
//     try {
//       // Fetch subjects based on the subject IDs obtained from marks data
//       const response = await axios.get(`http://localhost:3000/api/subjects?ids=${subjectIds.join(',')}&examId=${examId}&classId=${classId}`);
//       const subjectsWithMarks = response.data.filter((subject: any) => subjectIds.includes(subject._id));
//       setSubjects(subjectsWithMarks);
//       console.log('subjects:', subjectsWithMarks); // Log subjects here
//     } catch (error) {
//       console.error('Error fetching subjects:', error);
//     }
//   };
  
  
  
  
//   const extractUniqueStudentNames = (data: any[]) => {
//     const uniqueNames = Array.from(new Set(data.map(mark => mark.studentMarks[0]?.studentId?.studentName)));
//     setUniqueStudentNames(uniqueNames);
//   };

  
//   const handleExamChange = async (event: SelectChangeEvent) => {
//     const examId = event.target.value as string;
//     setSelectedExamId(examId);
//     setSelectedClassId(''); // Reset selected class when exam changes
//     await fetchClasses(examId);
//     setSubjects([]); // Reset subjects when exam changes
//   };
  

//   const handleClassChange = (event: SelectChangeEvent) => {
//     setSelectedClassId(event.target.value as string);
    
//   };
 
 
  
//   const handleSaveAllPercentages = async () => {
//     try {
//       const studentData = uniqueStudentNames.map((studentName) => {
//         const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === studentName);
//         const studentId = studentMarks[0]?.studentMarks[0]?.studentId._id;
//         let totalMarks = 0;
//         subjects.forEach((subject) => {
//           const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
//           totalMarks += mark ? mark.studentMarks[0].marks : 0;
//         });
//         const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
//         const percentage = (totalMarks / maxPossibleMarks) * 100;

//         // Return an object containing all necessary data including percentage
//         return { examId: selectedExamId, studentId, classId: selectedClassId, studentName, percentage };
//       });

//       await axios.post('http://localhost:3000/api/percentage/save', studentData);

//       console.log('All percentages saved successfully');
//     } catch (error) {
//       console.error('Error saving percentages:', error);
//     }
//   };

  
  

//   return (
//     <div>
//        <Typography variant="h3" component="h1">
//           Percentage
//         </Typography>
//        <Paper elevation={10} sx={{ padding: '20px', marginTop:'10px'}}>
//       <Grid container spacing={2}> 
//    <Grid item xs={6}>
//       <FormControl fullWidth margin="normal">
//         <InputLabel id="exam-label">Exam</InputLabel>
//         <Select
//           labelId="exam-label"
//           id="exam"
//           value={selectedExamId}
//           onChange={handleExamChange}
//           label="Class"
//         >
//           {exams.map((exam) => (
//             <MenuItem key={exam._id} value={exam._id}>
//               {exam.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       </Grid>
//       <Grid item xs={6}>
//       <FormControl fullWidth margin="normal">
//         <InputLabel id="class-label">Class</InputLabel>
//         <Select
//           labelId="class-label"
//           id="class"
//           value={selectedClassId}
//           onChange={handleClassChange}
//           disabled={!selectedExamId}
//           label="Class"
//         >
//           {classes.map((classItem) => (
//             <MenuItem key={classItem._id} value={classItem._id}>
//               {classItem.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       </Grid>
//       </Grid>
//       </Paper>
//       {selectedExamId && selectedClassId && (
// <Paper>
// <StyledTableContainer>
//   <StyledPaper>
//     <StyledTable>
//       <StyledTableHead>
//         <TableRow>
//           <StyledTableCell>Student Name</StyledTableCell>
//           {subjects.map((subject) => (
//             <StyledTableCell key={subject._id}>{subject.name}</StyledTableCell>
//           ))}
//           <StyledTableCell>Percentage</StyledTableCell>
//           <StyledTableCell>Status</StyledTableCell>
//         </TableRow>
//       </StyledTableHead>
     
//       <TableBody>
//   {uniqueStudentNames.map((studentName) => {
//     const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === studentName);
//     let totalMarks = 0;
//     subjects.forEach((subject) => {
//       const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
//       totalMarks += mark ? mark.studentMarks[0].marks : 0;
//     });
//     const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
//     const percentage = (totalMarks / maxPossibleMarks) * 100;
//     const pass = percentage >= 35;

//     return (
//       <TableRow key={studentName}>
//         <TableCell>{studentName}</TableCell>
//         {subjects.map((subject) => {
//           const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
//           return <TableCell key={subject._id}>{mark ? mark.studentMarks[0].marks : '-'}</TableCell>;
//         })}
//        <StyledPercentageCell pass={pass}>{percentage > 100 ? '100.00%' : percentage.toFixed(2) + '%'}</StyledPercentageCell >
//         <StyledStatusCell pass={pass}>{pass ? 'Pass' : 'Fail'}</StyledStatusCell>
//       </TableRow>
//     );
//   })}
// </TableBody>

//     </StyledTable>
//   </StyledPaper>
// </StyledTableContainer>

// <Button sx={{float:'right'}} variant="contained" onClick={handleSaveAllPercentages}>Save All</Button>

  
//     </Paper>

// )}
//     </div>
//   );
// };

// export default PageSix;



