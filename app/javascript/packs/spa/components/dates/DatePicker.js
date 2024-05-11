import React, { useState, useCallback, useContext, createContext } from "react";
import { DateTime } from "luxon"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { StartDateContext, EndDateContext } from "./DateRangeField"
import Calendar from "./Calendar";

export const CalendarContext = createContext("")

export default function DatePicker({InitialDate=DateTime.now(), focus=true, setFocus=()=>{}}) {
  const [date, setDate] = useState(InitialDate.startOf("month"))
  const [controlDates, setControlDates] = useState({})
  const {startDate, setStartDate} = useContext(StartDateContext)
  const {endDate, setEndDate, closeAccordion} = useContext(EndDateContext)

  const handleClick = (date) => {
    if (startDate && date < startDate && focus === "endDate") {
      setStartDate(date)
      setEndDate("")
      setFocus("endDate")
    } else if (endDate && date > endDate && focus === "startDate") {
      setStartDate(date)
      setEndDate("")
      setFocus("endDate")
    } else if (focus === "startDate") {
      setStartDate(date)
      setFocus("endDate")
    } else {
      setEndDate(date)
      setFocus("startDate")

      if (startDate && date) {
        closeAccordion()
      }
    }
  }

  const isHovering = (date) => {
    setControlDates({...controlDates, hovering: date})
  }

  const scrollMonths = (e) => {
    if (Math.sign(e.deltaY) === -1) {
      setDate(date.minus({month: 1}))
    } else if (Math.sign(e.deltaY) === 1) {
      setDate(date.plus({month: 1}))
    }
  }

  const preventDefault = useCallback((e) => {
    e.preventDefault()
  }, [])

  const disableScroll = () => {
    document.addEventListener('wheel', preventDefault, {
      passive: false,
    });
  }

  const enableScroll = () => {
    document.removeEventListener('wheel', preventDefault);
  }

 return <div className='card date-picker-container'>
    <div
      onWheel={scrollMonths}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
    >
      <div className="card-header" style={{display: "flex"}}>
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
        <h4
         className="date-picker-dates"
         style={{borderBottomStyle: focus === "startDate" && "solid"}}
         onClick={()=>{setFocus("startDate")}}
        >Start date</h4>
        <h4
         className="date-picker-dates"
         style={{borderBottomStyle: focus === "endDate" && "solid"}}
         onClick={()=>{setFocus("endDate")}}
        >End date</h4>
      </div>
      <div className="card-body">
        <div style={{display: "flex"}}>
          <CalendarContext.Provider value={{
            controlDates: controlDates,
            startDate: startDate,
            endDate: endDate,
            handleClick: handleClick,
            isHovering: isHovering
          }}>
            <Calendar date={date} />
            <Calendar date={date.plus({month: 1})} />
          </CalendarContext.Provider>
        </div>
      </div>
    </div>
  </div>
}
