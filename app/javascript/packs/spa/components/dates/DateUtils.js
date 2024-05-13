import { createContext } from "react";

export const StartDateContext = createContext({
  startDate: "",
  setStartDate: ()=>{}
})

export const EndDateContext = createContext({
  endDate: "",
  setEndDate: ()=>{},
  closeAccordion: ()=>{}
})

export const CalendarContext = createContext({
  controlDates: {},
  startDate: "",
  endDate: "",
  handleClick: ()=>{},
  isHovering: ()=>{}
})
