import axios from 'axios';
import { cors, serviceUrl, generalError } from '../config.json';

const signup = (signupCredentials) => axios.post(`${cors}${serviceUrl}/users/signup`, {
    ...signupCredentials,
})
    .then(() => 'Registration Successful!')
    .catch(() => {
        throw new Error(generalError);
    });

export default signup;
