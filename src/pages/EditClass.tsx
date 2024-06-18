import React, { useState } from 'react';
import { TextField, Button ,Grid, Container, Box,Typography,Card,CardContent,Paper} from '@mui/material';
import { useSettingsContext } from '../components/settings';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { from } from 'stylis';


// Define an interface for the data you're working with
interface ClassData {
    name: string;
    
    capacity:string;
    description: string;
  }
// Define your component
const EditClass: React.FC = () => {
  const { themeStretch } = useSettingsContext();
  // State to manage form data
  const [formData, setFormData] = useState<ClassData>({
    name: '',
    capacity:'',
    description: ''
  });

  // State to store submitted data
  const [submittedData, setSubmittedData] = useState<ClassData[]>([]);

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    try {
      // Make POST request to backend API
      const response = await axios.post('http://localhost:3000/api/subjects/add-subject', formData);
      
     
    
    console.log('Server Response:', response.data);
    setSubmittedData([...submittedData, formData]); // Add form data to submittedData array
    // Clear form fields after submission
    
    setFormData({
      name: '',
      capacity:'',
      description: ''
    });
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
  }
};

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  return (
    <>
     {/* Set the maximum width of the container */}
      {/* Form for submitting subject data */}
      <h1>Edit Classrooms</h1>
      <Box  sx={{  display:"flex", justifyContent:"left"}}>
      <Paper elevation={20} sx={{borderRadius:"20px" }}>
     
      <Container fixed  >
      <form onSubmit={handleSubmit}   >

       
     
   
 
        
   <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange} 
          margin="normal"
          
         
        />
       
        
    
        <TextField
          name="capacity"
          label="Capacity"
          value={formData.capacity}
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


export default EditClass;