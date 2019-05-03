import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import Helmet from 'react-helmet'
import Proptypes from 'prop-types'
import Navbar from '../../components/Navbar/Navbar'
import './index.less'

const TYPE_TITLE = {
  news: '咨询',
  study: '学习',
  songs: '曲谱',
  rythme: '伴奏',
  example: '示范',
}

const Post = (props) => {
  const { router } = props

  const [title, setTitle] = useState('')

  useEffect(() => {
    const { query: { type } } = router
    setTitle(TYPE_TITLE[type])
  }, [router])
  return (
    <div className="container">
      <Helmet title={title} />
      <Navbar />
    </div>
  )
}

Post.getInitialProps = ({ query }) => {
  console.log(query)
}

Post.propTypes = {
  router: Proptypes.object,
}

export default withRouter(Post)
