/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withAuthentication = (WrappedComponent) => (props) => {
    const authenticationStatus = useSelector((state) => state.user.authenticationStatus);

    if (!authenticationStatus) {
        return <Redirect to="/login" />;
    }
    return <WrappedComponent {...props} />;
};

export default withAuthentication;
