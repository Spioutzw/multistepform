import React from 'react';
import style from './FormCard.module.css';

function FormCard({ children, currentStep, prevFormStep, nextFormStep }) {

  console.log(currentStep);

  return (
    <div>
      {children}

      {currentStep < 4 && (
        <div className={style.containerButton}>
          {currentStep > 0 ? (
            <button className={style.buttonBack} type="button" onClick={prevFormStep}>
              <span>Go Back</span> 
            </button>
          ) : (
            <div></div>
          )}
          <button form='stepForm' className={style.buttonNext} style={{backgroundColor: currentStep === 3 ? '#483EFF': '#022959' }} type="submit" >
           {currentStep === 3 ? 
            <span> Confirm</span> : <span>Next Step</span>
            } 
          </button>
        </div>
      )}
    </div>
  );
}

export default FormCard;