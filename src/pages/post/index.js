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

const Post = (props) => {
  const { router, postList } = props

  const [title, setTitle] = useState('')

  useEffect(() => {
    const { query: { type } } = router
    setTitle(TYPE_TITLE[type])
  }, [router])

  return (
    <div className="container">
      <Helmet title={title} />
      <Navbar />
      <div style={{ marginTop: '34px' }}>
        <SearchInput />
      </div>
      <section>
        {
          postList.map(item => (
            <PostItem title={item.title} type={router.query.type} src={item.src} />
          ))
        }
      </section>
    </div>
  )
}

Post.getInitialProps = async ({ query }) => {
  const postList = await get('/api/fe/posts')
  return { postList: postList.list || [] }
}

Post.propTypes = {
  router: Proptypes.object,
}

export default withRouter(Post)
