import React, { useEffect } from 'react'
import Link from 'next/link'
import './index.less'

const Navbar = () => {
  useEffect(() => {}, [])
  return (
    <header className="header_nav">
      <div className="nav_section">
        <div className="nav_logo" />
        <div className="nav_list">
          <Link href="/">
            <div className="page page_index">首页</div>
          </Link>
          <Link href="/area">
            <div className="page page_area">分会场</div>
          </Link>
          <Link href="/post?type=news">
            <div className="page page_news">咨询</div>
          </Link>
          <Link href="/post?type=study">
            <div className="page page_study">学习</div>
          </Link>
          <Link href="/post?type=songs">
            <div className="page page_songs">曲谱</div>
          </Link>
          <Link href="/post?type=rythme">
            <div className="page page_rythme">伴奏</div>
          </Link>
          <Link href="/post?type=example">
            <div className="page page_example">示范</div>
          </Link>
          <Link href="/about">
            <div className="page page_about">我们</div>
          </Link>
          <div className="page page_search" />
          <div className="page page_sign" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
