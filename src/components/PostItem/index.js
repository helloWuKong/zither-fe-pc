import React, { useEffect } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import './index.less'

const DEFAULT_IMG = {
  default: '/static/img/default.png',
}

const PostItem = (props) => {
  const {
    type,
    src,
    title,
    id,
  } = props
  return (
    <Link href={`/postdetail?id=${id}`}>
      <div className="post_item">
        <div className="post_item_img">
          <img src={src || DEFAULT_IMG.default} alt="标题图片" />
        </div>
        <div className="post_item_title">
          {title}
        </div>
      </div>
    </Link>
  )
}
PostItem.propTypes = {
  type: PropTypes.string.isRequired,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
}

export default React.memo(PostItem)
