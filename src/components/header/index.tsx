import React from 'react'

import logoImage from '../../images/logo-censf-white.png'

interface TitleProps {
  title?: string
}
const Header = ({ title }: TitleProps) => {
  return (
    <div className="header">
      <img src={logoImage} alt="CENSF" />
      {title && <h3>{title}</h3>}
    </div>
  )
}

export default Header