/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddTeamForm from './AddTeamForm';
import './AddTeam.css';

const AddTeams = ({ userList, updateTeams }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch mb-2 mt-2">
            <div
                className="card add-teams-btn team-card"
                title="Add Team"
                role="button"
                tabIndex={0}
                onClick={handleClickOpen}
                onKeyDown={() => { handleClickOpen(); }}
            >
                <div>
                    +
                </div>
            </div>
            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">Add Teams</DialogTitle>
                <DialogContent>
                    <AddTeamForm
                        userList={userList}
                        updateTeams={updateTeams}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTeams;
