import React from 'react'
import style from './StatusForm.module.css'

function StatusForm({ currentStep, setCurrentStep, furthestStep }) {

  const handleButtonClick = (step) => {
    if (step <= furthestStep) {
      setCurrentStep(step);
    }
  }

  return (
    <div className={style.container}>
      <button
        onClick={() => handleButtonClick(0)}
        className={style.button}
        disabled={0 > furthestStep}
        style={{ backgroundColor: currentStep === 0 ? '#BEE2FD' : 'initial' }}
      >
        1
      </button>
      <button
        onClick={() => handleButtonClick(1)}
        className={style.button}
        disabled={1 > furthestStep}
        style={{ backgroundColor: currentStep === 1 ? '#BEE2FD' : 'initial' }}
      >
        2
      </button>
      <button
        onClick={() => handleButtonClick(2)}
        className={style.button}
        disabled={2 > furthestStep}
        style={{ backgroundColor: currentStep === 2 ? '#BEE2FD' : 'initial' }}
      >
        3
      </button>
      <button
        onClick={() => handleButtonClick(3)}
        className={style.button}
        disabled={3 > furthestStep}
        style={{ backgroundColor: currentStep === 3 ? '#BEE2FD' : 'initial' }}
      >
        4
      </button>
    </div>
  )
}

export default StatusForm