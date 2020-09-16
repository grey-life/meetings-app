import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SectionHeading from '../../components/SectionHeading';
import Container from '../../components/Container';
import Routes from './routes';
import withAuthentication from '../../components/WithAuthenication';

const Meetings = () => {
    const [active, setActive] = useState(true);

    const handleClick = (event) => {
        if (!event.target.classList.contains('active')) {
            if (active) {
                setActive(false);
            } else {
                setActive(true);
            }
        }
    };

    return (
        <>
            <Navbar />
            <Container>
                <div className="row d-flex justify-content-center">
                    <SectionHeading title="Meetings" />
                    <div className="col-8">
                        <div className="card">
                            <div className="card-header">
                                <ul className="nav nav-pills card-header-pills">
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${active && 'active'}`}
                                            to="/meetings"
                                            onClick={handleClick}
                                        >
                                            Filter/Search Meetings
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link ${!active && 'active'}`}
                                            to="/meetings/add"
                                            onClick={handleClick}
                                        >
                                            Add Meeting
                                        </Link>
                                    </li>
                                </ul>
                                <div className="card-body">
                                    <Routes />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};
export default withAuthentication(Meetings);