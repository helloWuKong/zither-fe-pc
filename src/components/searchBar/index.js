import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './index.less'

const SearchInput = (props) => {
  const { onChange, onSearch } = props

  const [value, setValue] = useState('')

  function _handleInputChange(e) {
    const inputValue = e.target.value
    setValue(inputValue)
    onChange && onchange(inputValue)
  }

  function _hanleSearch() {
    const target = (value || '').trim()
    onSearch(target)
  }

  return (
    <div className="search_input">
      <input value={value} onChange={_handleInputChange} placeholder="请输入搜索内容" />
      <span className="icon" onClick={_hanleSearch}>
        <i />
      </span>
    </div>
  )
}

SearchInput.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
}

export default SearchInput
