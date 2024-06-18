// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   FormControl,
//   InputLabel,
//   FormLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   Box,
//   Avatar,
//   IconButton
// } from '@mui/material';
// import axios from 'axios';

// interface Class {
//   _id: string;
//   name: string;
// }

// interface AddStudentFormProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddStudentForm: React.FC<AddStudentFormProps> = ({ open, onClose }) => {
//   const [studentName, setName] = useState<string>('');
//   const [studentEmail, setEmail] = useState<string>('');
//   const [gender, setGender] = useState<string | null>(null);
//   const [rollNo, setRollNo] = useState<string>('');
//   const [classId, setClassId] = useState<string | null>(null);
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/classes');
//         setClasses(response.data);
//       } catch (error) {
//         console.error('Error fetching classes:', error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     const newErrors: { [key: string]: string } = {};
  
//     if (!studentName) {
//       newErrors.studentName = 'Name is required';
//     }
  
//     if (!studentEmail) {
//       newErrors.studentEmail = 'Email is required';
//     }
  
//     if (!rollNo) {
//       newErrors.rollNo = 'Roll number is required';
//     }
  
//     if (!classId) {
//       newErrors.classId = 'Class must be selected';
//     }
  
//     setErrors(newErrors);
  
//     if (Object.keys(newErrors).length === 0) {
//       const formData = new FormData();
//       formData.append('studentName', studentName);
//       formData.append('studentEmail', studentEmail);
//       formData.append('gender', gender || '');
//       formData.append('rollNo', rollNo);
//       formData.append('classId', classId || '');
//       if (image) {
//         formData.append('profileImage', image);
//       }

//       try {
//         await axios.post('http://localhost:3000/api/students', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
       
//         onClose();
//       } catch (error) {
//         console.error('Error adding student:', error.response?.data || error.message);
        
//         if (error.response?.data && error.response.data.errors) {
//           const serverErrors = error.response.data.errors;
//           const formattedErrors: { [key: string]: string } = {};

//           serverErrors.forEach((err: { msg: string, param: string }) => {
//             formattedErrors[err.param] = err.msg;
//           });

//           setErrors(formattedErrors);
//         } else {
//           alert('An error occurred while adding the student. Please try again.');
//         }
//       }
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add New Student</DialogTitle>
//       <DialogContent>
//         <Box display="flex" justifyContent="center" mb={2}>
//           <input
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="raised-button-file"
//             type="file"
//             onChange={handleImageChange}
//           />
//           <label htmlFor="raised-button-file">
//             <IconButton component="span">
//               <Avatar
//                 src={imagePreview || '/uploads/profileImages/default_avatar.png'} // Path to the default human placeholder image
//                 alt="Profile Avatar"
//                 style={{ width: '120px', height: '120px' }}
//               />
//             </IconButton>
//           </label>
//         </Box>
//         <TextField
//           margin="dense"
//           label="Name"
//           fullWidth
//           value={studentName}
//           onChange={(e) => setName(e.target.value)}
//           error={!!errors.studentName}
//           helperText={errors.studentName}
//         />
//         <TextField
//           margin="dense"
//           label="Email"
//           type="email"
//           fullWidth
//           value={studentEmail}
//           onChange={(e) => setEmail(e.target.value)}
//           error={!!errors.studentEmail}
//           helperText={errors.studentEmail}
//         />
//         <TextField
//           margin="dense"
//           label="Roll No"
//           fullWidth
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           error={!!errors.rollNo}
//           helperText={errors.rollNo}
//         />
//         <FormControl fullWidth margin="dense" error={!!errors.gender}>
//           <InputLabel id="gender-label">Gender</InputLabel>
//           <Select
//             labelId="gender-label"
//             id="gender"
//             value={gender || ''}
//             onChange={(e) => setGender(e.target.value as string)}
//           >
//             <MenuItem value="" disabled>Select Gender</MenuItem>
//             <MenuItem value="male">Male</MenuItem>
//             <MenuItem value="female">Female</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//           {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
//         </FormControl>
        
//         <FormControl fullWidth margin="dense" error={!!errors.classId}>
//           <InputLabel id="class-label">Class</InputLabel>
//           <Select
//             labelId="class-label"
//             id="class"
//             value={classId || ''}
//             onChange={(e) => setClassId(e.target.value as string)}
//           >
//             {classes.map((cls) => (
//               <MenuItem key={cls._id} value={cls._id}>
//                 {cls.name}
//               </MenuItem>
//             ))}
//           </Select>
//           {errors.classId && <FormHelperText>{errors.classId}</FormHelperText>}
//         </FormControl>

//         {Object.keys(errors).length > 0 && (
//           <Box mt={2}>
//             <FormLabel error>{Object.values(errors).join(', ')}</FormLabel>
//           </Box>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };


// const App: React.FC = () => {
//   const [open, setOpen] = useState<boolean>(false);

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//         Add Student
//       </Button>
//       <AddStudentForm open={open} onClose={() => setOpen(false)} />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,Tooltip,Divider,
  FormHelperText,FormLabel,SelectChangeEvent,
  SnackbarContent,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/system';
