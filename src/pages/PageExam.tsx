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
  Checkbox,
  ListItemText,
  FormHelperText,
  Box,Typography,Grid, CardContent,
  Card,Paper
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GradeIcon from '@mui/icons-material/Grade';
import EventIcon from '@mui/icons-material/Event';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

interface Exam {
  _id: string;
  name: string;
  duration: number;
  startDate: string;
  endDate: string;
  marksObtained: number;
  description: string;
  classIds: string[];
}
interface Class {
  _id: string;
  name: string;
}

interface AddExamFormProps {
  open: boolean;
  onClose: () => void;
}

const AddExamForm: React.FC<AddExamFormProps> = ({ open, onClose }) => {
  const [examName, setExamName] = useState('');
  const [examDuration, setExamDuration] = useState<number | null>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [marksObtained, setMarksObtained] = useState<number | null>(0);
  const [description, setDescription] = useState<string>('');
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [exams, setExams] = useState<Exam[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false); // State for dialog
  useEffect(() => {
    // Fetch classes from backend
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!examName) {
      newErrors.examName = 'Exam name is required';
    }

    if (!examDuration || examDuration <= 0) {
      newErrors.examDuration = 'Invalid exam duration';
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

   
    if (!marksObtained || marksObtained <= 0) {
      newErrors.marksObtained = 'Invalid marks obtained';
    }

    if (!description) {
      newErrors.description = 'Description is required';
    }

    if (selectedClasses.length === 0) {
      newErrors.selectedClasses = 'At least one class must be selected';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     try {
  //       const response = await axios.post('http://localhost:3000/api/exams', {
  //         name: examName,
  //         duration: examDuration,
  //         startDate,
  //         endDate,
  //         marksObtained,
  //         description,
  //         classIds: selectedClasses,
  //       });

  //       console.log('Exam added:', response.data);
  //       onClose();
  //     } catch (error) {
  //       console.error('Error adding exam:', error);
  //     }
  //   }
    
  // };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/api/exams', {
          name: examName,
          duration: examDuration,
          startDate,
          endDate,
          marksObtained,
          description,
          classIds: selectedClasses,
        });
  
        console.log('Exam added:', response.data);
  
       
        setExams(prevExams => [...prevExams, response.data]);
  
        onClose();
      } catch (error) {
        console.error('Error adding exam:', error);
      }
    }
  };
  
  
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { overflow: 'hidden' } }}>
      <DialogTitle>
      Add Exam
  <IconButton aria-label="add exam">
    <ReceiptLongIcon />
  </IconButton>
 
