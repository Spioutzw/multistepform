'use client'

import React from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormState } from '../../context/contextForm';
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle';
import style from './Step1.module.css';

const schema = yup.object({
  Name: yup.string().required(),
  Email: yup.string().email().required(),
  Phone: yup.number().positive().integer().required(),
}).required();


function Step1({nextStep, setCurrentStep}) {

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
            <label htmlFor="name-input">Name</label>
            <input id="name-input" type="text" placeholder="e.g Stephen King" {...register("Name")} />
            <p>{errors.Name?.message}</p>

            <label htmlFor="email-input">Email address</label>
            <input id="email-input" type='email' placeholder="e.g stephenking@lorem.com" {...register("Email")} />
            <p>{errors.Email?.message}</p>

            <label htmlFor="phone-input">Phone Number</label>
            <input id="phone-input" type='tel' placeholder="e.g 1234567890" {...register("Phone")} />
            <p>{errors.Phone?.message}</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Step1