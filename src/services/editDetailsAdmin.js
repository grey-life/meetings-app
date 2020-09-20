import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { serviceUrl } from '../config.json';

const editTeam = (teamId, newTeam) => axios.put(
    `${serviceUrl}/admin/teams/${teamId}`,
    {
        ...newTeam,
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

const editMeeting = (meetingId, newMeeting) => axios.put(
    `${serviceUrl}/admin/meetings/${meetingId}`,
    {
        ...newMeeting,
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

const editUser = (userId, newUser) => axios.put(
    `${serviceUrl}/admin/users/${userId}`,
    {
        ...newUser,
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
    editTeam,
    editMeeting,
    editUser,
};
