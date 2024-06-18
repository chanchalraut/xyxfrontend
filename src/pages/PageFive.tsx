import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  styled,
} from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';
import jsPDF from 'jspdf';

const StyledReportContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
}));

const StyledReportHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderBottom: '2px solid #ccc',
  paddingBottom: theme.spacing(1),
}));

const StyledSubjectRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 0),
  borderBottom: '1px solid #ccc',
}));

const StyledTotalRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 0),
  borderTop: '2px solid #ccc',
  marginTop: theme.spacing(1),
  fontWeight: 'bold',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const PageFive: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [exams, setExams] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedStudentName, setSelectedStudentName] = useState<string>('');
  const [marksData, setMarksData] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [uniqueStudentNames, setUniqueStudentNames] = useState<string[]>([]);

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExamId && selectedClassId) {
      fetchMarksData(selectedExamId, selectedClassId);
    }
  }, [selectedExamId, selectedClassId]);

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

  const fetchSubjects = async ({ subjectIds, examId, classId }: { subjectIds: string[], examId: string, classId: string }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/subjects?ids=${subjectIds.join(',')}&examId=${examId}&classId=${classId}`);
      const subjectsWithMarks = response.data.filter((subject: any) => subjectIds.includes(subject._id));
      setSubjects(subjectsWithMarks);
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
    setSelectedStudentName(''); // Reset selected student when exam changes
    await fetchClasses(examId);
    setSubjects([]); // Reset subjects when exam changes
  };

  const handleClassChange = (event: SelectChangeEvent) => {
    setSelectedClassId(event.target.value as string);
    setSelectedStudentName(''); // Reset selected student when class changes
  };

  const handleStudentChange = (event: SelectChangeEvent) => {
    setSelectedStudentName(event.target.value as string);
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

      console.log('All percentages saved successfully');
    } catch (error) {
      console.error('Error saving percentages:', error);
    }
  };

  const handleDownloadReportCard = () => {
    const doc = new jsPDF();
    const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName);
    const student = studentMarks[0]?.studentMarks[0]?.studentId;

    if (!student) {
      return;
    }

    doc.text(`Report Card for ${student.studentName}`, 20, 10);
    doc.text(`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`, 20, 20);
    doc.text(`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`, 20, 30);

    subjects.forEach((subject) => {
      const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
      // doc.text(`${subject.name}: ${mark ? mark.studentMarks[0].marks : 'N/A'}`, 20, doc.autoTable.previous.finalY + 40);
    });

    const totalMarks = studentMarks.reduce((acc, mark) => acc + (mark.studentMarks[0].marks || 0), 0);
    const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
    const percentage = (totalMarks / maxPossibleMarks) * 100;
    const isPass = percentage > 35;

    // doc.text(`Total Marks: ${totalMarks}`, 20, doc.autoTable.previous.finalY + 60);
    // doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, doc.autoTable.previous.finalY + 70);
    // doc.text(`Status: ${isPass ? 'Pass' : 'Fail'}`, 20, doc.autoTable.previous.finalY + 80);

    doc.save(`Report_Card_${student.studentName}.pdf`);
  };

  return (
    <div>
      <Typography variant="h3" component="h1" gutterBottom>
        Report Card
      </Typography>
      <Paper elevation={10} sx={{ padding: '20px', marginTop: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
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
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="student-label">Student</InputLabel>
              <Select
                labelId="student-label"
                id="student"
                value={selectedStudentName}
                onChange={handleStudentChange}
                disabled={!selectedClassId}
                label="Student"
              >
                {uniqueStudentNames.map((studentName, index) => (
                  <MenuItem key={index} value={studentName}>
                    {studentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleDownloadReportCard}
          disabled={!selectedStudentName}
        >
          Download Report Card
        </StyledButton>

        {selectedStudentName && (
          <StyledReportContainer>
            <StyledReportHeader>
              <Typography variant="h4" gutterBottom>
                {`Report Card for ${selectedStudentName}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`}
              </Typography>
            </StyledReportHeader>

            {subjects.map((subject) => {
              const mark = marksData.find((m) => m.subjectId?._id === subject._id && m.studentMarks[0]?.studentId.studentName === selectedStudentName);
              return (
                <StyledSubjectRow key={subject._id}>
                  <Typography variant="body1">{subject.name}</Typography>
                  <Typography variant="body1">{mark ? mark.studentMarks[0].marks : 'N/A'}</Typography>
                </StyledSubjectRow>
              );
            })}

            <StyledTotalRow>
              <Typography variant="body1">Total Marks</Typography>
              <Typography variant="body1">
                {marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0)}
              </Typography>
            </StyledTotalRow>
            <StyledTotalRow>
              <Typography variant="body1">Percentage</Typography>
              <Typography variant="body1">
                {(
                  (marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
                  (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))
                ) * 100).toFixed(2)}%
              </Typography>
            </StyledTotalRow>
            <StyledTotalRow>
              <Typography variant="body1">Status</Typography>
              <Typography variant="body1">
                {(marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
                  (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))) * 100 > 35 ? 'Pass' : 'Fail'}
              </Typography>
            </StyledTotalRow>
          </StyledReportContainer>
        )}
      </Paper>
    </div>
  );
};

export default PageFive;

//here are more desing

// import React, { useState, useEffect } from 'react';
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   styled,
// } from '@mui/material';
// import axios from 'axios';
// import { SelectChangeEvent } from '@mui/material/Select';
// import jsPDF from 'jspdf';

// const StyledReportContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(3),
//   backgroundColor: '#f0f0f0',
//   borderRadius: '8px',
// }));

// const StyledReportHeader = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   borderBottom: '1px solid #ccc',
// }));

// const StyledSubjectRow = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: theme.spacing(1, 0),
//   borderBottom: '1px solid #ccc',
// }));

// const StyledTotalRow = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: theme.spacing(1, 0),
//   borderTop: '1px solid #ccc',
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(2),
// }));

// const PageFive: React.FC = () => {
//   // State variables...
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//     const [exams, setExams] = useState<any[]>([]);
//     const [classes, setClasses] = useState<any[]>([]);
//     const [selectedClassId, setSelectedClassId] = useState<string>('');
//     const [selectedStudentName, setSelectedStudentName] = useState<string>('');
//     const [marksData, setMarksData] = useState<any[]>([]);
//     const [subjects, setSubjects] = useState<any[]>([]);
//     const [uniqueStudentNames, setUniqueStudentNames] = useState<string[]>([]);
  
//     useEffect(() => {
//       fetchExams();
//     }, []);
  
//     useEffect(() => {
//       if (selectedExamId && selectedClassId) {
//         fetchMarksData(selectedExamId, selectedClassId);
//       }
//     }, [selectedExamId, selectedClassId]);
  
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/exams');
//         setExams(response.data);
//       } catch (error) {
//         console.error('Error fetching exams:', error);
//       }
//     };
  
//     const fetchClasses = async (examId: string) => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/marks/classes/${examId}`);
//         setClasses(response.data);
//       } catch (error) {
//         console.error('Error fetching classes:', error);
//       }
//     };
  
