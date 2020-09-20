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
import { getMeetingsAdmin, getUsersAdmin } from '../../../services/getDetailsAdmin';
import { deleteMeeting } from '../../../services/deleteDetailsAdmin';
import { editMeeting } from '../../../services/editDetailsAdmin';
import padZeros from '../../../helpers/padZeros';

const Meetings = () => {
    const [userList, setUserList] = useState([]);

    const columns = [
        { title: 'Date', field: 'date', type: 'date' },
        {
            title: 'Start Time (HH)',
            field: 'startTimeHours',
            type: 'numeric',
            validate: (rowData) => {
                const error = { isValid: false };
                if (rowData.startTimeHours > 24 || rowData.startTimeHours < 0) {
                    error.helperText = 'Hours should be between 0 - 24';
                    return error;
                }

                return true;
            },
        },
        {
            title: 'Start Time (MM)',
            field: 'startTimeMinutes',
            type: 'numeric',
            validate: (rowData) => {
                const error = { isValid: false };
                if (rowData.startTimeMinutes > 59 || rowData.startTimeMinutes < 0) {
                    error.helperText = 'Minutes should be between 0 - 59';
                    return error;
                }

                return true;
            },
        },
        {
            title: 'End Time (HH)',
            field: 'endTimeHours',
            type: 'numeric',
            validate: (rowData) => {
                const error = { isValid: false };
                if (rowData.endTimeHours > 24 || rowData.endTimeHours < 0) {
                    error.helperText = 'Hours should be between 0 - 24';
                    return error;
                }
                if (rowData.endTimeHours < rowData.startTimeHours) {
                    error.helperText = 'End Time cannot be less then Start time';
                    return error;
                }

                return true;
            },
        },
        {
            title: 'End Time (MM)',
            field: 'endTimeMinutes',
            type: 'numeric',
            validate: (rowData) => {
                const error = { isValid: false };
                if (rowData.endTimeMinutes > 59 || rowData.endTimeMinutes < 0) {
                    error.helperText = 'Minutes should be between 0 - 59';
                    return error;
                }
                if (
                    (rowData.endTimeHours === rowData.startTimeHours)
                    && (rowData.endTimeMinutes < rowData.startTimeMinutes)
                ) {
                    error.helperText = 'End Time cannot be less than Start time';
                    return error;
                }

                return true;
            },
        },
        {
            title: 'Description',
            field: 'description',
            validate: (rowData) => (rowData.description === '' ? { isValid: false, helperText: 'Last Name cannot be empty' } : true),
        },
        {
            title: 'Attendees',
            field: 'attendees',
            editComponent: (props) => <UserDropdown {...props} editable userList={userList} />,
            render: (rowData) => (
                <UserDropdown
                    value={rowData.attendees}
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
                const result = await getMeetingsAdmin();
                const dataProjected = [];
                result.map((({ _id: id, ...rest }) => dataProjected.push({
                    ...rest,
                    startTimeHours: parseInt(rest.startTime.split(':')[0], 10),
                    startTimeMinutes: parseInt(rest.startTime.split(':')[1], 10),
                    endTimeHours: parseInt(rest.endTime.split(':')[0], 10),
                    endTimeMinutes: parseInt(rest.endTime.split(':')[1], 10),
                    id,
                })
                ));
                const users = await getUsersAdmin();
                setUserList(users.map((user) => user.username));
                setData(dataProjected);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    const deleteServiceHandler = async (meetToDelete) => {
        const { id: meetingId } = meetToDelete;
        try {
            await deleteMeeting(meetingId);
        } catch (err) {
            setError(err.message);
        }
    };

    const editServiceHandler = async (toEdit) => {
        const newMeeting = {
            attendees: toEdit.attendees,
            date: toEdit.date,
            description: toEdit.description,
            startTime: `${padZeros(toEdit.startTimeHours)}:${padZeros(toEdit.startTimeMinutes)}`,
            endTime: `${padZeros(toEdit.endTimeHours)}:${padZeros(toEdit.endTimeMinutes)}`,

        };
        const { id: meetingId } = toEdit;
        try {
            await editMeeting(meetingId, newMeeting);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar userRole="admin" selected="Meetings" />
            <Container>
                <div className="row d-flex justify-content-center">
                    <div className="col">
                        <SectionHeading title="Meetings" />
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : (
                                <MaterialTable
                                    icons={TableIcons}
                                    title="Meeting Details"
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

export default enhance(Meetings);
