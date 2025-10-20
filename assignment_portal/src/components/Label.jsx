import PropTypes from 'prop-types'
import React from 'react'

const Label = ({
    htmlFor='',
    children,
    className=''
}) => {
  return (

    <label htmlFor={htmlFor} className={`text-gray-600 block mb-2  font-bold ${className}`}>{children}</label>
    
  )
}

Label.propTypes ={
    htmlFor :PropTypes.string,
    children:PropTypes.node.isRequired,
    className:PropTypes.string
}

export default Label