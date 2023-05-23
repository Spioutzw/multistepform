'use client'

import { createContext, useContext, useState } from 'react';

export const FormStateContext = createContext();

export function FormProvider({ children }) {
    const [data, setData] = useState({});

    const setFormValues = (values) => {
        setData((prevValues) => ({ ...prevValues, ...values }));
    };
    
    return (
      <FormStateContext.Provider value={{data,setFormValues}}>
        {children}
      </FormStateContext.Provider>
    );
  }

export const useFormState = () => useContext(FormStateContext);