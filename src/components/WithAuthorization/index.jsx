/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import UnauthorizedAccess from '../UnauthorizedAccess';

const withAuthentication = (WrappedComponent) => (props) => {
    const admin = useSelector((state) => state.user.admin);

    if (!admin) {
        return <UnauthorizedAccess />;
    }

    return <WrappedComponent {...props} />;
};

export default withAuthentication;
