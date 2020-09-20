import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { cors, serviceUrl } from '../config.json';

const deleteUser = (userId) => axios.delete(
    `${cors}${serviceUrl}/admin/users/${userId}`,

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

const deleteMeeting = (meetId) => axios.delete(
    `${cors}${serviceUrl}/admin/meetings/${meetId}`,

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

const deleteTeam = (teamId) => axios.delete(
    `${cors}${serviceUrl}/admin/teams/${teamId}`,

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
    deleteUser,
    deleteMeeting,
    deleteTeam,
};
