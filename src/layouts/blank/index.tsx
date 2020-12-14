import React from 'react'
import Footer from '../../components/footer'

const BlankLayout = (props: any) => {
  return (
    <div className="wrapper">
      {props.children}
      <Footer />
    </div>
  )
}

export default BlankLayout