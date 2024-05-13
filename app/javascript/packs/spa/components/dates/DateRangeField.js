import React, { useState, useRef, useCallback } from "react";
import DateRangePicker from "./DateRangePicker";
import CustomDateField from "./CustomDateField";
import { oneOfType, func, object, string } from 'prop-types';
import { StartDateContext, EndDateContext } from "./DateUtils";

DateRangeField.propTypes = {
  startDateValue: oneOfType([object, string]).isRequired,
  endDateValue: oneOfType([object, string]).isRequired,
  onDatesChange: func.isRequired,
  dateRangeMin: object,
  dateRangeMax: object,
};

export default function DateRangeField(props) {
  const {
    startDateValue,
    endDateValue,
    onDatesChange,
    dateRangeMin,
    dateRangeMax
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
      onDatesChange({...dates, endDate: endDateValue ? endDateValue.toISODate() : ""})
    } else if (dates.endDate) {
      onDatesChange({...dates, startDate: startDateValue ? startDateValue.toISODate() : ""})
    }
  }

  return <div>
    <StartDateContext.Provider value={{
      startDate: startDateValue,
      dateRangeMin: dateRangeMin,
      setStartDate: setDates
    }}>
      <EndDateContext.Provider value={{
        endDate: endDateValue,
        dateRangeMax: dateRangeMax,
        setEndDate: setDates,
        closeAccordion: closeAccordion
      }}>
        <div>
          <div ref={startRef} className="form_group list-inline-item" onClick={() => {
            openAccordion()
            setFocus("startDate")
          }} >
            <label>Dates</label>
            <CustomDateField dateType={"startDate"} />
            {focus === "startDate" && <div className="date-selector-focus" />}
          </div>
          <div ref={endRef} className="form_group list-inline-item" onClick={() => {
            openAccordion()
            setFocus("endDate")
          }} >
            <CustomDateField dateType={"endDate"} />
            {focus === "endDate" && <div className="date-selector-focus" />}
          </div>
        </div>
        <div ref={dateRangeRef} className={"base-slide-out " + (accordion ? "date-picker-open" : "date-picker-closed")}>
          <DateRangePicker focus={focus} setFocus={setFocus} />
        </div>
      </EndDateContext.Provider>
    </StartDateContext.Provider>
  </div>
}
