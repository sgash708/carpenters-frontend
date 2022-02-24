import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import timeGrid from '@fullcalendar/timegrid';
import dayGrid from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import { createStyles, makeStyles } from '@mui/styles';

registerLocale('ja', ja)

// 追加イベントの型
interface inputEventsType {
  id: number
  title: string
  start: Date
  end: Date
}

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      opacity: 0,
      visibility: 'hidden',
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: 1000,
      top: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.3)'
    },
    form: {
      opacity: 0,
      visibility: 'hidden',
      position: 'fixed',
      top: '30%',
      left: '40%',
      fontWeight: 'bold',
      background: 'rgba(255, 255, 255)',
      width: '400px',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    inView: {
      opacity: 1,
      visibility: 'visible'
    },
  })
)
const myEvents: any = [
  {
    id: 0,
    title: "event 1",
    start: "2022-02-22 10:00:00",
    end: "2020-02-23 11:00:00",
  },
];

const Calendar: React.FC = () => {
  const classes = useStyles()
  // Calendarオブジェクトの関数を使用
  const ref = React.createRef<any>()

  const [inputTitle, setInputTitle] = useState('')
  const [inputStart, setInputStart] = useState(new Date)
  const [inputEnd, setInputEnd] = useState(new Date)
  // イベント登録フォームの表示有無
  const [inView, setInView] = useState(false)
  // 登録イベントの格納
  const [inputEvents, setInputEvents] = useState<inputEventsType[]>([])

  /**
   * カレンダークリック時にイベント登録フォームを表示
   * @param info 入力したイベントを格納する
   */
  const handleClick = (info: any) => {
    console.log(info)
    const event = inputEvents[info.event.id]
    const title = event.title
    const start = event.start
    const end = event.end

    setInputTitle(title)
    setInputStart(start)
    setInputEnd(end)
    setInView(true)
  }

  /**
   * カレンダーから予定をクリックした際に、イベント変更フォームを表示
   * @param selectinfo フォームの現在の状態
   */
  const handleSelect = (selectinfo: any) => {
    const start = new Date(selectinfo.start)
    const end = new Date(selectinfo.end)
    start.setHours(start.getHours())
    start.setHours(end.getHours())

    setInputTitle('')
    setInputStart(start)
    setInputEnd(end)
    setInView(true)
  }

  const onAddEvent = () => {
    const startTime = inputStart
    const endTime = inputEnd

    if (startTime >= endTime) {
      alert('開始時間と終了時間を確認してください。')
      return
    }
    const event: inputEventsType = {
      id: inputEvents.length,
      title: inputTitle,
      start: startTime,
      end: endTime
    }

    setInputEvents([...inputEvents, event])

    ref.current.getApi().onAddEvent(event)
  }

  const coverElement = (
    <div
      onClick={() => setInView(false)}
      className={inView ? `${classes.cover} ${classes.inView}` : classes.cover}
    />
  )

  const titleElement = (
    <div>
      <label>タイトル</label>
      <input
        type="text"
        value={inputTitle}
        name="inputTitle"
        onChange={e => {
          // タイトル入力時、その値をStateに登録
          setInputTitle(e.target.value)
        }}
      />
    </div>
  )

  const startTimeElement = (
    <div>
      <label>開始</label>
      <DatePicker
        locale="ja"
        dateFormat="yyyy/MM/d HH:mm"
        selected={inputStart}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        todayButton="today"
        name="inputStart"
        onChange={(time: Date) => {
          setInputStart(time)
        }}
      />
    </div>
  )

  const endTimeElement = (
    <div>
      <label>終了</label>
      <DatePicker
        locale="ja"
        dateFormat="yyyy/MM/d HH:mm"
        selected={inputEnd}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        todayButton="today"
        name="inputEnd"
        onChange={(time: Date) => {
          setInputEnd(time)
        }}
      />
    </div>
  )

  const btnElement = (
    <div>
      <input
        type="button"
        value="キャンセル"
        onClick={() => setInView(false)}
      />
      <input
        type="button"
        value="保存"
        onClick={() => onAddEvent()}
      />
    </div>
  )

  const formElement = (
    <div
      className={inView ? `${classes.form} ${classes.inView}` : classes.form}
    >
      <form>
        <div>予定を入力</div>
        {titleElement}
        {startTimeElement}
        {endTimeElement}
        {btnElement}
      </form>
    </div>
  )

  return (
    <div>
      {coverElement}
      {formElement}
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
        events={myEvents}
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
        ref={ref}
        eventClick={handleClick}
        select={handleSelect}
      />
    </div>
  )
}

export default Calendar