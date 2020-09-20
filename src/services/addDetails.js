import axios from 'axios';
import { serviceUrl } from '../config.json';
import createAuthHeaders from '../helpers/createAuthHeader';

const addMeeting = (meeting) => axios.post(
    `${serviceUrl}/api/meetings`,
    {
        ...meeting,
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

const addTeam = (team) => axios.post(
    `${serviceUrl}/api/teams`,
    {
        ...team,
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
    addMeeting,
    addTeam,
};
