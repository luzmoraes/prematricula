import React, { useEffect } from 'react'
import { useApp } from '../context/App'

const List = () => {
  
  const { setTitle } = useApp()

  useEffect(() => {
    setTitle('LISTA DE MATRICULADOS')
  })
  
  return (
    <div className="content list-content">
      <h1>List</h1>
    </div>
  )
}

export default List