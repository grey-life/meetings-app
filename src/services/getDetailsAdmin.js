import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';

const protocol = 'http://';
const link = 'localhost:5000';
const baseUrl = protocol + link;

const getUsersAdmin = () => axios.get(`${baseUrl}/admin/users`, {
    headers: {
        ...createAuthHeaders(),
    },
})
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getMeetingsAdmin = () => axios.get(
    `${baseUrl}/admin/meetings`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getTeamsAdmin = () => axios.get(
    `${baseUrl}/admin/teams`, {
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
    getUsersAdmin,
    getMeetingsAdmin,
    getTeamsAdmin,
};
