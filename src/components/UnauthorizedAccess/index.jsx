import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';

const UnauthorizedAccess = () => (
    <Container>
        <div className="row alert alert-info  d-flex justify-content-center">
            <div className="col-8">
                <h4 className="alert-heading ">
                    Access Denied
                </h4>
                <p>You are not authorizied to view this page</p>
                <Link className="btn btn-info" to="/">Click here to go back to home page!</Link>
            </div>
        </div>
    </Container>
);

export default UnauthorizedAccess;
