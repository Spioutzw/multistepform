import React from 'react'
import style from './LeftBar.module.css'
import StatusForm from '../StatusForm/StatusForm'

function LeftBar({ currentStep, setCurrentStep , furthestStep}) {
  return (
    <div className={style.container}>
      <StatusForm currentStep={currentStep} setCurrentStep={setCurrentStep} furthestStep={furthestStep} />
    </div>
  )
}

export default LeftBar
