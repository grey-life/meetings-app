import axios from 'axios';
import createAuthHeaders from '../helpers/createAuthHeader';
const protocol = 'http://';
const link = 'localhost:5000';
const base_url = protocol+link;

const getUsersAdmin = () => axios.get(base_url+'/admin/users', {
    headers: {
        ...createAuthHeaders(),
    },
})
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getMeetingsAdmin = () => axios.get(
    base_url+'/admin/meetings', {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const getTeamsAdmin = () => axios.get(
    base_url+`/admin/teams`, {
        headers: {
            ...createAuthHeaders(),
        },
    },
)
    .then((response) => response.data)
    .catch((error) => {
        throw new Error(error.message);
    });

const projectFields = (obj, projection) => {
    return Object.keys(projection).reduce((a, e) => { a[e] = obj[e]; return a; }, {});
}

export {
    getUsersAdmin,
    getMeetingsAdmin,
    getTeamsAdmin,
    projectFields
};
