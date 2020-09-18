import React from 'react';
import { compose } from 'redux';
import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import SectionHeading from '../../../components/SectionHeading';
import withAuthentication from '../../../components/WithAuthenication';
import withAuthorization from '../../../components/WithAuthorization';

const Teams = () => (
    <>
        <Navbar userRole="admin" selected="Teams" />
        <Container>
            <div className="row d-flex justify-content-center">
                <SectionHeading title="Teams" />
            </div>
        </Container>
    </>
);

const enhance = compose(withAuthentication, withAuthorization);

export default enhance(Teams);