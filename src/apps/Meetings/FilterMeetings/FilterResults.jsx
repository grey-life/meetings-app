/* eslint-disable react/prop-types */
import React from 'react';
import Meeting from './Meeting';

const FilterResult = ({ meetings, removeMeeting, userEmails }) => (
    <div className="col mt-4">
        <h4>Meetings matching the result </h4>
        <hr />
        {
            meetings.map((meeting, index) => (
                <Meeting
                    key={meeting.description}
                    meeting={meeting}
                    removeMeeting={() => removeMeeting(index)}
                    userEmails={userEmails}
                />
            ))
        }
    </div>
);

export default FilterResult;