//     const fetchMarksData = async (examId: string, classId: string) => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/marks/${examId}/${classId}`);
//         const marksData = response.data;
//         const subjectIds = marksData.map((mark: any) => mark.subjectId?._id);
//         await fetchSubjects({ subjectIds, examId, classId });
//         extractUniqueStudentNames(marksData);
//         setMarksData(marksData);
//       } catch (error) {
//         console.error('Error fetching marks data:', error);
//       }
//     };
  
//     const fetchSubjects = async ({ subjectIds, examId, classId }: { subjectIds: string[], examId: string, classId: string }) => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/subjects?ids=${subjectIds.join(',')}&examId=${examId}&classId=${classId}`);
//         const subjectsWithMarks = response.data.filter((subject: any) => subjectIds.includes(subject._id));
//         setSubjects(subjectsWithMarks);
//       } catch (error) {
//         console.error('Error fetching subjects:', error);
//       }
//     };
  
//     const extractUniqueStudentNames = (data: any[]) => {
//       const uniqueNames = Array.from(new Set(data.map(mark => mark.studentMarks[0]?.studentId?.studentName)));
//       setUniqueStudentNames(uniqueNames);
//     };
  
//     const handleExamChange = async (event: SelectChangeEvent) => {
//       const examId = event.target.value as string;
//       setSelectedExamId(examId);
//       setSelectedClassId(''); // Reset selected class when exam changes
//       setSelectedStudentName(''); // Reset selected student when exam changes
//       await fetchClasses(examId);
//       setSubjects([]); // Reset subjects when exam changes
//     };
  
