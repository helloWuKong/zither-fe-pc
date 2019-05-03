import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './index.less'

const SearchInput = (props) => {
  const { placeholder, onChange } = props

  const [value, setValue] = useState('')

  function _handleInputChange(e) {
    const inputValue = e.target.value
    setValue(inputValue)
    onChange && onchange(inputValue)
  }

  return (
    <div className="search_input">
      <input value={value} onChange={_handleInputChange} placeholder={placeholder} />
    </div>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default SearchInput
