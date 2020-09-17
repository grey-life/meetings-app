/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkTokenExpiration } from '../../services/authentication';

const withAuthentication = (WrappedComponent) => (props) => {
    const authenticationStatus = useSelector((state) => state.user.authenticationStatus);

    if (checkTokenExpiration() || !authenticationStatus) {
        return <Redirect to="/login" />;
    }
    return <WrappedComponent {...props} />;
};

export default withAuthentication;
