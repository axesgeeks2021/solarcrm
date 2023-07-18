import React from 'react'

function Line({title, value}) {
  return (
    <p className='details__line'>{title} : <span>{value}</span></p>
  )
}

export default Line