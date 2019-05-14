import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import Helmet from 'react-helmet'
import Proptypes from 'prop-types'
import { get } from '../../utils/http'
import Navbar from '../../components/Navbar/Navbar'
import PostItem from '../../components/PostItem'
import SearchInput from '../../components/searchBar'
import './index.less'

const Post = (props) => {
  const { router, postList, poc } = props

  const [list, setList] = useState([])
  const [poc1, setPoc1] = useState([])
  const [poc2, setPoc2] = useState([])
  const [poc3, setPoc3] = useState([])

  const [poc1Val, setPoc1Val] = useState('')
  const [poc2Val, setPoc2Val] = useState('')
  const [poc3Val, setPoc3Val] = useState('')

  const [cityId, setCityId] = useState('')


  async function handleSearch(value) {
    const res = await get(`/api/fe/posts?title=${value}&tag=6&cityId=${cityId}`)
    setList(res.list || [])
  }

  useEffect(() => {
    setList(postList)
  }, [postList])

  useEffect(() => {
    handleSearch('')
  }, [cityId])

  const _findPoc1Children = (id) => {
    let temp = {}
    poc1.forEach((item) => {
      if (item.code === id) {
        temp = item
      }
    })
    return temp
  }

  const _findPoc2Children = (id) => {
    let temp = {}
    poc2.forEach((item) => {
      if (item.code === id) {
        temp = item
      }
    })
    return temp
  }

  useEffect(() => {
    setPoc1(poc)
    const id = router.query.cityid
    setPoc1Val(id.slice(0, 2))
    if (poc) {
      poc.forEach((item) => {
        if (item.code === id.slice(0, 2)) {
          setPoc2(item.children || [])
        }
      })
    }
    setPoc2Val(id.slice(0))
    setCityId(id)
  }, [poc])

  const _handlePoc1Change = (e) => {
    const value = e.target.value
    if (!value) {
      setCityId('')
      setPoc1Val('')
      setPoc2Val('')
      setPoc3Val('')
      setPoc2([])
      return
    }
    setPoc1Val(value)
    setCityId(value)
    const poc2List = _findPoc1Children(value)
    setPoc2(poc2List.children)
    setPoc3([])
  }

  const _handlePoc2Change = (e) => {
    const value = e.target.value
    if (!value) {
      setCityId(cityId.slice(0, 2))
      setPoc2Val('')
      setPoc3Val('')
      setPoc3([])
      return
    }
    setPoc2Val(value)
    setCityId(value)
    const poc3List = _findPoc2Children(value)
    setPoc3(poc3List.children)
  }

  const _handlePoc3Change = (e) => {
    const value = e.target.value
    if (!value) {
      setCityId(cityId.slice(0, 4))
      setPoc3Val('')
      return
    }
    setPoc3Val(value)
    setCityId(value)
  }

  return (
    <div className="container">
      <Helmet title="分会场" />
      <Navbar />
      <div className="abroad" style={{ marginTop: '34px' }}>
        <select value={poc1Val} onChange={_handlePoc1Change}>
          <option value={''}>请选择</option>
          {
            poc1.map(item => (
              <option value={item.code} key={item.code}>{item.name}</option>
            ))
          }
        </select>
        <select value={poc2Val} onChange={_handlePoc2Change}>
          <option value={''}>请选择</option>
          {
            poc2.map(item => (
              <option value={item.code} key={item.code}>{item.name}</option>
            ))
          }
        </select>
        <select value={poc3Val} onChange={_handlePoc3Change}>
          <option value={''}>请选择</option>
          {
            poc3.map(item => (
              <option value={item.code} key={item.code}>{item.name}</option>
            ))
          }
        </select>
      </div>
      <div style={{ marginTop: '34px' }}>
        <SearchInput onSearch={handleSearch} />
      </div>
      <div>
        {
          list.map(item => (
            <PostItem
              title={item.title}
              type={router.query.type || 'audio'}
              src={item.src}
              key={item._id}
              id={item._id}
            />
          ))
        }
      </div>
    </div>
  )
}

Post.getInitialProps = async ({ query }) => {
  const postList = await get('/api/fe/posts?tag=6')
  const poc = await get('/api/fe/poc')
  return { postList: postList.list || [], poc: poc.list }
}

Post.propTypes = {
  router: Proptypes.object,
  postList: Proptypes.array,
}

export default withRouter(Post)
