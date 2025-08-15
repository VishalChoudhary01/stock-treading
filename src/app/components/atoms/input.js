import React from 'react'

const Input = ({placeholder,onInputChange,inputStyle,value}) => {
  return (
    <input className={inputStyle} value={value} onInput={onInputChange} placeholder={placeholder}/>
)
}

export default Input