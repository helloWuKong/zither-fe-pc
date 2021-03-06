import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'next/link'
import option from './options'
import { get } from '../../utils/http'
import './index.less'

const Index = (props) => {
  const { poc } = props

  const [province, setProvince] = useState('') // 选中省份
  const [cities, setCitys] = useState({}) // 选中省份下城市数据

  const _getCitys = (value) => {
    let temp = {}
    poc.some((item) => {
      if (+item.code === value) {
        temp = item
        return true
      }
      return false
    })
    return temp
  }

  const createChainMap = (element) => {
    const chainMap = echarts.init(element)
    chainMap.on('click', (item) => {
      // 获取地图选中区域
      const data = item.data
      setProvince(data.name)
      setCitys(_getCitys(data.value))
    })
    chainMap.setOption(option, true)
  }

  useEffect(() => {
    const element = document.querySelector('#container')
    createChainMap(element)
  }, [])


  const _handleCityClick = code => () => {
    code && Router.push(`/abroad?cityid=${code}`)
  }

  const callMe = () => {
    alert('组委会电话(微信同）:13810839653')
  }


  return (
    <div className="index_container">
      <Helmet title="首页" />
      <header className="header">
        <Link href="/">
          <div className="index_page" />
        </Link>
        <Link href="/abroad">
          <div className="area_page" />
        </Link>
        <Link href="/post?type=study">
          <div className="study_page" />
        </Link>
        <Link href="/post?type=songs">
          <div className="songs_page" />
        </Link>
        <Link href="/post?type=rythme">
          <div className="rythme_page" />
        </Link>
        <Link href="/post?type=example">
          <div className="example_page" />
        </Link>
        <Link href="/post?type=news">
          <div className="news_page" />
        </Link>
        <Link href="/about">
          <div className="about_page" />
        </Link>
      </header>
      <div className="swiper">
        <img src="/static/img/banner1.jpg" alt="" />
      </div>
      <section className="area">
        <div className="choose_city">
          {
            cities.children ? (
              <div className="citys">
                {
                  cities.children.map(item => (
                    <span onClick={_handleCityClick(item.code)}>{ item.name }</span>
                  ))
                }
              </div>
            ) : null
          }
          {
            province && <div className="province">{ province }</div>
          }
        </div>
        <Link href="/post?type=7">
          <div className="choose" />
        </Link>
        <div className="mapContianer">
          <div className="map" id="container" />
          <div className="bigWord" />
          {/* <div className="cloud"></div> */}
        </div>
      </section>
      {/* <section className="zither">
        <Link href="/post?type=7">
          <div className="choose_area">请选择</div>
        </Link>
        <Link href="apply">
          <div className="apply">立即申请</div>
        </Link>
      </section> */}
      <section className="intro" />
      <footer className="footer">
        {/* <section className="qrcode">
          <div className="qrcodeIcon" />
        </section> */}
        <section className="callMe">
          <Link href="apply">
            <div>申请管理员</div>
          </Link>
          <div onClick={callMe}>联系我们</div>
        </section>
        <section className="copyright">
          © 2019 中国古筝日——古筝人自己的节日 版权所有
        </section>
      </footer>
    </div>
  )
}

Index.getInitialProps = async () => {
  const data = await get('/api/fe/poc')
  return { poc: data.list || [] }
}

Index.propTypes = {
  poc: PropTypes.array.isRequired,
}

export default Index