//     const handleClassChange = (event: SelectChangeEvent) => {
//       setSelectedClassId(event.target.value as string);
//       setSelectedStudentName(''); // Reset selected student when class changes
//     };
  
//     const handleStudentChange = (event: SelectChangeEvent) => {
//       setSelectedStudentName(event.target.value as string);
//     };
  
//     const handleSaveAllPercentages = async () => {
//       try {
//         const studentData = uniqueStudentNames.map((studentName) => {
//           const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === studentName);
//           const studentId = studentMarks[0]?.studentMarks[0]?.studentId._id;
//           let totalMarks = 0;
//           subjects.forEach((subject) => {
//             const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
//             totalMarks += mark ? mark.studentMarks[0].marks : 0;
//           });
//           const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
//           const percentage = (totalMarks / maxPossibleMarks) * 100;
  
//           // Return an object containing all necessary data including percentage
//           return { examId: selectedExamId, studentId, classId: selectedClassId, studentName, percentage };
//         });
  
//         await axios.post('http://localhost:3000/api/percentage/save', studentData);
  
//         console.log('All percentages saved successfully');
//       } catch (error) {
//         console.error('Error saving percentages:', error);
//       }
//     };
  
//     const handleDownloadReportCard = () => {
//       const doc = new jsPDF();
//       const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName);
//       const student = studentMarks[0]?.studentMarks[0]?.studentId;
  
//       if (!student) {
//         return;
//       }
  
//       doc.text(`Report Card for ${student.studentName}`, 20, 10);
//       doc.text(`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`, 20, 20);
//       doc.text(`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`, 20, 30);
  
//       subjects.forEach((subject) => {
//         const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
//         // doc.text(`${subject.name}: ${mark ? mark.studentMarks[0].marks : 'N/A'}`, 20, doc.autoTable.previous.finalY + 40);
//       });
  
//       const totalMarks = studentMarks.reduce((acc, mark) => acc + (mark.studentMarks[0].marks || 0), 0);
//       const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
//       const percentage = (totalMarks / maxPossibleMarks) * 100;
//       const isPass = percentage > 35;
  
//       // doc.text(`Total Marks: ${totalMarks}`, 20, doc.autoTable.previous.finalY + 60);
//       // doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, doc.autoTable.previous.finalY + 70);
//       // doc.text(`Status: ${isPass ? 'Pass' : 'Fail'}`, 20, doc.autoTable.previous.finalY + 80);
  
//       doc.save(`Report_Card_${student.studentName}.pdf`);
//     };
  
