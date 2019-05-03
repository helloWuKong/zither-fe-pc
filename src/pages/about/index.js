import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import Navbar from '../../components/Navbar/Navbar'
import './index.less'

const About = () => {
  useEffect(() => {}, [])
  return (
    <div>
      <div className="container">
        <Helmet title="我们" />
        <Navbar />
        <section className="me" />
      </div>
      <section className="get" />
    </div>
  )
}

export default About
