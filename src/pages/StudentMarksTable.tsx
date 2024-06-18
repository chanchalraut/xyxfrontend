 // StudentMarksTable.tsx
import React from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button
} from '@mui/material';


type StudentType = {
  _id: string;
  studentName: string;
};

type StudentMarksProps = {
  students: StudentType[];
  handleStudentMarkChange: (studentId: string, marks: number | null) => void;
};

const StudentMarksTable: React.FC<StudentMarksProps> = ({ students, handleStudentMarkChange }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Enter Marks</TableCell>
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
                  onChange={(e) => {
                    const marks = parseInt(e.target.value, 10) || null;
                    handleStudentMarkChange(student._id, marks);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentMarksTable;
