import axios from 'axios';
import { cors, serviceUrl } from '../config.json';

const signup = (signupCredentials) => axios.post(`${cors}${serviceUrl}/users/signup`, {
    ...signupCredentials,
})
    .then(() => 'Registration Successful!')
    .catch((error) => {
        throw new Error(error.message);
    });

export default signup;
