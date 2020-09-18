import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import signup from '../../services/registration';
import Container from '../../components/Container';
import withoutAuthentication from '../../components/WithoutAuthentication';
import './Signup.css';

const Signup = () => {
    const [error, setError] = useState(null);

    const validate = (values) => {
        const errors = {};
        const passwordRegex = /(?=.*[0-9])/;

        if (!values.firstName) {
            errors.firstName = 'Required';
        } else if (values.firstName.length > 15) {
            errors.firstName = 'Must be 15 characters or less';
        }

        if (!values.lastName) {
            errors.lastName = 'Required';
        } else if (values.lastName.length > 20) {
            errors.lastName = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be 8 characters long.';
        } else if (!passwordRegex.test(values.password)) {
            errors.password = 'Invalid password. Must contain one number.';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
        } else if (
            (values.confirmPassword && values.password)
            && (values.confirmPassword !== values.password)
        ) {
            errors.confirmPassword = 'Confirm Password should match password';
        }
        return errors;
    };

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate,
        onSubmit: async ({
            email: username,
            firstName: firstname,
            lastName: lastname,
            ...rest
        }) => {
            try {
                await signup({
                    username, firstname, lastname, ...rest,
                });
                history.push('/login');
            } catch (err) {
                setError(err.message);
            }
        },
    });

    return (
        <Container>
            <div className="row signup-fill d-flex align-items-end d-flex justify-content-center">
                <div className="card col-6">
                    <form className="card-body" onSubmit={formik.handleSubmit}>
                        <h2>Sign Up</h2>
                        <p>Please fill in this form to create an account!</p>
                        <hr />
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        placeholder="First Name"
                                        required="required"
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        placeholder="Last Name"
                                        required="required"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                    />
                                </div>
                            </div>
                        </div>
                        {formik.errors.firstName && (
                            <div className="alert alert-danger">
                                {formik.errors.firstName}
                            </div>
                        )}
                        {formik.errors.lastName && (
                            <div className="alert alert-danger">
                                {formik.errors.lastName}
                            </div>
                        )}
                        <div className="form-group">
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                required="required"
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
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                required="required"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        {formik.errors.password && (
                            <div className="alert alert-danger">
                                {formik.errors.password}
                            </div>
                        )}
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required="required"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                        </div>
                        {formik.errors.confirmPassword && (
                            <div className="alert alert-danger">
                                {formik.errors.confirmPassword}
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}
                        <div className="d-flex justify-content-between">
                            <Link className="btn btn-outline-primary" to="/calendar"> Already have an account ? </Link>
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

export default withoutAuthentication(Signup);
