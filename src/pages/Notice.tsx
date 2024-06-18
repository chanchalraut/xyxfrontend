// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
// } from '@mui/material';


// interface AddEventFormProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: EventData) => void;
// }

// interface EventData {
//   title: string;
 
//   date: string;
//   starttime: string;
//   endtime:string;
//   description: string;
// }

// const AddEventForm: React.FC<AddEventFormProps> = ({ open, onClose, onSubmit }) => {
//   const [title, setTitle] = useState('');
 
//   const [date, setDate] = useState('');
//   const [starttime, setstartTime] = useState('');
//   const [endtime, setendTime] = useState('');
//   const [description, setDescription] = useState('');

//   const handleAddEvent = () => {
//     const eventData: EventData = {
//       title,
     
//       date,
//       starttime,
//       endtime,
//       description,
//     };

//     onSubmit(eventData);

//     // Reset the form fields
//     setTitle('');
//     setstartTime('');
//     setendTime('');
//     setDate('');
//     setDescription('');

//     // Close the dialog
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add Event</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Title"
//               fullWidth
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </Grid>
         
//           <Grid item xs={6}>
//             <TextField
//               label="Date"
//               fullWidth
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Time"
//               fullWidth
//               type="time"
//               value={starttime}
//               onChange={(e) => setstartTime(e.target.value)}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Time"
//               fullWidth
//               type="time"
//               value={endtime}
//               onChange={(e) => setendTime(e.target.value)}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Description"
//               fullWidth
//               multiline
//               rows={4}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleAddEvent} variant="contained" color="primary">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const EventPage: React.FC = () => {
//   const [openForm, setOpenForm] = useState(false);
//   const [events, setEvents] = useState<EventData[]>([]);

//   useEffect(() => {
//     // Fetch events data on component mount
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/event'); // Replace '/api/events' with your API endpoint
//       setEvents(response.data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   const handleOpenForm = () => {
//     setOpenForm(true);
//   };

//   const handleCloseForm = () => {
//     setOpenForm(false);
//   };

//   const handleSubmitForm = async (data: EventData) => {
//     try {
//       await axios.post('http://localhost:3000/api/event', data); // Replace '/api/events' with your API endpoint
//       fetchEvents(); // Fetch updated events after adding a new one
//     } catch (error) {
//       console.error('Error adding event:', error);
//     }
//   };

//   // Function to convert numeric month to string representation
//   const getMonthName = (dateString: string) => {
//     const date = new Date(dateString);
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December'
//     ];
//     return monthNames[date.getMonth()];
//   };

//   const formatTime = (timeString: string) => {
//     const time = timeString.split(":");
//     let hours = parseInt(time[0], 10);
//     let minutes = time[1];
//     let ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12;
//     hours = hours ? hours : 12; // Handle midnight (0 hours)
//     return hours + ":" + minutes + " " + ampm;
//   };

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

//   const getRandomColor = () => {
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   return (
//     <>
//       <div>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
//       <Typography variant="h3" component="h1">
//          Event
//         </Typography>

//         <Button onClick={handleOpenForm} variant="contained" color="primary">
//           Add Event
//         </Button>
//        </Box>
//         <Paper elevation={3}>
//           <AddEventForm open={openForm} onClose={handleCloseForm} onSubmit={handleSubmitForm} />
//           <Box
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               justifyContent: 'space-evenly',
//               marginTop: '20px',
//             }}
//           >
//             {events.map((event, index) => (
//               <Card key={index} style={{ marginBottom: '10px', width: '40%', marginTop: '20px' }}>
//                 <CardContent style={{ display: 'flex' }}>
//                   <div style={{ backgroundColor: getRandomColor(), padding: '10px', marginRight: '10px', width: '25%', textAlign: 'center' }}>
//                     <Typography variant="subtitle1">
//                       {getMonthName(event.date)}
//                     </Typography>
//                     <Typography variant="h4" style={{ marginBottom: '5px' }}>
//                       {event.date.split('-')[2]}
//                     </Typography>
//                   </div>
//                   <div>
//                     <Typography variant="h5" component="h2">
//                       {event.title}
//                     </Typography>
//                     <Typography variant="body2" component="p">
//                       {event.description}
//                     </Typography>
//                     <Typography color="textSecondary">
//                         {formatTime(event.starttime)}
//                     </Typography>
//                     <Typography color="textSecondary">
//                       at  {formatTime(event.endtime)}
//                     </Typography>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Paper>
//       </div>
//     </>
//   );
// };

// export default EventPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material';

interface AddEventFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EventData) => void;
}

interface EventData {
  title: string;
  date: string;
  starttime: string;
  endtime: string;
  description: string;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleAddEvent = () => {
    const eventData: EventData = {
      title,
      date,
      starttime,
      endtime,
      description,
    };

    onSubmit(eventData);

    // Reset the form fields
    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setDescription('');

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Time"
              fullWidth
              type="time"
              value={starttime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Time"
              fullWidth
              type="time"
              value={endtime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddEvent} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EventPage: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/event');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmitForm = async (data: EventData) => {
    try {
      await axios.post('http://localhost:3000/api/event', data);
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[date.getMonth()];
  };

  const formatTime = (timeString: string) => {
    const time = timeString.split(":");
    let hours = parseInt(time[0], 10);
    let minutes = time[1];
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    return hours + ":" + minutes + " " + ampm;
  };

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

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <Typography variant="h3" component="h1">
          Event
        </Typography>
        <Button onClick={handleOpenForm} variant="contained" color="primary">
          Add Event
        </Button>
      </Box>
      <Paper elevation={3}>
        <AddEventForm open={openForm} onClose={handleCloseForm} onSubmit={handleSubmitForm} />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            marginTop: '20px',
          }}
        >
          {events.map((event, index) => (
            <Card key={index} style={{ marginBottom: '10px', width: '40%', marginTop: '20px' }}>
              <CardContent style={{ display: 'flex' }}>
                <div style={{ backgroundColor: getRandomColor(), padding: '10px', marginRight: '10px', width: '25%', textAlign: 'center' }}>
                  <Typography variant="subtitle1">
                    {getMonthName(event.date)}
                  </Typography>
                  <Typography variant="h4" style={{ marginBottom: '5px' }}>
                    {event.date.split('-')[2]}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h5" component="h2">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {event.description}
                  </Typography>
                  <Typography color="textSecondary">
                    {formatTime(event.starttime)} - {formatTime(event.endtime)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default EventPage;
