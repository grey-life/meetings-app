import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
import { cors, serviceUrl, generalError } from '../config.json';

const editTeam = (teamId, newTeam) => axios.put(
    `${cors}${serviceUrl}/admin/teams/${teamId}`,
    {
        ...newTeam,
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

const editMeeting = (meetingId, newMeeting) => axios.put(
    `${cors}${serviceUrl}/admin/meetings/${meetingId}`,
    {
        ...newMeeting,
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

const editUser = (userId, newUser) => axios.put(
    `${cors}${serviceUrl}/admin/users/${userId}`,
    {
        ...newUser,
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
    editTeam,
    editMeeting,
    editUser,
};
