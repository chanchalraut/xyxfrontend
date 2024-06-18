import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  CardActions,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,Paper,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import Paper from 'src/theme/overrides/Paper';


interface SyllabusTemplate {
  _id: string;
  title: string;
  content: string;
  selectedSubject: string;
  selectedClass: string;
  subjectName?: string;
  className?: string; 
}

interface Subject {
  _id: string;
  name: string;
}

interface ClassData {
  _id: string;
  name: string;
}

const PageSyllabus: React.FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [content, setContent] = useState<string>('');
  const [templates, setTemplates] = useState<SyllabusTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<SyllabusTemplate | null>(null);
  const [editingTemplateIndex, setEditingTemplateIndex] = useState<number | null>(null);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
    fetchSyllabusData();
    fetchSubjects();
    fetchClasses();
  }, []);

  
  const handleEditTemplate = async (templateId?: string) => {
    if (!templateId || !selectedSubject) {
      console.error('Editing template id or selected subject is missing.');
      return;
    }
    try {
      await axios.put(`http://localhost:3000/api/syllabus/${templateId}`, {
        selectedSubject,
        selectedClass,
        content,
      });
      fetchSyllabusData();
      setOpenCreateDialog(false);
      // Clear form fields after saving
      setSelectedSubject('');
      setSelectedClass('');
      setContent('');
      setEditingTemplateIndex(null);
      setEditingTemplateId(null);
    } catch (error) {
      console.error('Error editing template:', error);
    }
  };
  
  const handleDeleteTemplate = async (templateId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/syllabus/${templateId}`);
      // If successful, update the local state or refetch the templates
      fetchSyllabusData();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleUseTemplate = () => {
    // Handle use template functionality
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  
  const handleSaveSyllabus = async () => {
    try {
      if (isEditing && selectedTemplate) {
        await handleEditTemplate(selectedTemplate._id); // Pass the ID of the template to edit
      } else {
        const response = await axios.post('http://localhost:3000/api/syllabus', {
          selectedSubject,
          selectedClass,
          content,
        });
        console.log('Syllabus saved:', response.data);
        fetchSyllabusData();
        setOpenCreateDialog(false);
        // Clear form fields after saving
        setSelectedSubject('');
        setSelectedClass('');
        setContent('');
      }
    } catch (error) {
      console.error('Error saving syllabus:', error);
    }
  };
  
  const handleAddNewButtonClick = () => {
    setIsEditing(false);
    setSelectedTemplate(null);
    setOpenCreateDialog(true);
    // Clear form fields
    setSelectedSubject('');
    setSelectedClass('');
    setContent('');
  };

  const fetchSyllabusData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/syllabus');
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching syllabus data:', error);
    }
  };

  const handleCardClick = (template: SyllabusTemplate) => {
    setSelectedTemplate(template);
    // setOpenCreateDialog(true);
  };

  
  const renderCardContent = (content: string) => {
    const maxLength = 100; // maximum number of characters to display
    if (content.length <= maxLength) {
      return content;
    }
    return `${content.substring(0, maxLength)}...`;
  };
  const handleEditButtonClick = (template: SyllabusTemplate) => {
    console.log("Editing template:", template);
    setIsEditing(true);
    setSelectedTemplate(template);
    setSelectedSubject(template.selectedSubject);
    setSelectedClass(template.selectedClass);
    setContent(template.content);
    setOpenCreateDialog(true);
  };
  const renderCards = () => {

    return templates.map((template,index) => (
      
      <Grid item xs={12} md={6} lg={4} key={template._id}>
        <Card style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
          <CardContent onClick={() => handleCardClick(template)} style={{ flex: 1 }}>
            <Typography variant="h6">{template.title}</Typography>
            
            <Typography variant="h5" sx={{textAlign:"center", backgroundColor: colors[Math.floor(Math.random() * colors.length)],}}> {template.className}</Typography>
            <Typography variant="body2" sx={{marginTop:'2px'}}>Subject: {template.subjectName}</Typography>

            <Typography
              variant="body2"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxHeight: '100px',
              }}
              dangerouslySetInnerHTML={{ __html: renderCardContent(template.content) }}
            />
          </CardContent>
          <CardActions>
            
              <IconButton aria-label="edit" onClick={() => handleEditButtonClick(template)}>

            <EditIcon />
          </IconButton>
            <IconButton aria-label="delete" onClick={() => handleDeleteTemplate(template._id)}>
              <DeleteIcon />
            </IconButton>

            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
     
    ));
  };
  
  return (
    <>
      <Helmet>
        <title>Syllabus</title>
      </Helmet>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Syllabus
          </Typography>
        </Grid>
        <Grid item>
        <Button variant="contained" onClick={() => { setOpenCreateDialog(true); handleAddNewButtonClick(); }}>
  <AddTwoToneIcon />
  Create Syllabus
</Button>
        
        </Grid>
      </Grid>
     
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Create Syllabus</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <FormControl fullWidth>
                  <InputLabel>Select Class</InputLabel>
                  <Select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value as string)}
                  >
                    <MenuItem value="">Select class</MenuItem>
                    {classes.map((classData) => (
                      <MenuItem key={classData._id} value={classData._id}>
                        {classData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                
                <FormControl fullWidth>
                  <InputLabel>Select Subject</InputLabel>
                  <Select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value as string)}
                  >
                    <MenuItem value="">Select Subject</MenuItem>
                    {subjects.map((subject) => (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <JoditEditor value={content} onChange={(value) => setContent(value)} />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveSyllabus}>
            Save
          </Button>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Syllabus Cards */}
      <Container style={{ height: '100vh', overflowY: 'auto' }}>
        <Grid container spacing={2} justifyContent="center" style={{ height: '100%' }}>
          {renderCards()}
        </Grid>
      </Container>

      <Dialog
        open={selectedTemplate !== null}
        onClose={() => setSelectedTemplate(null)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: {
            width: '210mm', // A4 width
            height: '297mm', // A4 height
            maxWidth: '100%',
            maxHeight: '100%',
          },
        }}
      >
        <DialogTitle>{selectedTemplate?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
            <Typography variant="h5" sx={{textAlign:'center'}} component="div">
              {selectedTemplate?.className}
            </Typography>
            <Typography variant="body2" component="div">
              Subject: {selectedTemplate?.subjectName}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              dangerouslySetInnerHTML={{ __html: selectedTemplate?.content || '' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTemplate(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PageSyllabus;

