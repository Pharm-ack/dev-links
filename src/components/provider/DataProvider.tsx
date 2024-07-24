'use client'
import { createContext } from "react"
import { link } from "../link/LinkMain"


export const DataContext = createContext<link[] | null>(null)

function DataProvider({children, value}: {children: React.ReactNode, value: link[] | null}) {
  return (
   <DataContext.Provider value={value}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider