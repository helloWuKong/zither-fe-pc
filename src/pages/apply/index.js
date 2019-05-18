import React, { useEffect, useState } from 'react'
import Router, { withRouter } from 'next/router'
import Helmet from 'react-helmet'
import Proptypes from 'prop-types'
import { get, post } from '../../utils/http'
import Navbar from '../../components/Navbar/Navbar'
import './index.less'

const Apply = (props) => {
  const { poc } = props

  const [realName, setRealName] = useState('')
  const [phone, setPhone] = useState('')
  const [cityId, setCityId] = useState('')
  const [desc, setDesc] = useState('')
  const [pList, setPList] = useState(poc)
  const [aList, setAList] = useState([])
  const [cList, setCList] = useState([])

  const handelDescChange = (e) => {
    setDesc(e.target.value)
  }

  const handelPhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handleRealNameChange = (e) => {
    setRealName(e.target.value)
  }

  const handleSubmit = async () => {
    const id = localStorage.getItem('userId')
    if (!id) {
      alert('登陆后才能申请')
      return
    }
    if (!cityId || !realName || !phone || !desc) {
      alert('必填项不能为空')
      return
    }
    const res = await post('/api/fe/apply', {
      id,
      cityId,
      realName,
      phone,
      desc,
    })
    res && alert('申请成功')
    Router.push('/')
  }

  const findArea = (list, id) => {
    let areaList = {}
    list.some((item) => {
      if (item.code === id) {
        areaList = item
        return true
      }
      return false
    })
    return areaList
  }

  const handleProvinceChange = (e) => {
    const id = e.target.value
    setCityId(id)
    const areaList = findArea(poc, id)
    setCList([])
    areaList.children && setAList(areaList.children)
    if (areaList.children.length === 1) {
      setCList(areaList.children[0].children)
      setCityId(areaList.children[0].children[0].code)
    }
  }

  const handleAreaChange = (e) => {
    const id = e.target.value
    setCityId(id)
    const cityList = findArea(aList, id)
    cityList.children && setCList(cityList.children)
  }

  const handleCityChange = (e) => {
    const id = e.target.value
    setCityId(id)
  }

  useEffect(() => {
    setPList(poc)
    setAList(poc[0].children)
    setCList(poc[0].children[0].children || [])
    setCityId(poc[0].children[0].children[0].code)
  }, [poc])

  return (
    <div className="container">
      <Helmet title="申请" />
      <Navbar />
      <section className="apply-wrap">
        <div className="realname">
          <span>真实姓名：</span>
          <input
            placeholder="请输入真实姓名"
            value={realName}
            onChange={handleRealNameChange}
          />
        </div>
        <div className="phone">
          <span>联系电话：</span>
          <input
            placeholder="请输入电话号码"
            value={phone}
            onChange={handelPhoneChange}
          />
        </div>
        <div className="cityId">
          <span>详细地址：</span>
          <select onChange={handleProvinceChange}>
            {
              pList.map(item => (
                <option value={item.code} key={item.code}>{item.name}</option>
              ))
            }
          </select>
          <select onChange={handleAreaChange}>
            {
              aList.map(item => (
                <option value={item.code} key={item.code}>{item.name}</option>
              ))
            }
          </select>
          <select onChange={handleCityChange}>
            {
              cList.map(item => (
                <option value={item.code} key={item.code}>{item.name}</option>
              ))
            }
          </select>
        </div>
        <div className="desc">
          <span>详细介绍：</span>
          <textarea
            placeholder="请输入个人/单位的详细介绍"
            value={desc}
            onChange={handelDescChange}
          />
        </div>
        <hr />
        <div className="button-wrap">
          <button onClick={handleSubmit}>立即创建</button>
        </div>

      </section>
      <footer className="footer">
        <section className="qrcode">
          <div className="qrcodeIcon" />
        </section>
        <section className="copyright">
          © 2019 中国古筝日——古筝人自己的节日 版权所有
        </section>
      </footer>
    </div>
  )
}

Apply.getInitialProps = async () => {
  const data = await get('/api/fe/poc')
  return { poc: data.list || [] }
}

Apply.propTypes = {
  poc: Proptypes.array,
}

export default Apply