//   return (
//     <div>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Report Card
//       </Typography>
//       <Paper elevation={10} sx={{ padding: '20px', marginTop: '10px' }}>
//         <Grid container spacing={2}>
//           {/* Exam select */}
//           <Grid item xs={4}>
//            <FormControl fullWidth margin="normal">
//                <InputLabel id="exam-label">Exam</InputLabel>
//                <Select
//                 labelId="exam-label"
//                 id="exam"
//                 value={selectedExamId}
//                 onChange={handleExamChange}
//                 label="Exam"
//               >
//                 {exams.map((exam) => (
//                   <MenuItem key={exam._id} value={exam._id}>
//                     {exam.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           {/* Class select */}
//           <Grid item xs={4}>
//              <FormControl fullWidth margin="normal">
//                <InputLabel id="class-label">Class</InputLabel>               <Select
//                 labelId="class-label"
//                 id="class"
//                 value={selectedClassId}
//                 onChange={handleClassChange}
//                 disabled={!selectedExamId}
//                 label="Class"
//               >
//                 {classes.map((classItem) => (
//                   <MenuItem key={classItem._id} value={classItem._id}>
//                     {classItem.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           {/* Student select */}
//           <Grid item xs={4}>
//              <FormControl fullWidth margin="normal">
//                <InputLabel id="student-label">Student</InputLabel>
//                <Select
//                 labelId="student-label"
//                 id="student"
//                 value={selectedStudentName}
//                 onChange={handleStudentChange}
//                 disabled={!selectedClassId}
//                 label="Student"
//               >
//                 {uniqueStudentNames.map((studentName, index) => (
//                   <MenuItem key={index} value={studentName}>
//                     {studentName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         {/* </Grid> */}

//         {/* Download button */}
//         <StyledButton
//           variant="contained"
//           color="primary"
//           onClick={handleDownloadReportCard}
//           disabled={!selectedStudentName}
//         >
//           Download Report Card
//         </StyledButton>

//         {/* Report card container */}
//         {selectedStudentName && (
//           <StyledReportContainer>
//             {/* Report header */}
//             <StyledReportHeader>
//               <Typography variant="h4" gutterBottom>
//                 {`Report Card for ${selectedStudentName}`}
//               </Typography>
//               <Typography variant="h6" gutterBottom>
//                 {`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`}
//               </Typography>
//               <Typography variant="h6" gutterBottom>
//                 {`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`}
//               </Typography>
//             </StyledReportHeader>

//             {/* Subject-wise marks */}
//             {subjects.map((subject) => {
//               const mark = marksData.find((m) => m.subjectId?._id === subject._id && m.studentMarks[0]?.studentId.studentName === selectedStudentName);
//               return (
//                 <StyledSubjectRow key={subject._id}>
//                   <Typography variant="body1">{subject.name}</Typography>
//                   <Typography variant="body1">{mark ? mark.studentMarks[0].marks : 'N/A'}</Typography>
//                 </StyledSubjectRow>
//               );
//             })}

//             {/* Total Marks and Percentage */}
//             <StyledTotalRow>
//               <Typography variant="body1">Total Marks</Typography>
//               <Typography variant="body1">
//                 {marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0)}
//               </Typography>
//             </StyledTotalRow>
//             <StyledTotalRow>
//               <Typography variant="body1">Percentage</Typography>
//               <Typography variant="body1">
//                 {(
//                   (marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
//                   (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))
//                 ) * 100).toFixed(2)}%
//               </Typography>
//             </StyledTotalRow>
//             <StyledTotalRow>
//               <Typography variant="body1">Status</Typography>
//               <Typography variant="body1">
//                 {
//                   (marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
//                   (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))
//                 ) * 100 > 35 ? 'Pass' : 'Fail'}
//               </Typography>
//             </StyledTotalRow>
//           </StyledReportContainer>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default PageFive;



// add some desing to report card

// import React, { useState, useEffect } from 'react';
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   styled,
// } from '@mui/material';
// import axios from 'axios';
// import { SelectChangeEvent } from '@mui/material/Select';
// import jsPDF from 'jspdf';

// // const StyledReportContainer = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(3),
// //   marginTop: theme.spacing(3),
// // }));
// const StyledReportContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(3),
//   backgroundColor: '#f0f0f0',
//   borderRadius: '8px',
// }));

