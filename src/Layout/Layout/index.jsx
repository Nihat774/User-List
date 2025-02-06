import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SubHeader from '../../components/SubHeader'

function LayoutComponents({children}) {
  return (
    <>
      <Header />
      <SubHeader />
      {children}
      <Footer />
    </>
  )
}

export default LayoutComponents
