import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import Helmet from 'react-helmet'
import Proptypes from 'prop-types'
import { get } from '../../utils/http'
import Navbar from '../../components/Navbar/Navbar'
import PostItem from '../../components/PostItem'
import SearchInput from '../../components/searchBar'
import './index.less'

const TYPE_TITLE = {
  news: '咨询',
  study: '学习',
  songs: '曲谱',
  rythme: '伴奏',
  example: '示范',
}

const TAG_TO_NUMBER = {
  news: 1,
  study: 2,
  rythme: 3,
  songs: 4,
  example: 5,
}

const Post = (props) => {
  const { router, postList } = props

  const [title, setTitle] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    const { query: { type } } = router
    setTitle(TYPE_TITLE[type])
  }, [router])

  useEffect(() => {
    setList(postList)
  }, [postList])

  async function handleSearch(value) {
    const tag = TAG_TO_NUMBER[router.query.type] || router.query.type
    const res = await get(`/api/fe/posts?title=${value}&tag=${tag}`)
    setList(res.list || [])
  }

  return (
    <div className="container">
      <Helmet title={title} />
      <Navbar />
      <div style={{ marginTop: '34px' }}>
        <SearchInput onSearch={handleSearch} />
      </div>
      <div>
        {
          list.map(item => (
            <PostItem
              title={item.title}
              type={router.query.type}
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
  const tag = TAG_TO_NUMBER[query.type] || query.type
  const postList = await get(`/api/fe/posts?tag=${tag}`)
  return { postList: postList.list || [] }
}

Post.propTypes = {
  router: Proptypes.object,
  postList: Proptypes.array,
}

export default withRouter(Post)
