import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import LoginModal from '../LoginModal'
import RegisterModal from '../RegisterModal'
import { post } from '../../utils/http'
import './index.less'

const Navbar = () => {
  useEffect(() => {}, [])

  // 登录弹窗打开与否state
  const [visibleLoginModal, setvisibleLoginModal] = useState(false)

  // 注册弹窗打开与否state
  const [visibleRegisterModal, setvisibleRegisterModal] = useState(false)

  const handleOpenModal = () => {
    if (!localStorage.getItem('userId')) {
      setvisibleLoginModal(true)
    }
  }

  const handleOpenLoginModal = () => {
    if (visibleRegisterModal) {
      setvisibleRegisterModal(false)
    }
    setvisibleLoginModal(true)
  }

  const handelCloseModal = () => {
    if (visibleLoginModal) {
      setvisibleLoginModal(false)
    }
    if (visibleRegisterModal) {
      setvisibleRegisterModal(false)
    }
  }

  const handelOpenRegisterModal = () => {
    if (visibleLoginModal) {
      setvisibleLoginModal(false)
    }
    setvisibleRegisterModal(true)
  }

  const handleSubmitLogin = async (params) => {
    const { password, username } = params
    if (username.length < 6 || !username) {
      alert('请输入最少六位长度的用户名')
      return
    }
    if (password.length < 6 || !password) {
      alert('请输入最少六位长度的密码')
      return
    }
    const res = await post('/api/fe/login/fe-m-pc', {
      name: username,
      password,
    })
    if (res) {
      const { userInfo } = res
      localStorage.setItem('userId', userInfo._id)
      Router.push('/')
    } else {
      setvisibleLoginModal(false)
    }
  }

  const handleSubmitRegister = async (params) => {
    const {
      username,
      password,
      repassword,
      phone,
    } = params
    if (username.length < 6 || !username) {
      alert('请输入最少六位长度的用户名')
      return
    }
    if (password.length < 6 || !password) {
      alert('请输入最少六位长度的密码')
      return
    }
    if (phone.length < 11) {
      alert('请输入正确的手机号')
      return
    }
    if (!repassword) {
      alert('请输入确认密码')
      return
    }
    if (password !== repassword) {
      alert('两次密码不一致')
      return
    }

    const res = await post('/api/fe/user', {
      role: 3,
      name: username,
      password,
      phone,
    })
    if (res) {
      setvisibleRegisterModal(false)
      setvisibleLoginModal(true)
    }
  }

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
          <Link href="/post?type=news">
            <div className="page page_search" />
          </Link>
          <div className="page page_sign" onClick={handleOpenModal} />
        </div>
      </div>
      <LoginModal
        visible={visibleLoginModal}
        onClose={handelCloseModal}
        onSubmitLogin={handleSubmitLogin}
        onRegister={handelOpenRegisterModal}
      />
      <RegisterModal
        visible={visibleRegisterModal}
        onClose={handelCloseModal}
        onSubmitRegister={handleSubmitRegister}
        onLogin={handleOpenLoginModal}
      />
    </header>
  )
}

export default Navbar
