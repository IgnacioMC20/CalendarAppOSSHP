import React from 'react'
import moment from 'moment';

export const CalendarEvent = ({ event }) => {
  const { title, start, end } = event;
  return (
    <div>
        <strong>#{ title }</strong>
        <br />
        <span>{ moment(start).format('h:mm a') } - {moment(end).format('h:mm a')}</span>
    </div>
  )
}
