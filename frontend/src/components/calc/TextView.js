import React from 'react'
import style from '../../css/calc/TextView.styl'

const TextView = (props) => {
  return (
    <div className={style.textField}>
      <span>{props.text}</span>
    </div>
  )
}

export default TextView
