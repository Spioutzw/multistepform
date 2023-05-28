import React from 'react';
import style from './FormCard.module.css';

function FormCard({ children, currentStep, prevFormStep, nextFormStep }) {

  

  return (
    <div>
      {children}

      {currentStep < 3 && (
        <div className={style.containerButton}>
          {currentStep > 0 ? (
            <button className={style.buttonBack} type="button" onClick={prevFormStep}>
              <span>Back</span> 
            </button>
          ) : (
            <div></div>
          )}
          <button form='stepForm' className={style.buttonNext} type="submit" >
            <span> Next step</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default FormCard;