import axios from 'axios';
import { serviceUrl } from '../config.json';

const signup = (signupCredentials) => axios.post(`${serviceUrl}/users/signup`, {
    ...signupCredentials,
})
    .then(() => 'Registration Successful!')
    .catch((error) => {
        throw new Error(error.message);
    });

export default signup;
