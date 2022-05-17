import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'

import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { iuOpenModal } from '../../actions/ui'
import { eventSetActive, eventStartLoading, eventUnsetActive } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

const localizer = momentLocalizer(moment);
moment.locale('es');

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar);
  // const { uid } = useSelector( state => state.auth );

  useEffect( () => {
    dispatch(eventStartLoading())
  }, [dispatch])

  const onDoubleClick = (event) => {
    dispatch(iuOpenModal());
  }

  const onSelecetEvent = (event) => {
    dispatch(eventSetActive(event));
  }

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem('lastView', event);
  }

  //Todo: double click on empty slot to set an event
  const onSelectSlot = ({ action, start }) => {
    // if (action === 'doubleClick') {
    //   if (moment(start, 'MM-DD-YYYY').isSameOrBefore(moment(new Date(), 'MM-DD-YYYY' ))) {
    //     Swal.fire('Oops','No puedes iniciar un evento en una fecha pasada :(', 'error');
    //     return;
    //   }
    //   dispatch(iuOpenModal())
    // };
    dispatch(eventUnsetActive());
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#1a70e8',
      borderRadius: '10px',
      opacity: 1,
      display: 'block',
      padding: '10px',
      color: 'white'
    }

    return {
      style
    }

  }

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelecetEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
            event: CalendarEvent
          }}
      />
      <CalendarModal />

      <AddNewFab />
      { activeEvent && <DeleteEventFab /> }

    </div>
  )
}
