import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { cors, serviceUrl, generalError } from '../config.json';

const getUsers = () => axios.get(`${cors}${serviceUrl}/users`, {
    headers: {
        ...createAuthHeaders(),
    },
})
    .then((response) => response.data)
    .catch(() => {
        throw new Error(generalError);
    });

const getMeetings = ({ date, search }) => axios.get(
    `${cors}${serviceUrl}/api/meetings?date=${date}&search=${search}`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch(() => {
        throw new Error(generalError);
    });

const getCalendar = (date) => axios.get(
    `${cors}${serviceUrl}/api/calendar?date=${date}`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch(() => {
        throw new Error(generalError);
    });

const getTeams = () => axios.get(
    `${cors}${serviceUrl}/api/teams`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch(() => {
        throw new Error(generalError);
    });

const getAllTeams = () => axios.get(
    `${cors}${serviceUrl}/api/teams/allteams`, {
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
    getUsers,
    getMeetings,
    getCalendar,
    getTeams,
    getAllTeams,
};
