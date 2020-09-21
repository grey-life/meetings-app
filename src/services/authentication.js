import axios from 'axios';
import { cors, serviceUrl, generalError } from '../config.json';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const onSuccess = ({ data }) => {
    localStorage.setItem('accessToken', data.token);
    return data;
};

const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        if (`${decodedToken.exp}` < `${new Date().getTime()}`) {
            localStorage.removeItem('accessToken');
            return true;
        }
        return false;
    }
    return true;
};

const login = (credentials) => axios.post(`${cors}${serviceUrl}/users/login/`, {
    ...credentials,
})
    .then(onSuccess)
    .catch(() => {
        throw new Error(generalError);
    });

const logout = () => {
    localStorage.removeItem('accessToken');
};

export {
    login,
    logout,
    checkTokenExpiration,
};
