import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';

const editTeam = (teamId, newTeam) => axios.put(
    `http://localhost:5000/admin/teams/${teamId}`,
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
    .catch((error) => {
        throw new Error(error.message)
    });

const editMeeting = (meetingId, newMeeting) => axios.put(
    `http://localhost:5000/admin/meetings/${meetingId}`,
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
    .catch((error) => {
        throw new Error(error.message)
    });

const editUser = (userId, newUser) => axios.put(
    `http://localhost:5000/admin/users/${userId}`,
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
    .catch((error) => {
        throw new Error(error.message)
    });

export {
    editTeam,
    editMeeting,
    editUser
};