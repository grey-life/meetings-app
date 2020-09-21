import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { cors, serviceUrl, generalError } from '../config.json';

const getUsersAdmin = () => axios.get(`${cors}${serviceUrl}/admin/users`, {
    headers: {
        ...createAuthHeaders(),
    },
})
    .then((response) => response.data)
    .catch(() => {
        throw new Error(generalError);
    });

const getMeetingsAdmin = () => axios.get(
    `${cors}${serviceUrl}/admin/meetings`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch(() => {
        throw new Error(generalError);
    });

const getTeamsAdmin = () => axios.get(
    `${cors}${serviceUrl}/admin/teams`, {
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
    getUsersAdmin,
    getMeetingsAdmin,
    getTeamsAdmin,
};
