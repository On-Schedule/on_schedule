import React, { useState, useRef, useCallback } from "react";
import DatePicker from "./DatePicker";
import CustomDateField from "./CustomDateField";
import { func, string, bool, shape } from 'prop-types';
import { DateContext } from "./DateUtils";
import { DateTime } from "luxon";

DateField.propTypes = {
  dateValue: string.isRequired,
  onDateChange: func.isRequired,
  dateRangeMin: string,
  dateRangeMax: string,
  labels: bool,
  label1: string,
  dateFieldClass: string,
  dateFieldStyle: shape({}),
  disabled: bool,
};

export default function DateField(props) {
  const {
    dateValue,
    onDateChange,
    dateRangeMin,
    dateRangeMax,
    labels = true,
    label1 = "Date",
    dateFieldClass = "",
    dateFieldStyle = {},
    disabled = false
  } = props

  const dateRangeRef = useRef(null);
  const dateRef = useRef(null);
  const [accordion, setAccordion] = useState(false)

  const closeAccordion = () => {
    setAccordion(false)
    document.removeEventListener("mousedown", handleClickOutside);
  }
  const openAccordion = () => {
    setAccordion(true)
    document.addEventListener("mousedown", handleClickOutside);
  }

  const handleClickOutside = useCallback((e) => {
    if (dateRangeRef.current && (
      !dateRangeRef.current.contains(e.target) &&
      !dateRef.current.contains(e.target))) {
      closeAccordion()
    }
  }, [])

  const setDate = (date) => {
      onDateChange(date.date)
  }

  const dateConverter = (date) => {
    if (date && DateTime.fromISO(date).isValid) {
      return DateTime.fromISO(date)
    } else {
      return ""
    }
  }

  return <div>
    <DateContext.Provider value={{
      date: dateConverter(dateValue),
      dateRangeMin: dateConverter(dateRangeMin),
      dateRangeMax: dateConverter(dateRangeMax),
      setDate: setDate,
      closeAccordion: closeAccordion
    }}>
      <div className="display-flex">
        <div className="list-inline-item" style={{width: "100%"}} >
          {labels && <label>{label1}</label>}
          <div ref={dateRef} id="date" onClick={() => {
            openAccordion()
          }}>
          <CustomDateField dateType={"date"} dateFieldClass={dateFieldClass} dateFieldStyle={dateFieldStyle} disabled={disabled}/>
          </div>
        </div>
      </div>
      {!disabled && <div ref={dateRangeRef} className={"base-slide-out " + (accordion ? "date-picker-open" : "date-picker-closed")} style={{left: "1em"}} >
        <DatePicker initialDate={dateConverter(dateValue) || dateConverter(dateRangeMin) || DateTime.now()}/>
      </div>}
    </DateContext.Provider>
  </div>
}