// const StyledReportHeader = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   borderBottom: '1px solid #ccc',
// }));

// const StyledSubjectRow = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: theme.spacing(1, 0),
//   borderBottom: '1px solid #ccc',
// }));

// const StyledTotalRow = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: theme.spacing(1, 0),
//   borderTop: '1px solid #ccc',
// }));

// const PageFive: React.FC = () => {
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//   const [exams, setExams] = useState<any[]>([]);
//   const [classes, setClasses] = useState<any[]>([]);
//   const [selectedClassId, setSelectedClassId] = useState<string>('');
//   const [selectedStudentName, setSelectedStudentName] = useState<string>('');
//   const [marksData, setMarksData] = useState<any[]>([]);
//   const [subjects, setSubjects] = useState<any[]>([]);
//   const [uniqueStudentNames, setUniqueStudentNames] = useState<string[]>([]);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   useEffect(() => {
//     if (selectedExamId && selectedClassId) {
//       fetchMarksData(selectedExamId, selectedClassId);
//     }
//   }, [selectedExamId, selectedClassId]);

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

//   const fetchSubjects = async ({ subjectIds, examId, classId }: { subjectIds: string[], examId: string, classId: string }) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/subjects?ids=${subjectIds.join(',')}&examId=${examId}&classId=${classId}`);
//       const subjectsWithMarks = response.data.filter((subject: any) => subjectIds.includes(subject._id));
//       setSubjects(subjectsWithMarks);
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
//     setSelectedStudentName(''); // Reset selected student when exam changes
//     await fetchClasses(examId);
//     setSubjects([]); // Reset subjects when exam changes
//   };

//   const handleClassChange = (event: SelectChangeEvent) => {
//     setSelectedClassId(event.target.value as string);
//     setSelectedStudentName(''); // Reset selected student when class changes
//   };

//   const handleStudentChange = (event: SelectChangeEvent) => {
//     setSelectedStudentName(event.target.value as string);
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

//   const handleDownloadReportCard = () => {
//     const doc = new jsPDF();
//     const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName);
//     const student = studentMarks[0]?.studentMarks[0]?.studentId;

//     if (!student) {
//       return;
//     }

//     doc.text(`Report Card for ${student.studentName}`, 20, 10);
//     doc.text(`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`, 20, 20);
//     doc.text(`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`, 20, 30);

//     subjects.forEach((subject) => {
//       const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
//       // doc.text(`${subject.name}: ${mark ? mark.studentMarks[0].marks : 'N/A'}`, 20, doc.autoTable.previous.finalY + 40);
//     });

//     const totalMarks = studentMarks.reduce((acc, mark) => acc + (mark.studentMarks[0].marks || 0), 0);
//     const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
//     const percentage = (totalMarks / maxPossibleMarks) * 100;
//     const isPass = percentage > 35;

//     // doc.text(`Total Marks: ${totalMarks}`, 20, doc.autoTable.previous.finalY + 60);
//     // doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, doc.autoTable.previous.finalY + 70);
//     // doc.text(`Status: ${isPass ? 'Pass' : 'Fail'}`, 20, doc.autoTable.previous.finalY + 80);

//     doc.save(`Report_Card_${student.studentName}.pdf`);
//   };

