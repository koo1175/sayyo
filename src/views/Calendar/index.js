import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
    const [eventTitle, setEventTitle] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/api/events')
        .then((response) => {
            if (Array.isArray(response.data)) { 
                const events = response.data
                    .filter(e => e != null)
                    .map((e) => ({
                    ...e,
                    start: new Date(e.start),
                    end: new Date(e.end),
                    }));
        
                setEvents(events);

                const todayEvents = events.filter(e => 
                    moment(e.start).isSame(moment(), 'day')
                ); 
        
                if (todayEvents.length > 0) {
                    const titles = todayEvents.map(event => event.title).join(', ');
                    setEventTitle(`오늘의 일정: ${titles}`);
                } else {
                    setEventTitle('오늘의 일정이 없습니다.');
                }
                }
            });
        }, []);

    function CustomToolbar({ label, onNavigate }) {
        return (
            <div>
                <button onClick={() => onNavigate('PREV')}>◀</button>
                <span>{label}</span>
                <button onClick={() => onNavigate('NEXT')}>▶</button>
            </div>
        );
    }


    return (
        <div style={{width: 1400}}>
        <div style={{ width: 1300, height: 500, marginTop: 100 }}>
            <BigCalendar  // 수정된 부분
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month']}
                components={{
                    toolbar: CustomToolbar,
                }}
                dayPropGetter={(date) => {
                    if (moment().isSame(date, 'day')) {
                        return {
                            style: {
                                backgroundColor: '#eaf6ff', // 원하는 색상을 설정하세요.
                            },
                        };
                    }
                }}
            />
        </div>
        </div>
    );
}