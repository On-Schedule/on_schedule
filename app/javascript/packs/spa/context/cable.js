import React from "react";
import ActionCable from "actioncable";

const CableContext = React.createContext();

function CableProvider({ children }) {
  const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://on-schedule-d880dc83bd42.herokuapp.com/cable' : 'ws://localhost:3000/cable'

  const CableApp = {}
  CableApp.cable = ActionCable.createConsumer(actionCableUrl)

  return <CableContext.Provider value={CableApp}>{children}</CableContext.Provider>;
}

const handleReceived = (data) => {
    switch (data.type) {
    case "task":
      dispatch({type: "task/received", task: data.content})
      break
    case "project":
      dispatch({type: "project/received", project: data.content})
      break
    default:
      break
  }
}

export { CableContext, CableProvider, handleReceived };
