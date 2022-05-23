import React from 'react'
import moment from 'moment';

export const CalendarEvent = ({ event }) => {
  const { title, start, end, notes } = event;
  return (
    <div data-toggle="tooltip" data-placement="top" title={`${title} - ${notes}`}>
      {
        localStorage.getItem('lastView') === 'month'
        ? <span><strong className='mx-1'>#{title}</strong><span>{moment(start).format('H:mm')}-{moment(end).format('H:mm')}</span></span>
        : <span><strong className='mx-1'>#{title}</strong><span>{notes}</span></span>
      }
    </div>
  )

}
