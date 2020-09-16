/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import UserDropdown from '../UserDropdown';
import { excuseYourself, addAttendees } from '../../../services/updateDetails';

const Meeting = ({ meeting, userEmails, removeMeeting }) => {
    const [attendees, setAttendees] = useState(meeting.attendees);

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
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async () => {
        const { _id: meetingId } = meeting;
        try {
            await excuseYourself(meetingId);
            removeMeeting();
        } catch (error) {
            console.log(error);
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
                    Excuse Yourself
                </button>
                <hr />
                <h5>Attendees</h5>
                <p>{ attendees.join(',') }</p>
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
