import React from 'react'
import style from './LeftBar.module.css'
import StatusForm from '../StatusForm/StatusForm'

function LeftBar() {
  return (
    <div className={style.container}>
      <StatusForm/>
    </div>
  )
}

export default LeftBar