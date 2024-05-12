import React, { useState, useRef, useEffect, createContext } from "react";
import DateRangePicker from "./DateRangePicker";
import CustomDateField from "./CustomDateField";
import PropTypes from 'prop-types';

export const StartDateContext = createContext({startDate: "", setStartDate: ()=>{}})
export const EndDateContext = createContext({endDate: "", setEndDate: ()=>{}, closeAccordion: ()=>{}})

const { func, object, bool } = PropTypes;

DateRangeField.propTypes = {
  updateStartDate: func.isRequired,
  updateEndDate: func.isRequired,
  startDateLimit: object,
  endDateLimit: object,
  reset: bool,
  setReset: func,
};

DateRangeField.defaultProps = {
  setReset: () => {},
  reset: false,
};


export default function DateRangeField(props) {
  const {
    updateStartDate,
    updateEndDate,
    startDateLimit,
    endDateLimit,
    reset,
    setReset
  } = props

  const wrapperRef = useRef(null);
  const [accordion, setAccordion] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [focus, setFocus] = useState("")

  useEffect(() => {
    if (reset) {
      setStartDate("")
      setEndDate("")
      setReset(false)
    }
  }, [reset])

  useEffect(() => {
    updateStartDate(startDate ? startDate.toISODate() : startDate)
  }, [startDate])

  useEffect(() => {
    updateEndDate(endDate ? endDate.toISODate() : endDate)
  }, [endDate])

  const closeAccordion = () => {
    setAccordion(false)
    setFocus("")
    document.removeEventListener("mousedown", handleClickOutside);
  }
  const openAccordion = () => {
    setAccordion(true)
    document.addEventListener("mousedown", handleClickOutside);
  }

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      closeAccordion()
    }
  }

  return <div>
    <StartDateContext.Provider value={{startDate: startDate, startDateLimit: startDateLimit, setStartDate: setStartDate}}>
      <EndDateContext.Provider value={{endDate: endDate, endDateLimit: endDateLimit, setEndDate: setEndDate, closeAccordion: closeAccordion}}>
        <div>
          <div className="form_group list-inline-item" onClick={() => {
            openAccordion()
            setFocus("startDate")
          }} >
            <label>Dates</label>
            <CustomDateField dateType={"startDate"} />
            {focus === "startDate" && <div className="date-selector-focus" />}
          </div>
          <div className="form_group list-inline-item" onClick={() => {
            openAccordion()
            setFocus("endDate")
          }} >
            <CustomDateField dateType={"endDate"} />
            {focus === "endDate" && <div className="date-selector-focus" />}
          </div>
        </div>
        <div ref={wrapperRef} className={"base-slide-out " + (accordion ? "date-picker-open" : "date-picker-closed")}>
          <DateRangePicker focus={focus} setFocus={setFocus} />
        </div>
      </EndDateContext.Provider>
    </StartDateContext.Provider>
  </div>
}
