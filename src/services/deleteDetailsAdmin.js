import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { serviceUrl } from '../config.json';

const deleteUser = (userId) => axios.delete(
    `${serviceUrl}/admin/users/${userId}`,

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
    `${serviceUrl}/admin/meetings/${meetId}`,

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
    `${serviceUrl}/admin/teams/${teamId}`,

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
