import React from 'react'
import style from './StatusForm.module.css'

function StatusForm({ currentStep, setCurrentStep, furthestStep }) {

  const handleButtonClick = (step) => {
    if (step <= furthestStep && step !== currentStep) {
      setCurrentStep(step);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.containerButtonStep}>
        <button
          onClick={() => handleButtonClick(0)}
          className={style.button}
          disabled={0 > furthestStep}
          style={{ backgroundColor: currentStep === 0 ? '#BEE2FD' : 'initial',cursor: 0 > furthestStep ? 'not-allowed' : 'pointer' }}
        >
          1
        </button>
        <div className={style.containerStep}>
          <p>STEP 1</p>
          <p>YOUR INFO</p>
        </div>
      </div>
      <div className={style.containerButtonStep}>
        <button
          onClick={() => handleButtonClick(1)}
          className={style.button}
          disabled={1 > furthestStep}
          style={{ backgroundColor: currentStep === 1 ? '#BEE2FD' : 'initial',cursor: 1 > furthestStep ? 'not-allowed' : 'pointer' }}
        >
          2
        </button>
        <div className={style.containerStep}>
          <p>STEP 2</p>
          <p>SELECT PLAN</p>
        </div>
      </div>
      <div className={style.containerButtonStep}>
        <button
          onClick={() => handleButtonClick(2)}
          className={style.button}
          disabled={2 > furthestStep}
          style={{ backgroundColor: currentStep === 2 ? '#BEE2FD' : 'initial',cursor: 2 > furthestStep ? 'not-allowed' : 'pointer' }}
        >
          3
        </button>
        <div className={style.containerStep}>
          <p>STEP 3</p>
          <p>ADD-ONS</p>
        </div>
      </div>
      <div className={style.containerButtonStep}>
        <button
          onClick={() => handleButtonClick(3)}
          className={style.button}
          disabled={3 > furthestStep}
          style={{ backgroundColor: currentStep === 3 ? '#BEE2FD' : 'initial',cursor: 3 > furthestStep ? 'not-allowed' : 'pointer' }}
        >
          4
        </button>
        <div className={style.containerStep}>
          <p>STEP 4</p>
          <p>SUMMARY</p>
        </div>
      </div>
    </div>
  )
}

export default StatusForm