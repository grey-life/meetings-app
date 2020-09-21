import axios from 'axios';
import { cors, serviceUrl, generalError } from '../config.json';
import createAuthHeaders from '../helpers/createAuthHeader';

const addMeeting = (meeting) => axios.post(
    `${cors}${serviceUrl}/api/meetings`,
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
    .catch(() => {
        throw new Error(generalError);
    });

const addTeam = (team) => axios.post(
    `${cors}${serviceUrl}/api/teams`,
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
    .catch(() => {
        throw new Error(generalError);
    });

export {
    addMeeting,
    addTeam,
};