// import { makeStyles } from '@mui/styles';


interface Class {
  _id: string;
  name: string;
}

interface Student {
  _id: string;
  studentName: string;
  studentEmail: string;
  gender: string;
  rollNo: string;
  classId: string;
  profileImage: string;
}

interface AddStudentFormProps {
  open: boolean;
  onClose: () => void;
  fetchStudents: () => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ open, onClose, fetchStudents }) => {
  const [studentName, setName] = useState<string>('');
  const [studentEmail, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string | null>(null);
  const [rollNo, setRollNo] = useState<string>('');
  const [classId, setClassId] = useState<string | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {};
  
    if (!studentName) {
      newErrors.studentName = 'Name is required';
    }
  
    if (!studentEmail) {
      newErrors.studentEmail = 'Email is required';
    }
  
    if (!rollNo) {
      newErrors.rollNo = 'Roll number is required';
    }
  
    if (!classId) {
      newErrors.classId = 'Class must be selected';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append('studentName', studentName);
      formData.append('studentEmail', studentEmail);
      formData.append('gender', gender || '');
      formData.append('rollNo', rollNo);
      formData.append('classId', classId || '');
      if (image) {
        formData.append('profileImage', image);
      }

      try {
        await axios.post('http://localhost:3000/api/students', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
       
        onClose();
        setSnackbarMessage('Student Create Successfully');
        setSnackbarOpen(true);
        fetchStudents();
        
      } catch (error) {
        console.error('Error adding student:', error.response?.data || error.message);
        
        if (error.response?.data && error.response.data.errors) {
          const serverErrors = error.response.data.errors;
          const formattedErrors: { [key: string]: string } = {};

          serverErrors.forEach((err: { msg: string, param: string }) => {
            formattedErrors[err.param] = err.msg;
          });

          setErrors(formattedErrors);
        } else {
          alert('An error occurred while adding the student. Please try again.');
        }
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <IconButton component="span">
              <Avatar
                src={imagePreview || '/uploads/profileImages/default_avatar.png'} // Path to the default human placeholder image
                alt="Profile Avatar"
                style={{ width: '120px', height: '120px' }}
              />
            </IconButton>
          </label>
        </Box>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={studentName}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.studentName}
          helperText={errors.studentName}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={studentEmail}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.studentEmail}
          helperText={errors.studentEmail}
        />
        <TextField
          margin="dense"
          label="Roll No"
          fullWidth
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          error={!!errors.rollNo}
          helperText={errors.rollNo}
        />
        <FormControl fullWidth margin="dense" error={!!errors.gender}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={gender || ''}
            onChange={(e) => setGender(e.target.value as string)}
          >
            <MenuItem value="" disabled>Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>
        
        <FormControl fullWidth margin="dense" error={!!errors.classId}>
          <InputLabel id="class-label">Class</InputLabel>
          <Select
            labelId="class-label"
            id="class"
            value={classId || ''}
            onChange={(e) => setClassId(e.target.value as string)}
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name}
              </MenuItem>
            ))}
          </Select>
          {errors.classId && <FormHelperText>{errors.classId}</FormHelperText>}
        </FormControl>

        {Object.keys(errors).length > 0 && (
          <Box mt={2}>
            <FormLabel error>{Object.values(errors).join(', ')}</FormLabel>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// const StudentCard: React.FC<Student> = ({ studentName, studentEmail, rollNo, profileImage }) => (
//   <Card>
//     <CardContent>
//       <Box display="flex" flexDirection="column" alignItems="center">
//         <Avatar src={profileImage || `http://localhost:3000/uploads/profileImages/default_avatar.png.`} style={{ width: '100px', height: '100px' }} />
//         <Typography variant="h6">{studentName}</Typography>
//         <Typography variant="body1">{studentEmail}</Typography>
//         <Typography variant="body1">{rollNo}</Typography>
//       </Box>
//     </CardContent>
//   </Card>
// );

const App: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/classes');
  //       setClasses(response.data);
  //     } catch (error) {
  //       console.error('Error fetching classes:', error);
  //     }
  //   };

  //   fetchClasses();
  // }, []);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/classes');
        setClasses(response.data);
        if (response.data.length > 0) {
          setSelectedClassId(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    if (!selectedClassId) return;

    try {
      const response = await axios.get(`http://localhost:3000/api/students/${selectedClassId}`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedClassId]);

 
 

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedClassId(event.target.value);
  };

  return (
    <div>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
       <Typography variant="h3" component="h1">
          Students
        </Typography>

      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
        Add New
      </Button>
      </Box>
      <AddStudentForm open={open} onClose={() => setOpen(false)} fetchStudents={fetchStudents} />
      <Grid container spacing={2}>
      <Grid item xs={4}>
      <FormControl fullWidth variant="outlined">
      <InputLabel id="class-label">Select Class</InputLabel>
        
        <Select
          labelId="class-label"
          id="class"
          value={selectedClassId || ''}
          onChange={handleClassChange}
          label="Select Class"
        >
          {classes.map((cls) => (
            <MenuItem key={cls._id} value={cls._id}>
              {cls.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      
      </Grid>
      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={3} key={student._id}>
         
      <Card sx={{ 
        maxWidth: 250,
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop:'20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar src={`http://localhost:3000/${student?.profileImage}`} sx={{ width: 100, height: 100, margin: '0 auto 20px' }} />
          <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
            {student.studentName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            {student.studentEmail}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.rollNo}
          </Typography>
        </CardContent>
      </Card>
   
       
            {/* <Card>
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar src={`http://localhost:3000/${student?.profileImage}`} style={{ width: '100px', height: '100px' }} />
        <Typography variant="h6">{student.studentName}</Typography>
        <Typography variant="body1">{student.studentEmail}</Typography>
        <Typography variant="body1">{student.rollNo}</Typography>
      </Box>
    </CardContent>
  </Card> */}

          </Grid>
 
        ))}
      </Grid>
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


export default App;


















































































































// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   InputLabel,
//   FormLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   Box
// } from '@mui/material';
// import axios from 'axios';
// interface Class {
//   _id: string;
//   name: string;
// }

// interface AddStudentFormProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddStudentForm: React.FC<AddStudentFormProps> = ({ open, onClose }) => {
//   const [studentName, setName] = useState<string>('');
//   const [studentEmail, setEmail] = useState<string>('');
//   const [gender, setGender] = useState<string | null>(null);
//   const [rollNo, setRollNo] = useState<string>('');
//   const [classId, setClassId] = useState<string | null>(null);
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/classes');
//         setClasses(response.data);
//       } catch (error) {
//         console.error('Error fetching classes:', error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   const handleSubmit = async () => {
//     console.log('Sending data:', { studentName, studentEmail, gender, rollNo, classId });
//     const newErrors: { [key: string]: string } = {};
  
//     if (!studentName) {
//       newErrors.name = 'Name is required';
//     }
  
//     if (!studentEmail) {
//       newErrors.email = 'Email is required';
//     }
  
   
  
//     if (!rollNo) {
//       newErrors.rollNo = 'Roll number is required';
//     }
  
//     if (!classId) {
//       newErrors.classId = 'Class must be selected';
//     }
  
//     setErrors(newErrors);
  
//     if (Object.keys(newErrors).length === 0) {
//       try {
//         await axios.post('http://localhost:3000/api/students', {
//   name: studentName,
//   email: studentEmail,
//   gender: gender,
//   rollNo: rollNo,
//   classId: classId
// });
       
//         onClose();
//       } catch (error) {
//         console.error('Error adding student:', error.response?.data || error.message);
        
//         if (error.response?.data && error.response.data.errors) {
//           const serverErrors = error.response.data.errors;
//           const formattedErrors: { [key: string]: string } = {};
      
//           serverErrors.forEach((err: { msg: string, param: string }) => {
//             formattedErrors[err.param] = err.msg;
//           });
      
//           setErrors(formattedErrors);
//         } else {
//           alert('An error occurred while adding the student. Please try again.');
//         }
//       }
//     }}      
  
  

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add New Student</DialogTitle>
//       <DialogContent>
//         <TextField
//           margin="dense"
//           label="Name"
//           fullWidth
//           value={studentName}
//           onChange={(e) => setName(e.target.value)}
//           error={!!errors.studentName}
//           helperText={errors.studentName}
//         />
//         <TextField
//           margin="dense"
//           label="Email"
//           type="email"
//           fullWidth
//           value={studentEmail}
//           onChange={(e) => setEmail(e.target.value)}
//           error={!!errors.studentEmail}
//           helperText={errors.studentEmail}
//         />
//         <TextField
//           margin="dense"
//           label="Roll No"
//           fullWidth
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//           error={!!errors.rollNo}
//           helperText={errors.rollNo}
//         />
//        <FormControl fullWidth margin="dense" error={!!errors.gender}>
//   <InputLabel id="gender-label">Gender</InputLabel>
//   <Select
//     labelId="gender-label"
//     id="gender"
//     value={gender || ''}
//     onChange={(e) => setGender(e.target.value as string)}
//   >
//     <MenuItem value="" disabled>Select Gender</MenuItem>
//     <MenuItem value="Male">Male</MenuItem>
//     <MenuItem value="Female">Female</MenuItem>
//     <MenuItem value="Other">Other</MenuItem>
//   </Select>
//   {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
// </FormControl>
        
//         <FormControl fullWidth margin="dense" error={!!errors.classId}>
//           <InputLabel id="class-label">Class</InputLabel>
//           <Select
//             labelId="class-label"
//             id="class"
//             value={classId || ''}
//             onChange={(e) => setClassId(e.target.value as string)}
//           >
//             {classes.map((cls) => (
//               <MenuItem key={cls._id} value={cls._id}>
//                 {cls.name}
//               </MenuItem>
//             ))}
//           </Select>
//           {errors.classId && <FormHelperText>{errors.classId}</FormHelperText>}
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const App: React.FC = () => {
//   const [open, setOpen] = useState<boolean>(false);

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//         Add Student
//       </Button>
//       <AddStudentForm open={open} onClose={() => setOpen(false)} />
//     </div>
//   );
// };

// export default App;
