import React from 'react';
import FullCalendar from '@fullcalendar/react';
import TimeGrid from '@fullcalendar/timegrid';
import DayGrid from '@fullcalendar/daygrid';
import Interaction from '@fullcalendar/interaction';

const Calendar: React.FC = () => {
  return (
    <div>
      <FullCalendar
        locale="ja"
        firstDay={1}
        plugins={[TimeGrid, DayGrid, Interaction]}
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