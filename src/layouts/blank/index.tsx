import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { useApp } from '../../context/App'

const BlankLayout = (props: any) => {

  const showHeader = props.children.props.showHeader

  const { title } = useApp()
  return (
    <div className="wrapper">
      {showHeader && <Header title={title} />}
      {props.children}
      <Footer />
    </div>
  )
}

export default BlankLayout