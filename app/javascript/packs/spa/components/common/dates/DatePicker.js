import React, { useState, useCallback, useContext } from "react";
import { DateTime } from "luxon"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Calendar from "./Calendar";
import { CalendarContext, DateContext } from "./DateUtils";
import { object } from "prop-types"

DatePicker.propTypes = {
  initialDate: object,
}

export default function DatePicker(props) {
  const {initialDate=DateTime.now()} = props
  const [month, setMonth] = useState(initialDate.startOf("month"))
  const [controlDates, setControlDates] = useState({})
  const {date, dateRangeMin, dateRangeMax, setDate, closeAccordion} = useContext(DateContext)

  const handleClick = (date) => {
    if ((dateRangeMin && date < dateRangeMin) || (dateRangeMax && date > dateRangeMax)) {
      return
    } else {
      setDate({date: date.toISODate()})
      closeAccordion()
    }
  }

  const isHovering = (date) => {
    setControlDates({...controlDates, hovering: date})
  }

  const scrollMonths = (e) => {
    if (Math.sign(e.deltaY) === -1) {
      setMonth(month.minus({month: 1}))
    } else if (Math.sign(e.deltaY) === 1) {
      setMonth(month.plus({month: 1}))
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
          onClick={() => setMonth(month.minus({month: 1}))}
          style={{padding: "10px"}}
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          onClick={() => setMonth(month.plus({month: 1}))}
          style={{padding: "10px"}}
        />
      </div>
      <div className="card-body">
        <div style={{display: "flex"}}>
          <CalendarContext.Provider value={{
            controlDates: controlDates,
            startDate: date,
            endDate: date,
            handleClick: handleClick,
            isHovering: isHovering
          }}>
            <Calendar date={month} />
          </CalendarContext.Provider>
        </div>
      </div>
    </div>
  </div>
}
