import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const onSuccess = ({ data }) => {
    localStorage.setItem('accessToken', data.token);
    return data;
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
};
