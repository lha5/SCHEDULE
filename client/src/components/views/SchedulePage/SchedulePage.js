import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import swal from 'sweetalert';

import { getMySchedule } from './../../../apis/scheduleApi';

import { getCalendarTheme } from './../../../apis/calendarApi';

import ScheduleComponent from './Schedule';
import CalendarComponent from './CalendarTheme/CalendarTheme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px calc(23%);
  margin: 0 auto;

  @media only screen and (max-width: 1400px) {
    padding: 20px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 45px calc(18%);
  }
`;

function SchedulePage() {
  const user = useSelector(state => state.user);

  const [Schedule, setSchedule] = useState([]);
  const [Calendars, setCalendars] = useState([]);

  useEffect(() => {
    if (user && user.userData && user.userData.isAuth) {
      getSchedule();
      getCalendar();
    }
  }, [user]);
  
  const getSchedule = () => {
    getMySchedule()
      .then(response => {
        setSchedule(response.data.data);
      })
      .catch(error => {
        console.error('error occured in SchedulePage.js - getMySchedule() ', error);

        swal({
          title: '일정을 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  const getCalendar = () => {
    getCalendarTheme()
      .then(response => {
        let temp = response.data.data;
        if (temp[0].id === 0) {
          setCalendars(temp);
        } else {
          for (const data of temp) {
            data.id = String(data.id);
          }
          
          setCalendars(temp);
        }
      })
      .catch(error => {
        console.error('error occured in SchedulePage.js - getMySchedule() ', error);

        swal({
          title: '일정 구분을 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  return (
    <Container>
      <CalendarComponent
        Calendars={Calendars}
        setCalendars={setCalendars}
        getCalendar={getCalendar}
      />
      <ScheduleComponent
        Schedule={Schedule}
        Calendars={Calendars}
        getSchedule={getSchedule}
      />
    </Container>
  );
}

export default SchedulePage;
