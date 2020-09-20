import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { serviceUrl } from '../config.json';

const getUsersAdmin = () => axios.get(`${serviceUrl}/admin/users`, {
    headers: {
        ...createAuthHeaders(),
    },
})
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getMeetingsAdmin = () => axios.get(
    `${serviceUrl}/admin/meetings`, {
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
    `${serviceUrl}/admin/teams`, {
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