</DialogTitle>
      <DialogContent>
      <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
        <TextField
          margin="dense"
          label="Exam Name"
          fullWidth
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          error={!!errors.examName}
          helperText={errors.examName}
        />
        <TextField
          margin="dense"
          label="Exam Duration (in minutes)"
          type="number"
          fullWidth
          value={examDuration}
          onChange={(e) => setExamDuration(parseInt(e.target.value))}
          error={!!errors.examDuration}
          helperText={errors.examDuration}
        />
        <TextField
          margin="dense"
          label="Marks Obtained"
          type="number"
          fullWidth
          value={marksObtained}
          onChange={(e) => setMarksObtained(parseInt(e.target.value))}
          error={!!errors.marksObtained}
          helperText={errors.marksObtained}
        />
        <TextField
          margin="dense"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
        <Box display="flex" justifyContent="space-between">
    <TextField
      margin="dense"
      label="Start Date"
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      value={startDate?.toISOString().split('T')[0]}
      onChange={(e) => setStartDate(new Date(e.target.value))}
      error={!!errors.startDate}
      helperText={errors.startDate}
    />
    <TextField
      margin="dense"
      label="End Date"
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      value={endDate?.toISOString().split('T')[0]}
      onChange={(e) => setEndDate(new Date(e.target.value))}
      error={!!errors.endDate}
      helperText={errors.endDate}
    />
  </Box>
        <FormControl fullWidth margin="dense" error={!!errors.selectedClasses}>
          <InputLabel id="classIds-label">Select Classes</InputLabel>
          <Select
            labelId="classIds-label"
            id="classIds"
            multiple
            value={selectedClasses}
            onChange={(e) => setSelectedClasses(e.target.value as string[])}
            renderValue={(selected) => (
              (selected as string[]).map(id => {
                const selectedClass = classes.find(cls => cls._id === id);
                return selectedClass ? selectedClass.name : '';
              }).join(', ')
            )}
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                <Checkbox checked={selectedClasses.indexOf(cls._id) > -1} />
                <ListItemText primary={cls.name} />
              </MenuItem>
            ))}
          </Select>
          {errors.selectedClasses && <FormHelperText>{errors.selectedClasses}</FormHelperText>}
        </FormControl>
      </DialogContent>
      <DialogActions>

        {/* <Button onClick={onClose} color="primary">
          Cancel
        </Button> */}
        <Button onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [exams, setExams] = useState<Exam[]>([]);
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
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/exams');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };

    fetchExams(); 
  }, []);
  
  return (
    <div>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
       <Typography variant="h3" component="h3" gutterBottom>
            Exam 
          </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} startIcon={<AddIcon />}>
        Add New
      </Button>
      </Box>
      <AddExamForm open={open} onClose={() => setOpen(false)} />  
      
      <Paper elevation={10}>
      <Box  sx={{ display: 'flex', flexWrap: 'wrap', padding: '20px', position: 'relative' }}>
        {exams.map((exam) => (
          <Card
          key={exam._id}
          style={{
            margin: '20px ',
            width: '20%',
            marginBottom: '50px',
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          }}
        >
          <CardContent sx={{ 
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  border: '1px solid #e0e0e0',
  padding: '25px',
  marginBottom: '25px', 
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.12)',
  },
}}>
  <Typography 
    sx={{ 
      marginBottom: '15px',
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#333333',
      textTransform: 'uppercase',
      borderBottom: '2px solid #2196f3',
      paddingBottom: '8px',
    }}  
    variant="h5" 
    component="div"
  >
    {exam.name}
  </Typography>

  <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
    <AccessTimeIcon sx={{ marginRight: '10px', color: '#666666' }} />
    <Typography color="textSecondary" variant="body1">
      {exam.duration} min
    </Typography>
  </Box>

  <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
    <GradeIcon sx={{ marginRight: '10px', color: '#666666' }} />
    <Typography color="textSecondary" variant="body1">
      Marks: {exam.marksObtained}
    </Typography>
  </Box>

  <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
    <EventIcon sx={{ marginRight: '10px', color: '#666666' }} />
    <Typography color="textSecondary" variant="body1">
      {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}
    </Typography>
  </Box>

 
</CardContent>


        </Card>
        
        ))}
      
      </Box>
      </Paper>
      
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
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   FormHelperText,
//   Box,Typography,Grid, CardContent,
//   Card,Paper
// } from '@mui/material';
// import axios from 'axios';
// import AddIcon from '@mui/icons-material/Add';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import GradeIcon from '@mui/icons-material/Grade';
// import EventIcon from '@mui/icons-material/Event';
// import { IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

// interface Exam {
//   _id: string;
//   name: string;
//   duration: number;
//   startDate: string;
//   endDate: string;
//   marksObtained: number;
//   description: string;
//   classIds: string[];
// }
// interface Class {
//   _id: string;
//   name: string;
// }

// interface AddExamFormProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddExamForm: React.FC<AddExamFormProps> = ({ open, onClose }) => {
//   const [examName, setExamName] = useState('');
//   const [examDuration, setExamDuration] = useState<number | null>(0);
//   const [startDate, setStartDate] = useState<Date | null>(new Date());
//   const [endDate, setEndDate] = useState<Date | null>(new Date());
//   const [marksObtained, setMarksObtained] = useState<number | null>(0);
//   const [description, setDescription] = useState<string>('');
//   const [classes, setClasses] = useState<Class[]>([]);
//   const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [exams, setExams] = useState<Exam[]>([]);
//   const [openDialog, setOpenDialog] = useState<boolean>(false); // State for dialog
//   useEffect(() => {
//     // Fetch classes from backend
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

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};

