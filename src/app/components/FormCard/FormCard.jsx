import React from 'react';
import style from './FormCard.module.css';

function FormCard({ children, currentStep, prevFormStep, nextFormStep }) {

  return (
    <>
      {children}

      {currentStep < 4 && (
        <div className={style.containerButton} style={{justifyContent: currentStep > 0 ?  'space-between' : 'flex-end'}}>
          {currentStep > 0 ? (
            <button className={style.buttonNext} style={{backgroundColor : '#164A8A'}}  type="button" onClick={prevFormStep}>
              <span>Go Back</span> 
            </button>
          ) : (
            <></>
          )}
          <button form='stepForm' className={style.buttonNext} style={{backgroundColor: currentStep === 3 ? '#483EFF': '#164A8A' }} type="submit" >
           {currentStep === 3 ? 
            <span> Confirm</span> : <span>Next Step</span>
            } 
          </button>
        </div>
      )}
    </>
  );
}

export default FormCard;