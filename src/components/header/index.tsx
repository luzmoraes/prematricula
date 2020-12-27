import React, { useState } from 'react'
import { getUser } from '../../services/user'
import { userProps } from '../../interfaces/user'
import logoImage from '../../images/logo-censf-white.png'

interface TitleProps {
  title?: string
}

const Header = ({ title }: TitleProps) => {

  const [ user ] = useState<userProps>(getUser())
  
  return (
    <div className="header">
      <img src={logoImage} alt="CENSF" />
      <div className="info">
        {title && <h3>{title}</h3>}
        {user && <p>{user.name}</p>}
      </div>
    </div>
  )
}

export default Header