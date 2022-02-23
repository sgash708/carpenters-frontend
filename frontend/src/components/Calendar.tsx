import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import timeGrid from '@fullcalendar/timegrid';
import dayGrid from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';

registerLocale('ja', ja)

interface myEventsType {
  id: number
  title: string
  start: Date
  end: Date
}

const Calendar: React.FC = () => {
  return (
    <div>
      <FullCalendar
        locale="ja"
        firstDay={1}
        plugins={[timeGrid, dayGrid, interaction]}
        initialView="dayGridMonth"
        slotDuration="00:30:00"
        selectable={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '00:00',
          endtime: '24:00'
        }}
        weekends={true}
        titleFormat={{
          year: 'numeric',
          month: 'short'
        }}
        headerToolbar={{
          start: 'title',
          center: 'prev, next, today',
          end: 'dayGridMonth,timeGridWeek'
        }}
      />
    </div>
  )
}

export default Calendar