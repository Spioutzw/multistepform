'use client'
import Step1 from './components/Step1/Step1'
import Step2 from './components/Step2/Step2'
import styles from './page.module.css'
import { FormProvider } from './context/contextForm'
import { useState } from 'react';
import FormCard from './components/FormCard/FormCard'
import Step3 from './components/Step3/Step3'
import Step4 from './components/Step4/Step4'
import LeftBar from './components/LeftBar/LeftBar'

export default function Home() {

  const [formStep, setFormStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);


  const nextStep = () => {
    setFormStep(formStep + 1);
    setFurthestStep(furthestStep => Math.max(furthestStep, formStep + 1));
  }

  const prevStep = () => {
    setFormStep(formStep - 1);
  }

  return (
    <FormProvider>
      <main className={styles.main}>
        <div className={styles.containerLeftBar}>
          <FormCard currentStep={formStep} prevFormStep={prevStep} nextFormStep={nextStep} >
            <LeftBar currentStep={formStep} setCurrentStep={setFormStep} furthestStep={furthestStep} />
            {formStep === 0 && <Step1 nextStep={nextStep} />}
            {formStep === 1 && <Step2 nextStep={nextStep} />}
            {formStep === 2 && <Step3 nextStep={nextStep} />}
            {formStep === 3 && <Step4 />}
          </FormCard>
        </div>
      </main>
    </FormProvider>
  )
}
