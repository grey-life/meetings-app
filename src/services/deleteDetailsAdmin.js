import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';

const deleteUser = (userId) => axios.delete( //console.log('services:', userId)
    `http://localhost:5000/admin/users/${userId}`,
    
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

const deleteMeeting = (meetId) => axios.delete( 
    `http://localhost:5000/admin/meetings/${meetId}`,
    
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

const deleteTeam = (teamId) => axios.delete( 
    `http://localhost:5000/admin/teams/${teamId}`,
    
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
    deleteUser,
    deleteMeeting,
    deleteTeam
};
