import React, { useState } from 'react';
import { TextField, Button ,Grid, Container, Box,Typography,Card,CardContent,Paper} from '@mui/material';
import { useSettingsContext } from '../components/settings';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { from } from 'stylis';



interface ClassData {
  name: string;
 capacity:string;
  description: string;
}


const AddClasses: React.FC = () => {
  const { themeStretch } = useSettingsContext();
  
  const [formData, setFormData] = useState<ClassData>({
    name: '',
    capacity:'',
    description: ''
  });

  
  const [submittedData, setSubmittedData] = useState<ClassData[]>([]);

  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    try {
      
      const response = await axios.post('http://localhost:3000/api/classes/add-classroom', formData);
      
     
    
    console.log('Server Response:', response.data);
    setSubmittedData([...submittedData, formData]); 
   
    
    setFormData({
      name: '',
      capacity:'',
      description: ''
    });
  } catch (error) {
    
    console.error('Error:', error);
  }
};

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  return (
    <>
     
      <h1>Create ClassRoom</h1>
      <Box  sx={{  display:"flex", justifyContent:"left"}}>
      <Paper elevation={20} sx={{borderRadius:"20px" }}>
     
      <Container fixed  >
      <form onSubmit={handleSubmit}   >

        
     
   
 
        
   <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleInputChange} // Handle input change
          fullWidth
          margin="normal"
          
          // sx={{  m: 1, width: '50ch',marginTop:'50px' }}

        />
     
        
    
     
    
        {/* <TextField
          name="type"
          label="Type"
          value={formData.type}
          onChange={handleInputChange} // Handle input change
          fullWidth
          margin="normal"
        /> */}
        <TextField
          name="capacity"
          label="Capacity"
          value={formData.capacity}
          onChange={handleInputChange} // Handle input change
          fullWidth
          margin="normal"
          // sx={{  m: 1, width: '50ch' }}

        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange} // Handle input change
          fullWidth
          multiline
          rows={4}
          margin="normal"
          // sx={{  m: 1, width: '50ch' }}

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

// Export the Subject component
export default AddClasses;