//     if (!examName) {
//       newErrors.examName = 'Exam name is required';
//     }

//     if (!examDuration || examDuration <= 0) {
//       newErrors.examDuration = 'Invalid exam duration';
//     }

//     if (!startDate) {
//       newErrors.startDate = 'Start date is required';
//     }

   
//     if (!marksObtained || marksObtained <= 0) {
//       newErrors.marksObtained = 'Invalid marks obtained';
//     }

//     if (!description) {
//       newErrors.description = 'Description is required';
//     }

//     if (selectedClasses.length === 0) {
//       newErrors.selectedClasses = 'At least one class must be selected';
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

  
//   const handleSubmit = async () => {
//     if (validateForm()) {
//       try {
//         const response = await axios.post('http://localhost:3000/api/exams', {
//           name: examName,
//           duration: examDuration,
//           startDate,
//           endDate,
//           marksObtained,
//           description,
//           classIds: selectedClasses,
//         });
  
//         console.log('Exam added:', response.data);
  
       
//         setExams(prevExams => [...prevExams, response.data]);
  
//         onClose();
//       } catch (error) {
//         console.error('Error adding exam:', error);
//       }
//     }
//   };
  
  
//   return (
//     <Dialog open={open} onClose={onClose} PaperProps={{ style: { overflow: 'hidden' } }}>
//       <DialogTitle>
//       Add Exam
//   <IconButton aria-label="add exam">
//     <ReceiptLongIcon />
//   </IconButton>
 
// </DialogTitle>
//       <DialogContent>
//       <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
//         <IconButton onClick={onClose} aria-label="close">
//           <CloseIcon />
//         </IconButton>
//       </Box>
//         <TextField
//           margin="dense"
//           label="Exam Name"
//           fullWidth
//           value={examName}
//           onChange={(e) => setExamName(e.target.value)}
//           error={!!errors.examName}
//           helperText={errors.examName}
//         />
//         <TextField
//           margin="dense"
//           label="Exam Duration (in minutes)"
//           type="number"
//           fullWidth
//           value={examDuration}
//           onChange={(e) => setExamDuration(parseInt(e.target.value))}
//           error={!!errors.examDuration}
//           helperText={errors.examDuration}
//         />
//         <TextField
//           margin="dense"
//           label="Marks Obtained"
//           type="number"
//           fullWidth
//           value={marksObtained}
//           onChange={(e) => setMarksObtained(parseInt(e.target.value))}
//           error={!!errors.marksObtained}
//           helperText={errors.marksObtained}
//         />
//         <TextField
//           margin="dense"
//           label="Description"
//           multiline
//           rows={4}
//           fullWidth
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           error={!!errors.description}
//           helperText={errors.description}
//         />
//         <Box display="flex" justifyContent="space-between">
//     <TextField
//       margin="dense"
//       label="Start Date"
//       type="date"
//       fullWidth
//       InputLabelProps={{
//         shrink: true,
//       }}
//       value={startDate?.toISOString().split('T')[0]}
//       onChange={(e) => setStartDate(new Date(e.target.value))}
//       error={!!errors.startDate}
//       helperText={errors.startDate}
//     />
//     <TextField
//       margin="dense"
//       label="End Date"
//       type="date"
//       fullWidth
//       InputLabelProps={{
//         shrink: true,
//       }}
//       value={endDate?.toISOString().split('T')[0]}
//       onChange={(e) => setEndDate(new Date(e.target.value))}
//       error={!!errors.endDate}
//       helperText={errors.endDate}
//     />
//   </Box>
//         <FormControl fullWidth margin="dense" error={!!errors.selectedClasses}>
//           <InputLabel id="classIds-label">Select Classes</InputLabel>
//           <Select
//             labelId="classIds-label"
//             id="classIds"
//             multiple
//             value={selectedClasses}
//             onChange={(e) => setSelectedClasses(e.target.value as string[])}
//             renderValue={(selected) => (
//               (selected as string[]).map(id => {
//                 const selectedClass = classes.find(cls => cls._id === id);
//                 return selectedClass ? selectedClass.name : '';
//               }).join(', ')
//             )}
//           >
//             {classes.map((cls) => (
//               <MenuItem key={cls._id} value={cls._id}>
//                 <Checkbox checked={selectedClasses.indexOf(cls._id) > -1} />
//                 <ListItemText primary={cls.name} />
//               </MenuItem>
//             ))}
//           </Select>
//           {errors.selectedClasses && <FormHelperText>{errors.selectedClasses}</FormHelperText>}
//         </FormControl>
//       </DialogContent>
//       <DialogActions>