//   return (
//     <div>
//       <Typography variant="h3" component="h1">
//       Report Card
//       </Typography>
//       <Paper elevation={10} sx={{ padding: '20px', marginTop: '10px' }}>
//         <Grid container spacing={2}>
//           <Grid item xs={4}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="exam-label">Exam</InputLabel>
//               <Select
//                 labelId="exam-label"
//                 id="exam"
//                 value={selectedExamId}
//                 onChange={handleExamChange}
//                 label="Exam"
//               >
//                 {exams.map((exam) => (
//                   <MenuItem key={exam._id} value={exam._id}>
//                     {exam.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={4}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="class-label">Class</InputLabel>
//               <Select
//                 labelId="class-label"
//                 id="class"
//                 value={selectedClassId}
//                 onChange={handleClassChange}
//                 disabled={!selectedExamId}
//                 label="Class"
//               >
//                 {classes.map((classItem) => (
//                   <MenuItem key={classItem._id} value={classItem._id}>
//                     {classItem.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={4}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="student-label">Student</InputLabel>
//               <Select
//                 labelId="student-label"
//                 id="student"
//                 value={selectedStudentName}
//                 onChange={handleStudentChange}
//                 disabled={!selectedClassId}
//                 label="Student"
//               >
//                 {uniqueStudentNames.map((studentName, index) => (
//                   <MenuItem key={index} value={studentName}>
//                     {studentName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Box mt={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleDownloadReportCard}
//             disabled={!selectedStudentName}
//           >
//             Download Report Card
//           </Button>
//         </Box>
// </Paper>
        
// {selectedStudentName && (
//         <StyledReportContainer>
//           <StyledReportHeader>
//             <Typography variant="h4">{`Report Card for ${selectedStudentName}`}</Typography>
//             <Typography variant="h6">{`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`}</Typography>
//             <Typography variant="h6">{`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`}</Typography>
//           </StyledReportHeader>
//           {/* Subject-wise marks */}
//           {subjects.map((subject) => {
//             const mark = marksData.find((m) => m.subjectId?._id === subject._id && m.studentMarks[0]?.studentId.studentName === selectedStudentName);
//             return (
//               <StyledSubjectRow key={subject._id}>
//                 <Typography variant="body1">{subject.name}</Typography>
//                 <Typography variant="body1">{mark ? mark.studentMarks[0].marks : 'N/A'}</Typography>
//               </StyledSubjectRow>
//             );
//           })}
//             {/* Total Marks and Percentage */}
//             <StyledTotalRow>
//             <Typography variant="body1">Total Marks</Typography>
//             <Typography variant="body1">
//               {marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0)}
//             </Typography>
//           </StyledTotalRow>
//           <StyledTotalRow>
//             <Typography variant="body1">Percentage</Typography>
//             <Typography variant="body1">
//               {(
//                 (marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
//                 (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))
//               ) * 100).toFixed(2)}%
//             </Typography>
//           </StyledTotalRow>
//           <StyledTotalRow>
//             <Typography variant="body1">Status</Typography>
//             <Typography variant="body1">
//               {
//                 (marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
//                 (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))
//               ) * 100 > 35 ? 'Pass' : 'Fail'}
//             </Typography>
//           </StyledTotalRow>
//         </StyledReportContainer>
//       )}
   
//     </div>
//   );
// };

// export default PageFive;

//simple reposrt card

// import React, { useState, useEffect } from 'react';
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Paper,
//   Grid,
//   Typography,
//   Box,
//   Button,
//   styled,
// } from '@mui/material';
// import axios from 'axios';
// import { SelectChangeEvent } from '@mui/material/Select';
// import jsPDF from 'jspdf';

// // const StyledReportContainer = styled(Paper)(({ theme }) => ({
// //   padding: theme.spacing(3),
// //   marginTop: theme.spacing(3),
// // }));
// const StyledReportContainer = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginTop: theme.spacing(3),
//   backgroundColor: '#f0f0f0',
//   borderRadius: '8px',
// }));

// const StyledReportHeader = styled(Box)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   borderBottom: '1px solid #ccc',
// }));

// const StyledSubjectRow = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: theme.spacing(1, 0),
//   borderBottom: '1px solid #ccc',
// }));

// const StyledTotalRow = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   padding: theme.spacing(1, 0),
//   borderTop: '1px solid #ccc',
// }));

