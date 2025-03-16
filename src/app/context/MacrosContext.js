"use client"

import { createContext, useState, useContext } from "react"

const MacrosContext = createContext();

export function MacrosProvider({ children }) {
  const [macro, setMacro] = useState({
    carbohydrates: 0,
    fats: 0,
    proteins: 0,
    proteins_percentage: 0,
    carbohydrates_percentage: 0,
    fats_percentage: 0,
    totalCalories: 0,
  })

  return (
    <MacrosContext.Provider value={{macro, setMacro}}>
      { children }
    </MacrosContext.Provider>
  )
}

export function useMacro() {
  return useContext(MacrosContext)
}