import { Helmet } from 'react-helmet-async';
// @mui
import {
  Container,
  Typography,
  Button,
  Box,
  CardContent,
  Card,
  Paper,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  useMediaQuery,
} from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import React, { FormEvent, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Image from '../components/image';
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddSubject from './AddSubject';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Subject, WidthFull } from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';

interface SubjectData {
  _id: any;
  name: string;
  type: string;
  subjectCode: string;
  description: string;
}

const SubjectList: React.FC<{updateSubjectCount: (count:number) => void}> =({updateSubjectCount}) => {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme(); 
  
  // Other state variables...
  const [subject, setSubjects] = useState<SubjectData[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; id?: string }>({
    open: false,
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false); // State for dialog

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  const [snackbarColor, setSnackbarColor] = useState('');


  console.log(subject);

  const [formData, setFormData] = useState<SubjectData>({
    _id: '',
    name: '',
    type: '',
    subjectCode: '',
    description: '',
  });

  // State to store submitted data
  const [submittedData, setSubmittedData] = useState<SubjectData[]>([]);
const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectData[]>([]);
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);

    try {
      // Make POST request to backend API
      const response = await axios.post('http://localhost:3000/api/subjects/add-subject', formData);
      console.log('Server Response:', response.data);
  
      // Fetch the updated list of subjects
      getSubjects();

      // Clear form fields after submission
      setFormData({
        _id: '',
        name: '',
        type: '',
        subjectCode: '',
        description: '',
      });
      setOpenDialog(false);
      // Show a success message
      handleSnackbarOpen('Subject added successfully.', 'green');
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
      handleSnackbarOpen('Error adding subject.', 'red');
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const Subject = [
    {
      value: 'Theory',
      label: 'Theory',
    },
    {
      value: 'Practical',
      label: 'Practical',
    },
    {
      value: 'Lab',
      label: 'Lab',
    },
    {
      value: 'Elective',
      label: 'Elective',
    },
  ];

  const colors = [
    '#FFFDD7',
    '#DFF5FF',
    '#FFE6E6',
    '#BBE2EC',
    '#E1F0DA',
    '#EEF5FF',
    '#F6F7C4',
    'F1EAFF',
  ];

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/subjects');
      setSubjects(response.data);
      setFilteredSubjects(response.data.length);
    
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteConfirmationOpen = (id: string) => {
    setDeleteConfirmation({ open: true, id });
  };

  // Function to close delete confirmation dialog
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation({ open: false });
  };

  const deleteSubject = async (id: any) => {
    if (!deleteConfirmation.open) return; // Prevent accidental deletion

    try {
      const response = await axios.delete(`http://localhost:3000/api/subjects/delete/${id}`);
      if (response) {
        getSubjects();
        handleSnackbarOpen('Subject deleted successfully.', 'red');
      }
    } catch (error) {
      console.error('Error deleting Subject:', error);
      handleSnackbarOpen('Error deleting subject.', 'red');
    }

    // Close the delete confirmation dialog
    handleDeleteConfirmationClose();
  };

  const handleViewModeChange = (mode: 'card' | 'list') => {
    setViewMode(mode);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message: string, color: string) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarOpen(true);

    // Automatically close the Snackbar after 6 seconds (6000 milliseconds)
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  const totalPages = Math.ceil(subject.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, subject.length);
  const rows = subject.map((item, index) => ({
    id: item._id,
    no: index + 1,
    name: item.name,
    type: item.type,
    subjectCode: item.subjectCode,
  }));
const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};

