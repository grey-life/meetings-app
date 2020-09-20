import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { serviceUrl } from '../config.json';

const addAttendees = (meetingId, attendees) => axios.patch(
    `${serviceUrl}/api/meetings/${meetingId}?action=add_attendees`,
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
    `${serviceUrl}/api/meetings/${meetingId}?action=excuse_yourself`,
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

const leaveTeam = (teamId) => axios.patch(
    `${serviceUrl}/api/teams/${teamId}?action=excuse_yourself`,
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

const addMembers = (teamId, members) => axios.patch(
    `${serviceUrl}/api/teams/${teamId}?action=add_members`,
    {
        members,
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

export {
    addAttendees,
    excuseYourself,
    leaveTeam,
    addMembers,
};
