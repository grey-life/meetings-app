/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import UserDropdown from '../UserDropdown';
import { excuseYourself, addAttendees } from '../../../services/updateDetails';

const Meeting = ({
    meeting, userEmails, removeMeeting,
}) => {
    const [attendees, setAttendees] = useState(meeting.attendees);
    const [error, setError] = useState(null);

    const addAttendee = (attendee) => {
        const newAttendees = [...attendees];
        if (!newAttendees.includes(attendee)) {
            newAttendees.push(attendee);
            setAttendees(newAttendees);
        }
    };

    const updateMeeting = async () => {
        const { _id: meetingId } = meeting;
        try {
            await addAttendees(meetingId, attendees);
            toast.success('Meeting Updated', {
                position: 'bottom-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            setError(err);
        }
    };

    const handleClick = async () => {
        const { _id: meetingId } = meeting;
        try {
            await excuseYourself(meetingId);
            removeMeeting();
            toast.error('You have left the meeting', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-body">
                <div className="form-group d-flex justify-content-between">
                    <h5 className="card-title">{moment(meeting.date).format('DD MMMM YYYY')}</h5>
                    <div>
                        {`${meeting.startTime} - ${meeting.endTime}`}
                    </div>
                </div>
                <p className="card-text">{meeting.description}</p>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClick}
                >
                    Leave Meeting
                </button>
                <hr />
                <h5>Attendees</h5>
                <p>{ attendees.join(',') }</p>
                {
                    error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )
                }
                <ToastContainer />
                <UserDropdown addAttendee={addAttendee} userEmails={userEmails} />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateMeeting}
                >
                    Update Meeting
                </button>
            </div>
        </div>
    );
};

export default Meeting;
