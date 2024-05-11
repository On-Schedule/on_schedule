import React, { useContext } from "react";
import { DateTime } from "luxon";
import DateBox from "./DateBox";
import { CalendarContext } from "./DateRangePicker";

export default function Calendar({date}) {
  const {controlDates} = useContext(CalendarContext)

  const buildRow = (date, controlMonth) => {
    var row = []
    for (var i = 1; i <= 7; i++) {
      row.push(<DateBox date={date} controlDates={{...controlDates, month: controlMonth}} key={`${date.toFormat("ddMMyyyy")}-2`} />)
      date = date.plus({day: 1})
    }

    return row
  }

  const buildMonth = () => {
    var startWeek = date.startOf("month").startOf('week', {useLocaleWeeks: true})
    var endWeek = date.endOf("month").startOf('week', {useLocaleWeeks: true})

    var builtMonth = []
    for (var i = startWeek; i <= endWeek; i = i.plus({week: 1})) {
      builtMonth.push(<div className="calendar-row" key={i.toFormat("ddMMyyyy")}>{buildRow(i, date.month)}</div>)
    }

    return builtMonth
  }

  return <div className="calendar-month-box">
    <h5>
      {date.toFormat("LLLL yyyy")}
    </h5>
    <div>
      {buildMonth()}
    </div>
  </div>
}