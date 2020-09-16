import axios from 'axios';

const signup = (signupCredentials) => axios.post('http://localhost:5000/users/signup', {
    ...signupCredentials,
})
    .then(() => 'Registration Successful!')
    .catch((error) => {
        throw new Error(error.message);
    });

export default signup;
