import { Helmet } from 'react-helmet-async';

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
  Snackbar,
  SnackbarContent,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogProps,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useSettingsContext } from '../components/settings';
import React, { useEffect, useState } from 'react';

import { Link, json } from 'react-router-dom';
import axios from 'axios';
import Image from '../components/image';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import AppsIcon from '@mui/icons-material/Apps';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ClassData {
  _id: any;
  name: string;
  capacity: number;
  description: string;
}
const ClassList: React.FC = () => {
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();

  const [Class, setClass] = useState<ClassData[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; id?: string }>({
    open: false,
  });
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

  // Handle delete confirmation dialog open
  const handleDeleteConfirmationOpen = (id: string) => {
    setDeleteConfirmation({ open: true, id });
  };

  // Handle delete confirmation dialog close
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation({ open: false });
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarOpen = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };
  // Delete class by ID
  const deleteClass = async (_id: any) => {
    if (!deleteConfirmation.open) return;
    try {
      const response = await axios.delete(`http://localhost:3000/api/classes/delete/${_id}`);
      if (response) {
        getClass();
        handleSnackbarOpen('class deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
      handleSnackbarOpen('Error deleting subject.');
    }
    handleDeleteConfirmationClose();
  };

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
    getClass();
  }, []);

  const getClass = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/classes');
      setClass(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.warn('Class', Class);
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]; // Get random color from the array
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
  const totalPages = Math.ceil(Class.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, Class.length);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Step 3: Filter the classes based on the search query
  const filteredClasses = Class.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Button aria-label="edit" component={Link} to={`edit-class/${params.row.id}`}>
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
          ClassList
        </Typography>

        <Button component={Link} to="add-class" variant="contained" startIcon={<AddIcon />}>
          Add New
        </Button>
      </Box>

      <Paper elevation={10}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="medium"
            sx={{ padding: '10px', margin: '20px', width: '40%' }}
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '20px',position: 'relative' }}>
            {filteredClasses.length > 0 ? (
              filteredClasses.slice(startIndex, endIndex).map((item, index) => (
                <Card
                  key={item._id}
                  style={{
                    margin: '20px ',
                    width: '20%',
                    marginBottom: '50px',
                    backgroundColor: getRandomColor(),
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
                            boxShadow: 'none', 
                          },
                        }}
                      >
                        =
                        <MenuItem component={Link} to={`edit-class/${item._id}`}>
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteConfirmationOpen(item._id)}>
                          <IconButton
                            aria-label="delete"
                           
                          >
                            <DeleteIcon />
                          </IconButton>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                    <Typography color="textSecondary">{item.name}</Typography>

                    <Typography color="textSecondary">{item.capacity}</Typography>

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
            <DataGrid
              columns={columns}
              rows={Class.map((item) => ({ id: item._id, ...item }))}
              checkboxSelection
            />
          </div>
        )}

        <Dialog
          open={deleteConfirmation.open}
          onClose={handleDeleteConfirmationClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>Are you sure you want to delete this subject?</DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
            <Button onClick={() => deleteClass(deleteConfirmation.id as string)} color="error">
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
            sx={{
              backgroundColor: snackbarMessage.includes('deleted successfully') ? 'red' : 'green',
            }}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              ></IconButton>
            }
          />
        </Snackbar>

        {/* <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ display: 'flex', justifyContent: 'centers' }}
        /> */}
      </Paper>
    </>
  );
};
export default ClassList;




