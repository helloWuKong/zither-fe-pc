import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import Link from 'next/link'
import './index.less'

const Index = () => {
  useEffect(() => {}, [])
  return (
    <div className="index_container">
      <Helmet title="首页" />
      <header className="header">
        <Link href="/">
          <div className="index_page" />
        </Link>
        <Link href="/area">
          <div className="area_page" />
        </Link>
        <Link href="/study">
          <div className="study_page" />
        </Link>
        <Link href="/songs">
          <div className="songs_page" />
        </Link>
        <Link href="/rythme">
          <div className="rythme_page" />
        </Link>
        <Link href="/example">
          <div className="example_page" />
        </Link>
        <Link href="/news">
          <div className="news_page" />
        </Link>
        <Link href="/about">
          <div className="about_page" />
        </Link>
      </header>
      <div className="swiper">
        轮播图区域
      </div>
      <section className="area">
        <div className="choose_city">222</div>
        <div className="map">11</div>
      </section>
      <section className="zither">
        <Link href="area">
          <div className="choose_area">请选择</div>
        </Link>
        <Link href="apply">
          <div className="apply">立即申请</div>
        </Link>
      </section>
      <section className="intro" />
      <footer className="footer">
        <section className="qrcode" />
        <section className="copyright">
          © 2019 中国古筝日——古筝人自己的节日 版权所有
        </section>
      </footer>
    </div>
  )
}

export default Index
