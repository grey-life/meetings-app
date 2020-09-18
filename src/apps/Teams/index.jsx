import React from 'react';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import withAuthentication from '../../components/WithAuthenication';

const Teams = () => (
    <>
        <Navbar userRole="user" selected="Teams" />
        <Container>
            Teams coming soon!
        </Container>
    </>
);
export default withAuthentication(Teams);
