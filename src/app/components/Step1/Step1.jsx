'use client'

import React from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormState } from '../../context/contextForm';
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle';
import style from './Step1.module.css';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  Name: yup.string().required(),
  Email: yup.string().email().required(),
  Phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
}).required();


function Step1({ nextStep }) {

  const { data, setFormValues } = useFormState();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), defaultValues: data });

  const saveData = (data) => {
    console.log(data)
    setFormValues(data);
    nextStep();
  };


  return (
    <>
      <div className={style.containerAll}>
        <div className={style.containerForm}>
          <TitleSubtitle title="Personal Info" subTitle="Please provide your name, email address, and phone number." />
          <form id='stepForm' className={style.form} onSubmit={handleSubmit(saveData)}>
            
            <div className={style.containerError}>
              <label htmlFor="name-input">Name</label>
              <p>{errors.Name?.message}</p>
            </div>
            <input id="name-input" type="text" placeholder="e.g Stephen King" {...register("Name")} />
            

            <div className={style.containerError}>
             <label htmlFor="email-input">Email address</label>
             <p>{errors.Email?.message}</p>
            </div>
            <input id="email-input" type='email' placeholder="e.g stephenking@lorem.com" {...register("Email")} />
            

            <div className={style.containerError}>
              <label htmlFor="phone-input">Phone Number</label>
              <p>{errors.Phone?.message}</p>
            </div>
            <input id="phone-input" type='tel' placeholder="e.g 1234567890" {...register("Phone")} />

          </form>
        </div>
      </div>
    </>
  )
}

export default Step1