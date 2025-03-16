"use client"

import { createContext, useContext, useState } from "react"

const VitalsContext = createContext();

export function VitalsProvider({ children }) {
  const [vitals, setVitals] = useState({
    age: 0,
    weight: 0,
    height: 0,
    bmi: 0,
    bmr: 0
  })

  return (
    <VitalsContext.Provider value={{vitals, setVitals}}>
      { children }
    </VitalsContext.Provider>
  )
}

export function useVitals() {
  return useContext(VitalsContext)
}