import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { Box, Chip, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface ClassData {
  _id: string;
  name: string;
}

interface SubjectData {
  _id: string;
  name: string;
}
interface SubjectChipProps {
  subjectName: string;
  colors: string;
}
const MyClassSubjectComponent: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectData[]>([]);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; id?: string }>({
    open: false,
  });
  const SubjectChip: React.FC<SubjectChipProps> = ({ subjectName , colors}) => {
    return <Chip label={subjectName} size="medium" style={{ backgroundColor: colors, marginRight:"8px" }} />;
  };
  
  const [selectedItemId, setSelectedItemId] = useState<string>('');

  useEffect(() => {
    fetchData();
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get<ClassData[]>('http://localhost:3000/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get<SubjectData[]>('http://localhost:3000/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/classroom');
      setClassrooms(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const selectedClass = classes.find((classItem) => classItem._id === selectedClassId);

  const handleSubmit = async () => {
    if (!selectedClass || selectedSubjects.length === 0) {
      console.log('Please select a class and at least one subject');
      return;
    }

    try {
      const selectedClassName = classes.find((classItem) => classItem._id === selectedClassId)?.name;
      const formattedSelectedSubjects = selectedSubjects.map(subject => ({
        _id: subject._id,
        name: subject.name
      }));

      await axios.post('http://localhost:3000/api/classroom/add-classroom', {
        selectedClass: {
          _id: selectedClass._id,
          name: selectedClassName
        },
        selectedSubjects: formattedSelectedSubjects
      });

      console.log('Data saved successfully');
      fetchData();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDeleteConfirmationOpen = (id: string) => {
    setDeleteConfirmation({ open: true, id });
  };

  
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation({ open: false });
  };

  const deleteClassroom = async (id: any) => {
    if (!deleteConfirmation.open) return;

    try {
      const response = await axios.delete(`http://localhost:3000/api/classroom/delete-classroom/${id}`);
      if (response) {
        fetchData();
       
      }
    } catch (error) {
      console.error('Error deleting Subject:', error);
     
    }

    
    handleDeleteConfirmationClose();
  };

  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleEdit = () => {
  //   // Handle edit functionality here
  // };
  const colors = [
    '#FFFDD7',
    '#DFF5FF',
    '#FFE6E6',
    '#BBE2EC',
    '#E1F0DA',
    '#EEF5FF',
    '#F6F7C4',
   
  ];

  
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]; 
  };
  const rows = classrooms.map((classroom, index) => ({
    id: classroom._id,
    no:index+1,
    className: classroom.selectedClass.name,
     selectedSubjects: classroom.selectedSubjects.map((subject: any) => subject.name),
     
  }));

  const columns = [
    { field: 'no', headerName: 'Sr.no', width: 100 },
    { field: 'className', headerName: 'Class Name', width: 200 },
    { field: 'selectedSubjects', headerName: 'Selected Subjects', width: 700,
    renderCell: (params: any) => (
      <div >
        {params.value.map((subjectName: string) => (
          <SubjectChip key={subjectName} subjectName={subjectName} colors={getRandomColor ()} />
        ))}
      </div>
    ),
  }, 
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      renderCell: (params:any) => (
        <>
          {/* <Button aria-label="edit" >
            <EditIcon />
          </Button> */}
          <Button aria-label="delete" onClick={() => handleDeleteConfirmationOpen(params.row.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <Typography variant="h3" component="h1">
          Classroom List
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Add New</Button>
      </Box>
    
      <Dialog open={openDialog} fullWidth={fullWidth} maxWidth={maxWidth} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Classroom</DialogTitle>
        <DialogContent>
          <h2>Classes:</h2>
          <FormControl fullWidth variant="outlined">    
            <InputLabel id="class-select-label"> Classes</InputLabel>
            <Select
              labelId="class-select-label"
              id="class-select"
              value={selectedClassId}
              onChange={(event) => setSelectedClassId(event.target.value as string)}
              label="Select Class"
            >
              {classes.map((classItem) => (
                <MenuItem key={classItem._id} value={classItem._id}>
                  {classItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <h2>Subjects:</h2>
          <Autocomplete
            multiple
            id="subjects"
            options={subjects}
            getOptionLabel={(option) => option.name}
            onChange={(event, value: SubjectData[]) => setSelectedSubjects(value)}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Subjects" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained"  color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteConfirmation.open} onClose={handleDeleteConfirmationClose} fullWidth={fullWidth}
          maxWidth={maxWidth}>
          <DialogTitle> Confirm Delete</DialogTitle>
          <DialogContent>Are you sure you want to delete this subject?</DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
            <Button onClick={() => deleteClassroom(deleteConfirmation.id as string)} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
        <h2>Classrooms Data</h2>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
          />
        </div>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />

    </div>
 
  );
};

export default MyClassSubjectComponent;

// chanchal old code
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import AddIcon from '@mui/icons-material/Add';
// import { Box, IconButton } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import Dialog, { DialogProps } from '@mui/material/Dialog';
// import { DialogActions } from '@mui/material';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Snackbar from '@mui/material/Snackbar';
// import { DataGrid } from '@mui/x-data-grid';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import header from 'src/layouts/dashboard/header';
// import CloseIcon from '@mui/icons-material/Close';

// interface ClassData {
//   _id: string;
//   name: string;
// }

// interface SubjectData {
//   _id: string;
//   name: string;
// }

// const MyClassSubjectComponent: React.FC = () => {
//   const [classes, setClasses] = useState<ClassData[]>([]);
//   const [subjects, setSubjects] = useState<SubjectData[]>([]);
//   const [selectedClassId, setSelectedClassId] = useState<string>('');
//   const [selectedSubjects, setSelectedSubjects] = useState<SubjectData[]>([]);
//   const [classrooms, setClassrooms] = useState<any[]>([]);
//   const [openDialog, setOpenDialog] = useState<boolean>(false); // State for dialog
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [fullWidth, setFullWidth] = React.useState(true);
//   const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
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
// const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; id?: string }>({
//     open: false,
//   });
  
//   const [selectedItemId, setSelectedItemId] = useState<string>('');

//   useEffect(() => {
//     fetchData();
//     fetchClasses();
//     fetchSubjects();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get<ClassData[]>('http://localhost:3000/api/classes');
//       setClasses(response.data);
//     } catch (error) {
//       console.error('Error fetching classes:', error);
//     }
//   };

//   const fetchSubjects = async () => {
//     try {
//       const response = await axios.get<SubjectData[]>('http://localhost:3000/api/subjects');
//       setSubjects(response.data);
//     } catch (error) {
//       console.error('Error fetching subjects:', error);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/classroom');
//       setClassrooms(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const selectedClass = classes.find((classItem) => classItem._id === selectedClassId);

//   const handleSubmit = async () => {
//     if (!selectedClass || selectedSubjects.length === 0) {
//       console.log('Please select a class and at least one subject');
//       return;
//     }

//     try {
//       const selectedClassName = classes.find((classItem) => classItem._id === selectedClassId)?.name;
//       const formattedSelectedSubjects = selectedSubjects.map(subject => ({
//         _id: subject._id,
//         name: subject.name
//       }));

//       await axios.post('http://localhost:3000/api/classroom/add-classroom', {
//         selectedClass: {
//           _id: selectedClass._id,
//           name: selectedClassName
//         },
//         selectedSubjects: formattedSelectedSubjects
//       });

//       console.log('Data saved successfully');
//       fetchData();
//       setOpenDialog(false);
//     } catch (error) {
//             if (error.response && error.response.data && error.response.data.message) {
//               setErrorMessage(error.response.data.message); // Set error message from server response
//             } else {
//               console.error('Error saving data:', error);
//             }
//     }
//   };

//   const handleDeleteConfirmationOpen = (id: string) => {
//     setDeleteConfirmation({ open: true, id });
//   };

  
//   const handleDeleteConfirmationClose = () => {
//     setDeleteConfirmation({ open: false });
//   };

//   const deleteClassroom = async (id: any) => {
//     if (!deleteConfirmation.open) return; // Prevent accidental deletion

//     try {
//       const response = await axios.delete(`http://localhost:3000/api/classroom/delete-classroom/${id}`);
//       if (response) {
//         fetchData();
        
//       }
//     } catch (error) {
//       console.error('Error deleting Subject:', error);
     
//     }

    
//     handleDeleteConfirmationClose();
//   };

  
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleEdit = () => {
    
//   };

//   const rows = classrooms.map((classroom, index) => ({
//     no:index+1,
//     id:classroom._id,
//     className: classroom.selectedClass.name,
//     selectedSubjects: classroom.selectedSubjects.map((subject: any) => subject.name).join(', '), // Concatenate subject names
//   }));

//   const columns = [
//     // { field: 'id', headerName: 'ID', width: 100 },
//     { field:'no',headerName:'Sr.No',width:100},
//     { field: 'className', headerName: 'Class ', width: 200 },
//     { field: 'selectedSubjects', headerName: 'Subjects', width: 750 }, 
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 220,
//       sortable: false,
//       renderCell: (params:any) => (
//         <>
//           <IconButton aria-label="edit" >
//             <EditIcon />
//           </IconButton>
//           <IconButton aria-label="delete" onClick={() => handleDeleteConfirmationOpen(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
//         <Typography variant="h3" component="h1">
//           Classroom List
//         </Typography>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Add New</Button>
//       </Box>
    
//       <Dialog open={openDialog} fullWidth={fullWidth} maxWidth={maxWidth} onClose={() => setOpenDialog(false)}>
//       <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
//         <IconButton onClick={() => setOpenDialog(false)}  aria-label="close">
//           <CloseIcon />
//         </IconButton>
//       </Box>
//         <DialogTitle>Add New Classroom</DialogTitle>
//         <DialogContent>
//           <h2>Classes:</h2>
//           <FormControl fullWidth variant="outlined">    
//             <InputLabel id="class-select-label"> Classes</InputLabel>
//             <Select
//               labelId="class-select-label"
//               id="class-select"
//               value={selectedClassId}
//               onChange={(event) => setSelectedClassId(event.target.value as string)}
//               label="Select Class"
//             >
//               {classes.map((classItem) => (
                
//                 <MenuItem key={classItem._id} value={classItem._id}>
//                   {classItem.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <h2>Subjects:</h2>
//           <Autocomplete
//             multiple
//             id="subjects"
           
//             options={subjects}
//             getOptionLabel={(option) => option.name}
//             onChange={(event, value: SubjectData[]) => setSelectedSubjects(value)}
//             renderInput={(params) => <TextField {...params} variant="outlined" label="Subjects" />}
//           />
//         </DialogContent>
//         <DialogActions>
//           {/* <Button onClick={() => setOpenDialog(false)}>Cancel</Button> */}
//           <Button onClick={handleSubmit} variant="contained"  color="primary">Submit</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={deleteConfirmation.open} onClose={handleDeleteConfirmationClose} fullWidth={fullWidth}
//           maxWidth={maxWidth}>
//           <DialogTitle> Confirm Delete</DialogTitle>
//           <DialogContent>Are you sure you want to delete this subject?</DialogContent>
//           <DialogActions>
//             <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
//             <Button onClick={() => deleteClassroom(deleteConfirmation.id as string)} color="error">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
//         <h2>Classrooms Data</h2>
//         <div style={{ height: 400, width: '100%' ,}}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             checkboxSelection
          
//           />
//         </div>
//       </Paper>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//               <Snackbar
//   open={!!errorMessage}
//   autoHideDuration={6000}
//   onClose={() => setErrorMessage(null)}
//   anchorOrigin={{vertical: 'top', horizontal: 'right'  }}
// >
//   <span style={{ 
       
//         backgroundColor: 'red',
//         color: 'white',
//         fontWeight: 'bold',
//         borderRadius: '5px',
//         height:'50px',padding:'4px'
      
//     }}>{errorMessage}</span>
// </Snackbar>
//     </div>
 
//   );
// };

// export default MyClassSubjectComponent;































