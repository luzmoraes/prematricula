import React, { useEffect, useState } from 'react'
import { useApp } from '../context/App'
import { getAuthenticatedUser } from '../services/user'
import { userProps } from '../interfaces/user'

const List = () => {

  const { setTitle } = useApp()

  const [user, setUser] = useState<userProps>()

  const getUser = async () => {
    const res = await getAuthenticatedUser()
    setUser(res)
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    setTitle('LISTA DE MATRICULADOS')
  })


  return (
    <div className="content list-content">
      <h1>List</h1>
      {user && <h3>{ user.name }</h3>}
    </div>
  )
}

export default List