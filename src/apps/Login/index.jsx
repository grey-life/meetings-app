import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../redux/userSlice';
import { login } from '../../services/authentication';
import Container from '../../components/Container';
import withoutAuthentication from '../../components/WithoutAuthentication';
import './Login.css';

const Login = () => {
    const [error, setError] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const validate = (values) => {
        const errors = {};

        if (!values.password) {
            errors.password = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        validateOnChange: false,
        onSubmit: async ({ email: username, password }) => {
            try {
                const data = await login({ username, password });
                dispatch(setAuth(data));
                history.push('/');
            } catch (err) {
                setError(err.message);
            }
        },
    });

    return (
        <Container>
            <div className="row fill align-items-end d-flex justify-content-center">
                <div className="card col-6">
                    <form className="card-body" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        {formik.errors.email && (
                            <div className="alert alert-danger">
                                {formik.errors.email}
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />

                        </div>
                        {formik.errors.password && (
                            <div className="alert alert-danger">
                                {formik.errors.password}
                            </div>
                        )}
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-primary" to="/signup"> Create Account </Link>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={formik.isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
};
export default withoutAuthentication(Login);
