import axios from 'axios';
import jwt from 'jsonwebtoken';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const onSuccess = ({ data }) => {
    localStorage.setItem('accessToken', data.token);
    return data;
};

const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const decodedToken = jwt.decode(accessToken, { complete: true });
        if (decodedToken.exp < new Date().getTime()) {
            localStorage.removeItem('accessToken');
            return true;
        }
        return false;
    }
    return true;
};

const login = (credentials) => axios.post('http://localhost:5000/users/login/', {
    ...credentials,
})
    .then(onSuccess)
    .catch((error) => {
        throw new Error(error.message);
    });
const logout = () => {
    localStorage.removeItem('accessToken');
};

export {
    login,
    logout,
    checkTokenExpiration,
};
