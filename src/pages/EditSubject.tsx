import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Container, MenuItem } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface SubjectData {
  name: string;
  type: string;
  subjectCode: string;
  description: string;
}

const EditSubject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<SubjectData>({
    name: '',
    type: '',
    subjectCode: '',
    description: ''
  });

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/subjects/subject/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching subject:', error);
      }
    };

    fetchSubject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log('event ', e.target.value);
    // console.log('event ', value);
    
    try {
      await axios.put(`http://localhost:3000/api/subjects/subject/${id}`, formData);
      console.log('Subject updated successfully!');
      // Redirect or do something else after successful update
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const Subject = [
    { value: 'Theory', label: 'Theory' },
    { value: 'Practical', label: 'Practical' },
    { value: 'Lab', label: 'Lab' },
    { value: 'Elective', label: 'Elective' }
  ];

  return (
    <>
      <h1>Edit Subject</h1>
      <Box sx={{ display: 'flex', justifyContent: 'left' }}>
        <Paper elevation={20} sx={{ borderRadius: '20px' }}>
          <Container fixed>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                name="type"
                label="Subject Type"
                value={formData.type}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              >
                {Subject.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="subjectCode"
                label="Subject Code"
                value={formData.subjectCode}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Box display="flex" justifyContent="center" m={5}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </form>
          </Container>
        </Paper>
      </Box>
    </>
  );
};

export default EditSubject;


// import React, { useState } from 'react';
// import { TextField, Button ,Grid, Container, Box,Typography,Card,CardContent,Paper} from '@mui/material';
// import { useSettingsContext } from '../components/settings';
// import MenuItem from '@mui/material/MenuItem';
// import axios from 'axios';
// import { from } from 'stylis';


// // Define an interface for the data you're working with
// interface SubjectData {
//   name: string;
//   type: string;
//   subjectCode: string;
//   description: string;
// }

// // Define your component
// const EditSubject: React.FC = () => {
//   const [name, setName]=useState('')
//   const [type, setType]=useState('')
//   const [subjectCode, setsubjectcode]=useState('')
//   const [description, setdescription]=useState('')
  
//   // State to manage form data
//   const [formData, setFormData] = useState<SubjectData>({
//     name: '',
//     type: '',
//     subjectCode: '',
//     description: ''
//   });

//   // State to store submitted data
//   const [submittedData, setSubmittedData] = useState<SubjectData[]>([]);

//   // Handle form submission
//   const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log('Submitted Data:', formData);
//     try {
//       // Make POST request to backend API
//       const response = await axios.post('http://localhost:3000/api/subjects/add-subject', formData);
      
     
    
//     console.log('Server Response:', response.data);
//     setSubmittedData([...submittedData, formData]); // Add form data to submittedData array
//     // Clear form fields after submission
    
//     setFormData({
//       name: '',
//       type: '',
//       subjectCode: '',
//       description: ''
//     });
//   } catch (error) {
//     // Handle errors here
//     console.error('Error:', error);
//   }
// };

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const Subject = [
//     {
//       value: 'Theory',
//        label:'Theory'
//     },
//     {
//       value: 'Practical',
//       label:'Practical'
     
//     },
//     {
//       value: 'Lab',
//       label:'Lab'
     
//     },
//     {
//       value: 'Elective',
//       label:'Elective'
     
//     },
    
//   ];

//   return (
//     <>
//      {/* Set the maximum width of the container */}
//       {/* Form for submitting subject data */}
//       <h1>Edit Subject</h1>
//       <Box  sx={{  display:"flex", justifyContent:"left"}}>
//       <Paper elevation={20} sx={{borderRadius:"20px" }}>
     
//       <Container fixed  >
//       <form onSubmit={handleSubmit}   >

//         {/* Text fields for each form field */}
     
   
 
        
//    <TextField
//           name="name"
//           label="Name"
//           value={name}
//           onChange={(e) => { setName(e.target.value) }}
          
//           fullWidth
//           margin="normal"
          
//           // sx={{  m: 1, width: '50ch',marginTop:'50px' }}

//         />
       
//         <Box
//       component="form"
//       // sx={{
//       //   '& .MuiTextField-root': { m: 1, width: '50ch' },
//       // }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="outlined-select-currency"
//           select
//           label="Subject Type "
//           name="type"
//           value={formData.type}
//           onChange={handleInputChange} // Handle input change
//           fullWidth
//           margin="normal"
//           // sx={{  m: 1, width: '50ch' }}

//         //   defaultValue="E"
//         //   helperText="Please select your currency"
//         >
//           {Subject.map((formData,option) => (
//             <MenuItem key={option} value={formData.value}>
//               {formData.label}
//             </MenuItem>
//           ))}
       
//          </TextField>
        
//       </div>
     
//      </Box>
//         {/* <TextField
//           name="type"
//           label="Type"
//           value={formData.type}
//           onChange={handleInputChange} // Handle input change
//           fullWidth
//           margin="normal"
//         /> */}
//         <TextField
//           name="subjectCode"
//           label="Subject Code"
//           value={formData.subjectCode}
//           onChange={handleInputChange} // Handle input change
//           fullWidth
//           margin="normal"
//           // sx={{  m: 1, width: '50ch' }}

//         />
//         <TextField
//           name="description"
//           label="Description"
//           value={formData.description}
//           onChange={handleInputChange} // Handle input change
//           fullWidth
//           multiline
//           rows={4}
//           margin="normal"
//           // sx={{  m: 1, width: '50ch' }}

//         />
        
//         <Box display="flex" justifyContent="center" m={5}>
//           <Button type="submit" variant="contained" color="primary">
//             Submit
//           </Button>
//         </Box>
//       </form>
      
     
//     </Container>
//     </Paper>
//     </Box>
       
        
//    </>
//   );
// };

// // Export the Subject component
// export default EditSubject;

