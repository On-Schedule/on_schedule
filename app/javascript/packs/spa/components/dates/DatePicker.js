import React, { useState } from "react";
import { DateTime } from "luxon"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import DateBox from "./DateBox";

export default function DatePicker({InitialDate=DateTime.now().startOf("day"), setStartDate=()=>{}, setEndDate=()=>{}}) {
  const [date, setDate] = useState(InitialDate)
  const [controlDates, setControlDates] = useState({})
  const [focus, setFocus] = useState(true)

  const handleClick = (date) => {
    if (focus) {
      setControlDates({...controlDates, startDate: date})
      setStartDate(date)
    } else {
      setControlDates({...controlDates, endDate: date})
      setEndDate(date)
    }
    setFocus(!focus)
  }

  const isHovering = (date) => {
    setControlDates({...controlDates, hovering: date})
  }

  const buildRow = (date, controlMonth) => {
    var row = []
    for (var i = 1; i <= 7; i++) {
      row.push(<DateBox date={date} controlDates={{...controlDates, month: controlMonth}} key={date.toFormat("ddmmyyyy-2")} handleClick={handleClick} isHovering={isHovering} />)
      date = date.plus({day: 1})
    }

    return row
  }

  const buildMonth = (month=date) => {
    var startWeek = month.startOf("month").startOf('week', {useLocaleWeeks: true})
    var endWeek = month.endOf("month").startOf('week', {useLocaleWeeks: true})

    var builtMonth = []
    for (var i = startWeek; i <= endWeek; i = i.plus({week: 1})) {
      builtMonth.push(<div style={{display: "flex", flexDirection: "row", width: "100%"}} key={i.toFormat("ddmmyyyy")}>{buildRow(i, month.month)}</div>)
    }

    return builtMonth
  }

 return <div className='content'>
    <div className="calendar">
      <FontAwesomeIcon
        icon={faChevronUp}
        onClick={() => setDate(date.minus({month: 1}))}
        style={{padding: "10px"}}
      />
      <FontAwesomeIcon
        icon={faChevronDown}
        onClick={() => setDate(date.plus({month: 1}))}
        style={{padding: "10px"}}
      />
      <div style={{display: "flex"}}>
        <div style={{padding: "10px"}}>
          <h4>
            {date.toFormat("LLLL, yyyy")}
          </h4>
          <div>
            {buildMonth()}
          </div>
        </div>
        <div style={{padding: "10px"}}>
          <h4>
            {date.plus({month: 1}).toFormat("LLLL, yyyy")}
          </h4>
          <div>
            {buildMonth(date.plus({month: 1}))}
          </div>
        </div>
      </div>
    </div>
  </div>
}
