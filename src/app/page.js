'use client'
import Step1 from './components/Step1/Step1'
import Step2 from './components/Step2/Step2'
import styles from './page.module.css'
import { FormProvider } from './context/contextForm'
import {  useState } from 'react';
import FormCard from './components/FormCard/FormCard'
import Step3 from './components/Step3/Step3'

export default function Home() {

  const [formStep, setFormStep] = useState(0);
  

  const nextStep = () => {
    setFormStep(formStep + 1);
  }

  const prevStep = () => {
    setFormStep(formStep - 1);
  }

  return (
    <FormProvider>
      <main className={styles.main}>
        <FormCard currentStep={formStep} prevFormStep={prevStep} nextFormStep={nextStep} >
          {formStep === 0 && <Step1 formStep={formStep} nextStep={nextStep}  />}
          {formStep === 1 && <Step2 formStep={formStep} prevStep={prevStep} nextStep={nextStep}  />}
          {formStep === 2 && <Step3 formStep={formStep} prevStep={prevStep} nextStep={nextStep}  />}
        </FormCard>
      </main>
    </FormProvider>
  )
}
