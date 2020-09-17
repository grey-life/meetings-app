import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { Calendar as EventCalendar, momentLocalizer } from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import Navbar from '../../components/Navbar';
import SectionHeading from '../../components/SectionHeading';
import Container from '../../components/Container';
import { getCalendar } from '../../services/getDetails';
import withAuthentication from '../../components/WithAuthenication';

const Calendar = () => {
    const localizer = momentLocalizer(moment);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [eventList, setEventList] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setDate(event.target.value);
    };

    useEffect(() => {
        const createEventList = (meetingList) => {
            const newEventList = meetingList.map((meeting) => {
                const { startTime, endTime, description } = meeting;
                const start = new Date(date.split('-'));
                start.setHours(...startTime.split(':').map((time) => parseInt(time, 10)));
                const end = new Date(date.split('-'));
                end.setHours(...endTime.split(':').map((time) => parseInt(time, 10)));
                return {
                    title: description,
                    start,
                    end,
                };
            });
            setEventList(newEventList);
        };

        getCalendar(date)
            .then((data) => {
                createEventList(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [date]);

    return (
        <>
            <Navbar />
            <Container>
                <div className="row d-flex justify-content-center">
                    <SectionHeading title="Calendar" />
                    <div className="col-8  d-flex justify-content-between">
                        <div className="col-5">
                            <h4>
                                {moment(date).format('DD MMM YYYY')}
                            </h4>
                            <h6>
                                {moment(date).format('dddd')}
                            </h6>
                        </div>
                        <div className="col-5 text-right">
                            <input
                                type="date"
                                id="start"
                                value={date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-8 rbc-calendar mt-2">
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <EventCalendar
                            localizer={localizer}
                            style={style}
                            events={eventList}
                            date={new Date(date)}
                            defaultView="day"
                            views={['day']}
                            startAccessor="start"
                            endAccessor="end"
                            onNavigate={() => {}}
                        />
                    </div>
                </div>

            </Container>
        </>
    );
};
export default withAuthentication(Calendar);
