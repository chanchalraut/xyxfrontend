

import React, { useState, useEffect } from 'react';
import EventIcon from '@mui/icons-material/Event';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Snackbar,
  SnackbarContent,
  IconButton, 
} from '@mui/material';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import { SelectChangeEvent } from '@mui/material/Select';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
// import { CloseIcon } from 'src/theme/overrides/CustomIcons';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
type ClassType = {
  _id: string;
  name: string;
};

type SubjectType = {
  _id: string;
  name: string;
};

type StudentType = {
  _id: string;
  studentName: string;
  marksObtained: number;
};

const MarksObtainScreen: React.FC = () => {


  
    const [exams, setExams] = useState<any[]>([]);
    const [selectedExam, setSelectedExam] = useState<string>('');
   
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [subjects, setSubjects] = useState<SubjectType[]>([]);
  
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [studentMarks, setStudentMarks] = useState<{ studentId: string; marks: number | null }[]>([]);
    const [assignedClasses, setAssignedClasses] = useState<ClassType[]>([]);
    const [students, setStudents] = useState<StudentType[]>([]);
    // const [marksList, setMarksList] = useState<{ studentId: string; marks: number | null }[]>([]);
    // const [marksData, setMarksData] = useState<{ studentId: string; marks: number | null }[]>([]); 
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [missingMarksError, setMissingMarksError] = useState<boolean>(false);
    const [popupOpen, setPopupOpen] = useState(false);
const [popupMessage, setPopupMessage] = useState('');
const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const closeDialog = () => {
    setDialogOpen(false);
  };
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  const openDialog = (message: string) => {
    setDialogMessage(message);
    setDialogOpen(true);
  };

  // const closeDialog = () => {
  //   setDialogOpen(false);
  // };

  
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

    useEffect(() => {
      const fetchExams = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/exams');
          setExams(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching exams:', error);
        }
      };
  
      fetchExams();
    }, []);
  
    
    const handleExamChange = async (event: SelectChangeEvent<{ value: string }>) => {
      const selectedExamId = event.target.value;
      setSelectedExam(selectedExamId as string); 
      setSelectedClass(null);
    
      try {
        const response = await axios.get(`http://localhost:3000/api/exams/${selectedExamId}/classes`);
        setAssignedClasses(response.data);
      } catch (error) {
        console.error('Error fetching assigned classes:', error);
      }
    };
    
    
    
    const handleClassChange = async (event: SelectChangeEvent<{ value: string }>) => {
      const selectedClassId = event.target.value;
      setSelectedClass(selectedClassId as string);
    
      try {
        const response = await axios.get(`http://localhost:3000/api/classroom/classes/${selectedClassId}/subjects`);
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setSubjects([]); 
      }
    };
    
    
     
    
    const handleSubjectClick = async (subjectId: string) => {
      setSelectedSubject(subjectId);
    
      if (!selectedClass) {
        console.error('Class not selected');
        return;
      }
    
      try {
        const response = await axios.get(`http://localhost:3000/api/students?classId=${selectedClass}&subjectId=${subjectId}`);
        
        setStudents(response.data);
    
        
        const initialStudentMarks = response.data.map((student:any) => ({
          studentId: student._id,
          marks: student.marksObtained || null,
        }));
    
        setStudentMarks(initialStudentMarks);
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents([]); 
      }
    };
    
    
   
    
    
    
    const handleStudentMarkChange = (studentId: string, marks: number | null) => {
      const updatedStudents: StudentType[] = students.map((student) => 
        student._id === studentId ? { ...student, marksObtained: marks || 0 } : student
      );
    
      setStudents(updatedStudents);
    };
    
    
   
   
    
    const handleSubmitMarks = async () => {
    
      const allMarksEntered = studentMarks.every((mark) => mark.marks !== null && mark.marks !== undefined);
  
      if (!allMarksEntered) {
        openDialog('Please enter marks for all students before submitting.');
        return;
      }
  
      try {
        const validMarksData = studentMarks
          .filter((mark) => mark.studentId && mark.marks !== null && mark.marks !== undefined)
          .map((mark) => ({
            examId: selectedExam,
            classId: selectedClass,
            subjectId: selectedSubject,
            studentId: mark.studentId,
            marks: mark.marks,
          }));
  
        console.log('Submitting marks:', validMarksData);
  
        await axios.post('http://localhost:3000/api/marks', validMarksData);
        closeModal();
        setSnackbarMessage('Marks Submitted Successfully');
      setSnackbarOpen(true);
        console.log('Marks submitted successfully');
      } catch (error) {
        console.error('Error submitting marks:', error);
      }
    };
  
  return (
    <>
     <Typography variant="h3" component="h1">
          Add Marks
        </Typography>
      <Paper elevation={10} sx={{ padding: '20px', marginTop:'10px'}}>
      <Grid container spacing={2}> 
   <Grid item xs={6}>
   <FormControl fullWidth margin="normal">
   <InputLabel id="exam-label">Exam</InputLabel>
     <Select
  labelId="exam-label"
  id="exam"
  value={selectedExam || '' as any}  
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
    <Grid item xs={6}>
     
      <FormControl fullWidth margin="normal">
        <InputLabel id="class-label">Classes</InputLabel>
        <Select
  labelId="class-label"
  id="class"
  value={selectedClass || '' as any}  
  onChange={handleClassChange}
  label="Classes"
>
  {assignedClasses.map((cls) => (
    <MenuItem key={cls._id} value={cls._id}>
      {cls.name}
    </MenuItem>
  ))}
</Select>
</FormControl>
 
    </Grid>
    </Grid>
    
    
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
         

<Grid container spacing={2}>
        {subjects.map((subject) => (
          <Grid key={subject._id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ height: '100%' }}
              onClick={() => {
                handleSubjectClick(subject._id);
                openModal();
              }}
            >
              <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{marginBottom:'30px'}}>
                  {exams
                    .filter((exam) => exam._id === selectedExam)
                    .map((exam) => (
                      <span key={exam._id}>
                        <EventIcon fontSize="small" style={{ verticalAlign: 'middle' }} /> {/* Calendar Icon */}
                        &nbsp;
                        {new Date(exam.startDate).toLocaleDateString()} -{' '}
                        {new Date(exam.endDate).toLocaleDateString()}
                      </span>
                    ))}
                </Typography>
                <Typography
                  variant="h6"
                  // component="div"
                  sx={{
                    color: '#000000',
                    backgroundColor: getRandomColor(),
                    borderRadius: '5px',
                    padding: '2px',
                    marginBottom: '5px',
                    textAlign: 'center',
                  }}
                >
                  {subject.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '30px' }}>
                  {exams.map((exam) => (
                    exam._id === selectedExam && (
                      <span key={exam._id}>
                        <StarIcon fontSize="small" style={{ verticalAlign: 'middle' }} /> {/* Star Icon */}
                        &nbsp;
                        Marks: {exam.marksObtained}
                      </span>
                    )
                  ))}
                </Typography>
               
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
        </Box>
      </Paper>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: '80%',
              maxHeight: '80%',
              overflowY: 'auto',
            }}
          >
            
            <Typography variant="h5" id="modal-title" sx={{ marginBottom: '20px' }}>
              Marks for {subjects.find((subject) => subject._id === selectedSubject)?.name}
            </Typography> 
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Enter Marks</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}> Marks</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={student._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
                   
                     <TableCell>
                        <TextField
                          type="number"
                          placeholder="Enter marks"
                          sx={{ width: '50%' }}
                          value={studentMarks[index]?.marks || ''}
                          onChange={(e) => {
                            const enteredMarks = parseInt(e.target.value) || 0;
                            const maxMarks = exams.find(exam => exam._id === selectedExam)?.marksObtained || 0;
                            const newErrorMessages = [...errorMessages];
                            if (enteredMarks > maxMarks) {
                              newErrorMessages[index] = 'Entered marks exceed maximum marks';
                            } else {
                              newErrorMessages[index] = '';
                            }

                            setErrorMessages(newErrorMessages);

                            const newStudentMarks = [...studentMarks];
                            newStudentMarks[index] = {
                              studentId: student._id,
                              marks: enteredMarks,
                            };
                            setStudentMarks(newStudentMarks);
                          }}
                        />
                        {errorMessages[index] && (
                          <Typography color="error">{errorMessages[index]}</Typography>
                        )}
                      </TableCell>
                      <TableCell>
  {exams.map((exam) => (
    exam._id === selectedExam && exam.marksObtained
  ))}
</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
            <Box sx={{display:'flex',justifyContent:'center'}}><Button
              variant="contained"
              onClick={handleSubmitMarks}
              sx={{ marginTop: '20px'}}
            >
              Submit Marks
            </Button></Box>
            
          </Box>
        </div>
      </Modal>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>OK</Button>
        </DialogActions>
      </Dialog>
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

    </>
  );
};

export default MarksObtainScreen;





















































































































































