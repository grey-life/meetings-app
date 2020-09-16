import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';

const addAttendees = (meetingId, attendees) => axios.patch(
    `http://localhost:5000/api/meetings/${meetingId}?action=add_attendees`,
    {
        attendees,
    },
    {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const excuseYourself = (meetingId) => axios.patch(
    `http://localhost:5000/api/meetings/${meetingId}?action=excuse_yourself`,
    {},
    {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

export {
    addAttendees,
    excuseYourself,
};