useEffect(() => {
  if (searchQuery.trim() === '') {
    setFilteredSubjects(subject);
  } else {
    const filtered = subject.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }
}, [searchQuery, subject]);

  const columns: GridColDef[] = [
    { field: 'no', headerName: 'Sr.no', width: 100, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'type', headerName: 'Type', width: 200, headerClassName: 'super-app-theme--header' },
    {
      field: 'subjectCode',
      headerName: 'Subject Code',
      width: 200,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      headerClassName: 'super-app-theme--header',
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Button aria-label="edit" component={Link} to={`edit-subject/${params.row.id}`}>
            <EditIcon />
          </Button>
          <Button aria-label="delete" onClick={() => handleDeleteConfirmationOpen(params.row.id)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});
  const handleAnchorClick = (id: string, event: React.MouseEvent<HTMLElement>) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [id]: event.currentTarget,
    }));
  };
  const handleAnchorClose = (id: string) => {
    setAnchorEls((prevAnchorEls) => ({
      ...prevAnchorEls,
      [id]: null,
    }));
  };

 
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <Typography variant="h3" component="h1">
          Subjects
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
          Add New
        </Button>

        <Dialog
          open={openDialog}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          onClose={() => setOpenDialog(false)}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flex: 'wrap' }}>
            <DialogTitle>Add Subject</DialogTitle>

            <CloseIcon
              sx={{ fontSize: '30px', margin: '20px' }}
              onClick={() => setOpenDialog(false)}
            />
          </Box>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleInputChange} // Handle input change
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'theme.palette.primary.lighter',
                    borderWidth: '2px',
                  },
                }}
              />

              <Box component="form" noValidate autoComplete="off">
                <div>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Subject Type "
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange} // Handle input change
                    fullWidth
                    margin="normal"
                  >
                    {Subject.map(
                      (
                        formData: {
                          value: string | number | readonly string[] | undefined;
                          label:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined;
                        },
                        option: React.Key | null | undefined
                      ) => (
                        <MenuItem key={option} value={formData.value}>
                          {formData.label}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </div>
              </Box>

              <TextField
                name="subjectCode"
                label="Subject Code"
                fullWidth
                margin="normal"
                value={formData.subjectCode}
                onChange={handleInputChange}
              />
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
                margin="normal"
              />

              <Box display="flex" justifyContent="space-evenly" m={3}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                {/* <Button variant="contained" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button> */}
              </Box>
            </form>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Box>

      <Paper elevation={10}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label="Search"
            variant="outlined"
         
            sx={{ padding: '10px', marginTop: '10px', width: '40%' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Button
              variant="outlined"
              onClick={() => handleViewModeChange('card')}
              disabled={viewMode === 'card'}
              startIcon={<AppsIcon />}
              sx={{ margin: '10px 10px 10px 0', maxWidth: '40px', maxHeight: '40px' }}
            >
              Card
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleViewModeChange('list')}
              disabled={viewMode === 'list'}
              startIcon={<ListIcon />}
              sx={{ margin: '10px 10px 10px 0', maxWidth: '40px', maxHeight: '40px' }}
            >
              List
            </Button>
          </Box>
        </Box>
        {viewMode === 'card' ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '20px', position: 'relative' }}>
            {filteredSubjects.length > 0 ? (
             filteredSubjects.slice(startIndex, endIndex).map((item, index) => (
                <Card
                  key={item._id}
                  style={{
                    margin: '20px ',
                    width: '20%',
                    marginBottom: '50px',
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',

                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <IconButton
                        aria-label="more"
                        aria-controls="three-dotted-menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleAnchorClick(item._id, event)}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <Menu
                        id="three-dotted-menu"
                        anchorEl={anchorEls[item._id]}
                        open={Boolean(anchorEls[item._id])}
                        onClose={() => handleAnchorClose(item._id)}
                        PaperProps={{
                          style: {
                            boxShadow: 'none', // Remove box shadow
                          },
                        }}
                      >
                        <MenuItem component={Link} to={`edit-subject/${item._id}`}>
                        
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          Edit
                        </MenuItem>

                        <MenuItem onClick={() => handleDeleteConfirmationOpen(item._id)}>
                          <IconButton
                            aria-label="delete"
                            // onClick={() => handleDeleteConfirmationOpen(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                    <Typography variant="h6" component="h6">
                      {item.name}
                    </Typography>
                    <Typography color="textSecondary">{item.type}</Typography>
                    <Typography color="textSecondary">{item.subjectCode}</Typography>
                    <Typography variant="body2" component="p">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box
                sx={{
                  alignContent: 'center',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Image
                  disabledEffect
                  visibleByDefault
                  alt="auth"
                  src={'/assets/images/NoData.png'}
                  sx={{ width: '60%', height: '60%', marginLeft: '130px' }}
                />
              </Box>
            )}  
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>
          </Box>
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} checkboxSelection />
          </div>
        )}

        <Dialog
          open={deleteConfirmation.open}
          onClose={handleDeleteConfirmationClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle> Confirm Delete</DialogTitle>
          <DialogContent>Are you sure you want to delete this subject?</DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
            <Button onClick={() => deleteSubject(deleteConfirmation.id as string)} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <SnackbarContent
            message={snackbarMessage}
            sx={{ backgroundColor: snackbarColor }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>   
            }
          />
        </Snackbar>
      </Paper>
    </>
  );
};

export default SubjectList;

















































































































































































































































































































































