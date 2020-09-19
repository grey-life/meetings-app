/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import SectionHeading from '../../../components/SectionHeading';
import UserDropdown from '../../../components/UserDropdown';
import TableIcons from '../../../components/TableIcons';
import withAuthentication from '../../../components/WithAuthenication';
import withAuthorization from '../../../components/WithAuthorization';

const Teams = () => {
    const [data, setData] = useState([
        {
            name: 'Core Team',
            shortname: '@core-team',
            description: 'These are the core members of Meetings App',
            members: ['John', 'Victoria'],
        },
        {
            name: 'Design Team',
            shortname: '@design-team',
            description: 'The design team behind Meetings App',
            members: ['Adam', 'Jane'],
        },
    ]);

    const userList = [
        'Adam',
        'Jane',
        'John',
        'Victoria',
    ];

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

    return (
        <>
            <Navbar userRole="admin" selected="Teams" />
            <Container>
                <div className="row d-flex justify-content-center">
                    <SectionHeading title="Teams" />
                    <div className="col-8">
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
