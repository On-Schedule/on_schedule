import React, { createRef, useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { StartDateContext, EndDateContext } from "./DateUtils";
import { func, object, string, oneOfType, shape } from "prop-types"

CustomDateField.propTypes = {
  sendDate: func,
  receivedDate: oneOfType([object, string]),
  dateType: string,
  dateFieldClass: string,
  dateFieldStyle: shape({}),
}

export default function CustomDateField(props) {
  const {sendDate=()=>{}, receivedDate="", dateType="", dateFieldClass="", dateFieldStyle={}} = props
  const [date, setDate] = useState({month: "", day: "", year: ""})
  const day = createRef()
  const month = createRef()
  const year = createRef()

  const selectDateContext = () => {
    if(dateType === "startDate"){
      const {startDate: dateContext, setStartDate: setDateContext} = useContext(StartDateContext)
      return {dateContext, setDateContext}
    } else if (dateType === "endDate"){
      const {endDate: dateContext, setEndDate: setDateContext} = useContext(EndDateContext)
      return {dateContext, setDateContext}
    } else {
      return {dateContext: receivedDate, setDateContext: sendDate}
    }
  }

  const {dateContext, setDateContext} = selectDateContext()

  const isValid = () => {
    if (!date.day || !date.month || !date.year) {
      return false
    }

    return DateTime.fromObject(date).isValid
  }

  const matchingDates = (date1, date2) => {
    return (date1.day === date2.day) &&
      (date1.month === date2.month) &&
      (date1.year === date2.year)
  }

  useEffect(() => {
    if (isValid()) {
      setDateContext({[dateType]: `${_.padStart(date.year, 4, 0)}-${_.padStart(date.month, 2, 0)}-${_.padStart(date.day, 2, 0)}`})
    }
  }, [date])

  useEffect(() => {
    if (!dateContext) {
      setDate({month: "", day: "", year: ""})
    } else if (dateContext && !matchingDates(date, dateContext.toObject())) {
      setDate(dateContext.toObject())
    }
  }, [dateContext])

  const handleFocus = (e) => {
    e.target.select()
  }

  const setDateValue = (max, field, ref) => (e) => {
    if (e.target.value.length <= max) {
      setDate((date) => ({...date, [field]: _.get(e, 'target.value', e)}))
    }
    if (e.target.value.length == max) {
      ref?.current.focus()
    }
  }

  return <div className={`form-control form-control-sm custom-date-field ${dateFieldClass}`} style={dateFieldStyle}>
    <input
      ref={month}
      className="custom-date-form-element month"
      type="number"
      placeholder="mm"
      onChange={setDateValue(2, "month", day)}
      value={date.month}
      onFocus={handleFocus}
    />/
    <input
      ref={day}
      className="custom-date-form-element day"
      type="number"
      placeholder="dd"
      onChange={setDateValue(2, "day", year)}
      value={date.day}
      onFocus={handleFocus}
    />/
    <input
      ref={year}
      className="custom-date-form-element year"
      type="number"
      placeholder="yyyy"
      onChange={setDateValue(4, "year", null)}
      value={date.year}
      onFocus={handleFocus}
    />
  </div>
}
