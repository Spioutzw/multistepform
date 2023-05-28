import React from 'react'
import style from './TitleSubtile.module.css'

function TitleSubtitle(props) {
  return (
    <>
        <h3 className={style.title}>{props.title}</h3>
        <p className={style.subTitle}>{props.subTitle}</p>
    </>
  )
}

export default TitleSubtitle