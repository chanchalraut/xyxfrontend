import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const acadamic = [
  {
    value: 'year',
     label:'2021-2022'
  },
  {
    value: 'year1',
    label:'2022-2023'
   
  },
  {
    value: 'year2',
    label:'2023-2024'
   
  },
  {
    value: 'year3',
    label:'2024-2025'
   
  },
  {
    value: 'year4',
    label:'2025-2026'
   
  },
];

export default function SelectTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Acadamic year "
        //   defaultValue="E"
        //   helperText="Please select your currency"
        >
          {acadamic.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
       
         </TextField>
        
      </div>
     
     </Box>
  );
}