// const PageFive: React.FC = () => {
//   const [selectedExamId, setSelectedExamId] = useState<string>('');
//   const [exams, setExams] = useState<any[]>([]);
//   const [classes, setClasses] = useState<any[]>([]);
//   const [selectedClassId, setSelectedClassId] = useState<string>('');
//   const [selectedStudentName, setSelectedStudentName] = useState<string>('');
//   const [marksData, setMarksData] = useState<any[]>([]);
//   const [subjects, setSubjects] = useState<any[]>([]);
//   const [uniqueStudentNames, setUniqueStudentNames] = useState<string[]>([]);

//   useEffect(() => {
//     fetchExams();
//   }, []);

//   useEffect(() => {
//     if (selectedExamId && selectedClassId) {
//       fetchMarksData(selectedExamId, selectedClassId);
//     }
//   }, [selectedExamId, selectedClassId]);

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

//   const fetchSubjects = async ({ subjectIds, examId, classId }: { subjectIds: string[], examId: string, classId: string }) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/subjects?ids=${subjectIds.join(',')}&examId=${examId}&classId=${classId}`);
//       const subjectsWithMarks = response.data.filter((subject: any) => subjectIds.includes(subject._id));
//       setSubjects(subjectsWithMarks);
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
//     setSelectedStudentName(''); // Reset selected student when exam changes
//     await fetchClasses(examId);
//     setSubjects([]); // Reset subjects when exam changes
//   };

//   const handleClassChange = (event: SelectChangeEvent) => {
//     setSelectedClassId(event.target.value as string);
//     setSelectedStudentName(''); // Reset selected student when class changes
//   };

//   const handleStudentChange = (event: SelectChangeEvent) => {
//     setSelectedStudentName(event.target.value as string);
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

//   const handleDownloadReportCard = () => {
//     const doc = new jsPDF();
//     const studentMarks = marksData.filter((mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName);
//     const student = studentMarks[0]?.studentMarks[0]?.studentId;

//     if (!student) {
//       return;
//     }

//     doc.text(`Report Card for ${student.studentName}`, 20, 10);
//     doc.text(`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`, 20, 20);
//     doc.text(`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`, 20, 30);

//     subjects.forEach((subject) => {
//       const mark = studentMarks.find((m) => m.subjectId?._id === subject._id);
//       // doc.text(`${subject.name}: ${mark ? mark.studentMarks[0].marks : 'N/A'}`, 20, doc.autoTable.previous.finalY + 40);
//     });

//     const totalMarks = studentMarks.reduce((acc, mark) => acc + (mark.studentMarks[0].marks || 0), 0);
//     const maxPossibleMarks = subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60);
//     const percentage = (totalMarks / maxPossibleMarks) * 50;
//     const isPass = percentage > 35;

//     // doc.text(`Total Marks: ${totalMarks}`, 20, doc.autoTable.previous.finalY + 60);
//     // doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, doc.autoTable.previous.finalY + 70);
//     // doc.text(`Status: ${isPass ? 'Pass' : 'Fail'}`, 20, doc.autoTable.previous.finalY + 80);

//     doc.save(`Report_Card_${student.studentName}.pdf`);
//   };

//   return (
//     <div>
//       <Typography variant="h3" component="h1">
//       Report Card
//       </Typography>
//       <Paper elevation={10} sx={{ padding: '20px', marginTop: '10px' }}>
//         <Grid container spacing={2}>
//           <Grid item xs={4}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="exam-label">Exam</InputLabel>
//               <Select
//                 labelId="exam-label"
//                 id="exam"
//                 value={selectedExamId}
//                 onChange={handleExamChange}
//                 label="Exam"
//               >
//                 {exams.map((exam) => (
//                   <MenuItem key={exam._id} value={exam._id}>
//                     {exam.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={4}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="class-label">Class</InputLabel>
//               <Select
//                 labelId="class-label"
//                 id="class"
//                 value={selectedClassId}
//                 onChange={handleClassChange}
//                 disabled={!selectedExamId}
//                 label="Class"
//               >
//                 {classes.map((classItem) => (
//                   <MenuItem key={classItem._id} value={classItem._id}>
//                     {classItem.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={4}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="student-label">Student</InputLabel>
//               <Select
//                 labelId="student-label"
//                 id="student"
//                 value={selectedStudentName}
//                 onChange={handleStudentChange}
//                 disabled={!selectedClassId}
//                 label="Student"
//               >
//                 {uniqueStudentNames.map((studentName, index) => (
//                   <MenuItem key={index} value={studentName}>
//                     {studentName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Box mt={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleDownloadReportCard}
//             disabled={!selectedStudentName}
//           >
//             Download Report Card
//           </Button>
//         </Box>

