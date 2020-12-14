import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'

import { useApp } from '../../context/App'

const MainLayout = (props: any) => {
  const { title } = useApp()
  return (
      <div className="wrapper">
        <Header title={ title } />
        {props.children}
        <Footer />
      </div>
  )
}

export default MainLayout