import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

const StudyCard = ({ study, onDeleteConfirm }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      onDeleteConfirm(study.id);
    }
  };

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/interviews/${study.id}`, { state: { study } });
  };

  return (
    <>
      <Card variant="outlined" className="study-card">
        <CardContent>
          <Typography variant="h6" component="h2">
            {study.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {study.description}
          </Typography>
          <Button color="primary" onClick={handleViewClick}>
            View
          </Button>
          <Button color="error" onClick={handleDeleteClick}>
            Delete
          </Button>
        </CardContent>
      </Card>
      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this study?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudyCard;
