import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import Helmet from 'react-helmet'
import Proptypes from 'prop-types'
import { get } from '../../utils/http'
import { dateFilter } from '../../utils/utils'
import Navbar from '../../components/Navbar/Navbar'
import './index.less'

const PostDetail = (props) => {
  const { router, postDetail } = props
  return (
    <div className="container">
      <Helmet title={postDetail.title} />
      <Navbar />
      <section className="title">
        <h1>{postDetail.title}</h1>
        <div>
          创建时间：
          { postDetail.meta && dateFilter(postDetail.meta.createdTime, 'yyyy-MM-dd hh:mm:ss')}
          {'     '}
          作者：
          {postDetail.author}
        </div>
      </section>
      <hr />
      <div
        style={{ padding: '0 100px', border: 'none' }}
        className="ql-container ql-snow"
      >
        <pre
          className="ql-editor"
          style={{ maxWidth: '980px', wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
        />
      </div>
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

PostDetail.getInitialProps = async ({ query }) => {
  const postDetail = await get(`/api/fe/posts?id=${query.id}`)
  return { postDetail: postDetail.list[0] || {} }
}

PostDetail.propTypes = {
  router: Proptypes.any,
  postDetail: Proptypes.any,
}

export default withRouter(PostDetail)
