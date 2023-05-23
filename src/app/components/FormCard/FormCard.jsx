import React from 'react'

function FormCard({children, currentStep, prevFormStep}) {
  return (
    <div>
        
        {children}

        {currentStep < 3 && (
            <>
                {currentStep> 0 && (
                    <button type='button' onClick={prevFormStep}>Back</button>
                )}
            </>
        )}
        
    </div>
  )
}

export default FormCard