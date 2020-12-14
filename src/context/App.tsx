import React, { ContextType, createContext, useContext, useState } from 'react'

type ContextProps = {
  title: string
  setTitle: (title: string) => void
}

const AppContext = createContext<ContextProps | null>(null)

const AppProvider: React.FC = ({ children }) => {
  const [title, setTitle] = useState('')

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle
      }}
    >
      { children }
    </AppContext.Provider>
  )
}

export default AppProvider


export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within a AppProvider')
  const { title, setTitle } = context
  return { title, setTitle }
}