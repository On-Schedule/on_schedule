import React, { useState, useRef, useCallback } from "react";
import DateRangePicker from "./DateRangePicker";
import CustomDateField from "./CustomDateField";
import { func, string, bool, shape } from 'prop-types';
import { StartDateContext, EndDateContext } from "./DateUtils";
import { DateTime } from "luxon";

DateRangeField.propTypes = {
  startDateValue: string.isRequired,
  endDateValue: string.isRequired,
  onDatesChange: func.isRequired,
  dateRangeMin: string,
  dateRangeMax: string,
  labels: bool,
  label1: string,
  label2: string,
  dateFieldClass: string,
  dateFieldStyle: shape({}),
  disabled: bool
};

export default function DateRangeField(props) {
  const {
    startDateValue,
    endDateValue,
    onDatesChange,
    dateRangeMin,
    dateRangeMax,
    labels = true,
    label1 = "Dates",
    label2 = "",
    dateFieldClass = "",
    dateFieldStyle = {},
    disabled = false
  } = props

  const dateRangeRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [accordion, setAccordion] = useState(false)
  const [focus, setFocus] = useState("")


  const closeAccordion = () => {
    setAccordion(false)
    setFocus("")
    document.removeEventListener("mousedown", handleClickOutside);
  }
  const openAccordion = () => {
    setAccordion(true)
    document.addEventListener("mousedown", handleClickOutside);
  }

  const handleClickOutside = useCallback((e) => {
    if (dateRangeRef.current && (
      !dateRangeRef.current.contains(e.target) &&
      !startRef.current.contains(e.target) &&
      !endRef.current.contains(e.target))) {
      closeAccordion()
    }
  }, [])

  const setDates = (dates) => {
    if (_.isEqual(Object.keys(dates), ["startDate", "endDate"])) {
      onDatesChange(dates)
    } else if (dates.startDate) {
      onDatesChange({...dates, endDate: endDateValue})
    } else if (dates.endDate) {
      onDatesChange({...dates, startDate: startDateValue})
    }
  }

  const dateConverter = (date) => {
    if (date && DateTime.fromISO(date).isValid) {
      return DateTime.fromISO(date)
    } else {
      return ""
    }
  }

  return <div>
    <StartDateContext.Provider value={{
      startDate: dateConverter(startDateValue),
      dateRangeMin: dateConverter(dateRangeMin),
      setStartDate: setDates
    }}>
      <EndDateContext.Provider value={{
        endDate: dateConverter(endDateValue),
        dateRangeMax: dateConverter(dateRangeMax),
        setEndDate: setDates,
        closeAccordion: closeAccordion
      }}>
        <div style={{display: "flex"}}>
          <div className="list-inline-item" style={{width: "50%"}} >
            {labels && <label>{label1}</label>}
            <div ref={startRef} id="startDate" onClick={() => {
              openAccordion()
              setFocus("startDate")
            }}>
            <CustomDateField dateType={"startDate"} dateFieldClass={dateFieldClass} dateFieldStyle={dateFieldStyle} disabled={disabled} />
            </div>
            {focus === "startDate" && <div className="date-selector-focus" />}
          </div>
          <div className="list-inline-item" style={{width: "50%"}} >
            {labels && <label>{label2}</label>}
            <div ref={endRef} id="endDate" onClick={() => {
              openAccordion()
              setFocus("endDate")
            }}>
            <CustomDateField dateType={"endDate"} dateFieldClass={dateFieldClass} dateFieldStyle={dateFieldStyle} disabled={disabled} />
          </div>
            {focus === "endDate" && <div className="date-selector-focus" />}
          </div>
        </div>
        {!disabled && <div ref={dateRangeRef} className={"base-slide-out " + (accordion ? "date-picker-open" : "date-picker-closed")}>
          <DateRangePicker focus={focus} setFocus={setFocus} initialDate={dateConverter(startDateValue) || dateConverter(dateRangeMin) || DateTime.now()}/>
        </div>}
      </EndDateContext.Provider>
    </StartDateContext.Provider>
  </div>
}
