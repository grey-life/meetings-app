import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { compose } from 'redux';
import Container from '../../../components/Container';
import Navbar from '../../../components/Navbar';
import SectionHeading from '../../../components/SectionHeading';
import TableIcons from '../../../components/TableIcons';
import withAuthentication from '../../../components/WithAuthenication';
import withAuthorization from '../../../components/WithAuthorization';
import { getUsers } from '../../../services/getDetails';

const Users = () => {
    const columns = [
        { title: 'First Name', field: 'firstname' },
        { title: 'Last Name', field: 'lastname' },
        { title: 'Email Id', field: 'username', type: 'email' },
    ];

    const [error, setError] = useState(null);
    const [data, setData] = useState([
        {
            name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63,
        },
        {
            name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34,
        },
    ]);

    useEffect(() => {
        (async () => {
            try {
                const result = await getUsers();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        })();
    }, []);

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
                                                    dataUpdate[index] = newData;
                                                    setData([...dataUpdate]);

                                                    resolve();
                                                }, 1000);
                                            },
                                        ),
                                        onRowDelete: (oldData) => new Promise((resolve) => {
                                            setTimeout(() => {
                                                const dataDelete = [...data];
                                                const index = oldData.tableData.id;
                                                dataDelete.splice(index, 1);
                                                setData([...dataDelete]);
                                                resolve();
                                            }, 1000);
                                        }),
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