//         {/* <Button onClick={onClose} color="primary">
//           Cancel
//         </Button> */}
//         <Button onClick={handleSubmit} variant="contained">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const App: React.FC = () => {
//   const [open, setOpen] = useState(false);

//   const [exams, setExams] = useState<Exam[]>([]);
//   const colors = [
//     '#FFFDD7',
//     '#DFF5FF',
//     '#FFE6E6',
//     '#BBE2EC',
//     '#E1F0DA',
//     '#EEF5FF',
//     '#F6F7C4',
//     '#F1EAFF',
//   ];
//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/exams');
//         setExams(response.data);
//       } catch (error) {
//         console.error('Error fetching exams:', error);
//       }
//     };

//     fetchExams(); 
//   }, []);
  
//   return (
//     <div>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
//        <Typography variant="h3" component="h3" gutterBottom>
//             Exam 
//           </Typography>
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)} startIcon={<AddIcon />}>
//         Add New
//       </Button>
//       </Box>
//       <AddExamForm open={open} onClose={() => setOpen(false)} />  
      
//       <Paper elevation={10}>
//       <Box  sx={{ display: 'flex', flexWrap: 'wrap', padding: '20px', position: 'relative' }}>
//         {exams.map((exam) => (
//           <Card
//           key={exam._id}
//           style={{
//             margin: '20px ',
//             width: '20%',
//             marginBottom: '50px',
//             backgroundColor: colors[Math.floor(Math.random() * colors.length)],
//           }}
//         >
//           <CardContent sx={{ 
//   backgroundColor: '#ffffff',
//   borderRadius: '10px',
//   border: '1px solid #e0e0e0',
//   padding: '25px',
//   marginBottom: '25px', 
//   boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//   transition: 'transform 0.3s, box-shadow 0.3s',
//   '&:hover': {
//     transform: 'scale(1.01)',
//     boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.12)',
//   },
// }}>
//   <Typography 
//     sx={{ 
//       marginBottom: '15px',
//       fontSize: '1.8rem',
//       fontWeight: 700,
//       color: '#333333',
//       textTransform: 'uppercase',
//       borderBottom: '2px solid #2196f3',
//       paddingBottom: '8px',
//     }}  
//     variant="h5" 
//     component="div"
//   >
//     {exam.name}
//   </Typography>

//   <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
//     <AccessTimeIcon sx={{ marginRight: '10px', color: '#666666' }} />
//     <Typography color="textSecondary" variant="body1">
//       {exam.duration} min
//     </Typography>
//   </Box>

//   <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
//     <GradeIcon sx={{ marginRight: '10px', color: '#666666' }} />
//     <Typography color="textSecondary" variant="body1">
//       Marks: {exam.marksObtained}
//     </Typography>
//   </Box>

//   <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
//     <EventIcon sx={{ marginRight: '10px', color: '#666666' }} />
//     <Typography color="textSecondary" variant="body1">
//       {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}
//     </Typography>
//   </Box>

 
// </CardContent>


//         </Card>
        
//         ))}
      
//       </Box>
//       </Paper>
//     </div>
//   );
// };

// export default App;
