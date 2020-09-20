import React, { useState, useEffect } from 'react';
import AddTeam from './AddTeam';
import SectionHeading from '../../components/SectionHeading';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import Team from './Team';
import { getUsers, getTeams } from '../../services/getDetails';
import withAuthentication from '../../components/WithAuthenication';

const Teams = () => {
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);

    const removeTeam = (index) => {
        const updatedTeams = [...teams];
        updatedTeams.splice(index, 1);
        setTeams(updatedTeams);
    };

    const updateTeams = () => {
        getTeams()
            .then((data) => {
                setTeams(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    useEffect(() => {
        getUsers()
            .then((data) => {
                setUserList(data.map((user) => user.username));
            })
            .catch((err) => {
                setError(err.message);
            });
        getTeams()
            .then((data) => {
                setTeams(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);
    return (
        <>
            <Navbar userRole="user" selected="Teams" />
            <Container>
                <div className="row d-flex justify-content-center">
                    <SectionHeading title="Teams" />
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    <div className="row col-9">
                        <AddTeam userList={userList} updateTeams={updateTeams} />
                        {
                            teams.map((team, index) => {
                                const { _id: teamId } = team;
                                return (
                                    <div
                                        className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch mb-2 mt-2"
                                        key={teamId}
                                    >
                                        <Team
                                            removeTeam={() => removeTeam(index)}
                                            userList={userList}
                                            team={team}
                                        />
                                    </div>

                                );
                            })
                        }
                    </div>

                </div>
            </Container>
        </>
    );
};
export default withAuthentication(Teams);
