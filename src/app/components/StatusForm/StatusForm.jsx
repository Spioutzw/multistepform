import React from 'react'
import style from './StatusForm.module.css'

function StatusForm() {
  return (
    <div className={style.container}>
        <button className={style.button}>1</button>
        <button className={style.button}>2</button>
        <button className={style.button}>3</button>
        <button className={style.button}>4</button>
    </div>
  )
}

export default StatusForm