//         {selectedStudentName && (
//           <StyledReportContainer>
//             <Typography variant="h4">{`Report Card for ${selectedStudentName}`}</Typography>
//             <Typography variant="h6">{`Class: ${classes.find((classItem) => classItem._id === selectedClassId)?.name}`}</Typography>
//             <Typography variant="h6">{`Exam: ${exams.find((exam) => exam._id === selectedExamId)?.name}`}</Typography>

//             {subjects.map((subject) => {
//               const mark = marksData.find((m) => m.subjectId?._id === subject._id && m.studentMarks[0]?.studentId.studentName === selectedStudentName);
//               return (
//                 <Typography key={subject._id} variant="body1">{`${subject.name}: ${mark ? mark.studentMarks[0].marks : 'N/A'}`}</Typography>
//               );
//             })}

//             <Typography variant="h6">
//               {`Total Marks: ${marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0)}`}
//             </Typography>
//             <Typography variant="h6">
//               {`Percentage: ${(
//                 (marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
//                 (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))
//               ) * 100).toFixed(2)}%`}
//             </Typography>
//             <Typography variant="h6">
//               {`Status: ${
//                 (marksData.reduce((acc, mark) => mark.studentMarks[0]?.studentId.studentName === selectedStudentName ? acc + (mark.studentMarks[0].marks || 0) : acc, 0) /
//                 (subjects.length * (exams.find((exam) => exam._id === selectedExamId)?.marksObtained || 60))
//               ) * 100 > 35 ? 'Pass' : 'Fail'}`}
//             </Typography>
//           </StyledReportContainer>
//         )}
//       </Paper>
//     </div>
//   );
// };

// export default PageFive;

// import { Helmet } from 'react-helmet-async';
// // @mui
// import { Container, Typography } from '@mui/material';
// // components
// import { useSettingsContext } from '../components/settings';

// // ----------------------------------------------------------------------

// export default function PageFive() {
//   const { themeStretch } = useSettingsContext();

//   return (
//     <>
//       <Helmet>
//         <title> Page Five | Minimal UI</title>
//       </Helmet>

//       <Container maxWidth={themeStretch ? false : 'xl'}>
//         <Typography variant="h3" component="h1" paragraph>
//           Page Five
//         </Typography>

//         <Typography gutterBottom>
//           Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc,
//           vitae euismod ligula urna in dolor. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
//           id, lorem. Phasellus blandit leo ut odio. Vestibulum ante ipsum primis in faucibus orci
//           luctus et ultrices posuere cubilia Curae; Fusce id purus. Aliquam lorem ante, dapibus in,
//           viverra quis, feugiat a, tellus. In consectetuer turpis ut velit. Aenean posuere, tortor
//           sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
//           Vestibulum suscipit nulla quis orci. Nam commodo suscipit quam. Sed a libero.
//         </Typography>

//         <Typography>
//           Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla ut metus varius
//           laoreet. Curabitur ullamcorper ultricies nisi. Ut non enim eleifend felis pretium feugiat.
//           Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque
//           libero metus, condimentum nec, tempor a, commodo mollis, magna. In enim justo, rhoncus ut,
//           imperdiet a, venenatis vitae, justo. Cras dapibus.
//         </Typography>
//       </Container>
//     </>
//   );
// }
