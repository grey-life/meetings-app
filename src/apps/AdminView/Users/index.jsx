import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import EmailVaidator from 'email-validator';
import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import SectionHeading from '../../../components/SectionHeading';
import TableIcons from '../../../components/TableIcons';
import withAuthentication from '../../../components/WithAuthenication';
import withAuthorization from '../../../components/WithAuthorization';
import { getUsersAdmin, projectFields } from '../../../services/getDetailsAdmin';
import { deleteUser } from '../../../services/deleteDetailsAdmin';
import { editUser } from '../../../services/editDetailsAdmin';

const Users = () => {
    const columns = [
        {
            title: 'First Name',
            field: 'firstname',
            validate: (rowData) => (rowData.firstname === '' ? { isValid: false, helperText: 'First Name cannot be empty' } : true),
        },
        {
            title: 'Last Name',
            field: 'lastname',
            validate: (rowData) => (rowData.lastname === '' ? { isValid: false, helperText: 'Last Name cannot be empty' } : true),
        },
        {
            title: 'Email Id',
            field: 'username',
            validate: (rowData) => {
                const error = { isValid: false };
                if (rowData.username === '') {
                    error.helperText = 'Email Id cannot be empty';
                    return error;
                }
                if (!EmailVaidator.validate(rowData.username)) {
                    error.helperText = 'Invalid Email Id';
                    return error;
                }
                return true;
            },
        },
    ];

    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(async () => {
        async function fetchData() {
            const result = await getUsersAdmin();
            setData(result)
        };
        fetchData();
    },[]);

    const deleteServiceHandler = async (toDel) => { 
         try {
            const res = await deleteUser(toDel._id);
        }
        catch (err) {
            setError(err.message);
        }
}
    const editServiceHandler = async (toEdit) => {
        const newUser = {
            firstname : toEdit.firstname,
            lastname  : toEdit.lastname,
            username  : toEdit.username
        }
        try {
            const res = await editUser(toEdit._id, newUser);
        }
        catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <Navbar userRole="admin" selected="Users" />
            <Container>
                <div className="row d-flex justify-content-center">
                    <SectionHeading title="Users" />
                    <div className="col-8">
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : (
                                <MaterialTable
                                    icons={TableIcons}
                                    title="User Details"
                                    columns={columns}
                                    data={data}
                                    editable={{
                                        onRowUpdate: (newData, oldData) => new Promise(
                                            (resolve) => {
                                                setTimeout(() => {
                                                    const dataUpdate = [...data];
                                                    const index = oldData.tableData.id;
                                                    editServiceHandler(newData) 
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
                                                    deleteServiceHandler(oldData)
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

export default enhance(Users);
