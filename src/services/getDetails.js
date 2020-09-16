import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';

const getUsers = () => axios.get('http://localhost:5000/users', {
    headers: {
        ...createAuthHeaders(),
    },
})
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getMeetings = ({ date, search }) => axios.get(
    `http://localhost:5000/api/meetings?date=${date}&search=${search}`, {
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
    `http://localhost:5000/api/calendar?date=${date}`, {
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
};
