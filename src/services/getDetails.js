import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { cors, serviceUrl } from '../config.json';

const getUsers = () => axios.get(`${cors}${serviceUrl}/users`, {
    headers: {
        ...createAuthHeaders(),
    },
})
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getMeetings = ({ date, search }) => axios.get(
    `${cors}${serviceUrl}/api/meetings?date=${date}&search=${search}`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getCalendar = (date) => axios.get(
    `${cors}${serviceUrl}/api/calendar?date=${date}`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getTeams = () => axios.get(
    `${serviceUrl}/api/teams`, {
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
    getUsers,
    getMeetings,
    getCalendar,
    getTeams,
};
