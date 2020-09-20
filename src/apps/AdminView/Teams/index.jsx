/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import SectionHeading from '../../../components/SectionHeading';
import UserDropdown from '../../../components/UserDropdown';
import TableIcons from '../../../components/TableIcons';
import withAuthentication from '../../../components/WithAuthenication';
import withAuthorization from '../../../components/WithAuthorization';
import { getTeamsAdmin, getUsersAdmin } from '../../../services/getDetailsAdmin';
import { deleteTeam } from '../../../services/deleteDetailsAdmin';
import { editTeam } from '../../../services/editDetailsAdmin';

const Teams = () => {
    const [userList, setUserList] = useState([]);

    const columns = [
        {
            title: 'Name',
            field: 'name',
            validate: (rowData) => (rowData.name === '' ? { isValid: false, helperText: 'Team Name cannot be empty' } : true),
        },
        {
            title: 'Short Name',
            field: 'shortname',
            validate: (rowData) => {
                const error = { isValid: false };
                if (rowData.shortname === '') {
                    error.helperText = 'Team Name cannot be empty';
                    return error;
                }
                if (!rowData.shortname.match(/^@[a-z][\w-]*/)) {
                    error.helperText = 'Team Name should start with \'@\' can only contain letters and \'-\' ';
                    return error;
                }
                return true;
            },
        },
        {
            title: 'Description',
            field: 'description',
            validate: (rowData) => (rowData.description === '' ? { isValid: false, helperText: 'Team description cannot be empty' } : true),
        },
        {
            title: 'Members',
            field: 'members',
            editComponent: (props) => <UserDropdown {...props} editable userList={userList} />,
            render: (rowData) => (
                <UserDropdown
                    value={rowData.members}
                    disabled
                    userList={userList}
                />
            ),
        },
    ];

    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getTeamsAdmin();
                const dataProjected = [];
                result.map(((eachTeam) => dataProjected.push(eachTeam)));
                const users = await getUsersAdmin();
                setUserList(users.map((user) => user.username));
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    const deleteServiceHandler = async (teamToDel) => {
        const { _id: teamId } = teamToDel;
        try {
            await deleteTeam(teamId);
        } catch (err) {
            setError(err.message);
        }
    };
    const editServiceHandler = async (toEdit) => {
        const { _id: teamId } = toEdit;
        const newTeam = {
            members: toEdit.members,
            name: toEdit.name,
            shortname: toEdit.shortname,
            description: toEdit.description,
        };
        try {
            await editTeam(teamId, newTeam);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar userRole="admin" selected="Teams" />
            <Container>
                <div className="row d-flex justify-content-center">
                    <div className="col">
                        <SectionHeading title="Teams" />
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : (
                                <MaterialTable
                                    icons={TableIcons}
                                    title="Team Details"
                                    columns={columns}
                                    data={data}
                                    editable={{
                                        onRowUpdate: (newData, oldData) => new Promise(
                                            (resolve) => {
                                                setTimeout(() => {
                                                    const dataUpdate = [...data];
                                                    const index = oldData.tableData.id;
                                                    editServiceHandler(newData);
                                                    dataUpdate[index] = newData;
                                                    setData([...dataUpdate]);

                                                    resolve();
                                                }, 1000);
                                            },
                                            (reject) => {
                                                setError(reject);
                                            },
                                        ),
                                        onRowDelete: (oldData) => new Promise(
                                            (resolve) => {
                                                setTimeout(() => {
                                                    const dataDelete = [...data];
                                                    const index = oldData.tableData.id;
                                                    deleteServiceHandler(oldData);
                                                    dataDelete.splice(index, 1);
                                                    setData([...dataDelete]);
                                                    resolve();
                                                }, 1000);
                                            }, (reject) => {
                                                setError(reject);
                                            },
                                        ),
                                    }}
                                />
                            )
                        }
                    </div>
                </div>
            </Container>
        </>
    );
};
const enhance = compose(withAuthentication, withAuthorization);

export default enhance(Teams);
