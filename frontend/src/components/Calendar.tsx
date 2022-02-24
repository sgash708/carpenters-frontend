import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { registerLocale } from 'react-datepicker';
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
  },
];

const Calendar: React.FC = () => {
  const classes = useStyles()
  // Calendarオブジェクトの関数を使用
  const ref = React.createRef<any>()

  const [inputTitle, setInputTitle] = useState('')
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

    setInputTitle(title)
    setInView(true)
  }

  /**
   * カレンダーから予定をクリックした際に、イベント変更フォームを表示
   * @param selectinfo フォームの現在の状態
   */
  const handleSelect = (selectinfo: any) => {
    setInputTitle('')
    setInView(true)
  }

  const onAddEvent = () => {
    const event: inputEventsType = {
      id: inputEvents.length,
      title: inputTitle
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
        // タイトル入力時、その値をStateに登録
        onChange={e => { setInputTitle(e.target.value) }}
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
          end: 'dayGridMonth'
        }}
        ref={ref}
        eventClick={handleClick}
        select={handleSelect}
      />
    </div>
  )
}

export default Calendar