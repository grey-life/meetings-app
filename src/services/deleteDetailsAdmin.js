import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { cors, serviceUrl, generalError } from '../config.json';

const deleteUser = (userId) => axios.delete(
    `${cors}${serviceUrl}/admin/users/${userId}`,

    {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch(() => {
        throw new Error(generalError);
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
    .catch(() => {
        throw new Error(generalError);
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
    .catch(() => {
        throw new Error(generalError);
    });

export {
    deleteUser,
    deleteMeeting,
    deleteTeam,
};
