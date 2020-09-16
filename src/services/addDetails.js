import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';

const addMeeting = (meeting) => axios.post(
    'http://localhost:5000/api/meetings',
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

export default addMeeting;
