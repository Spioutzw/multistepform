'use client'

import React from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormState } from '../../context/contextForm';

const schema = yup.object({
  Name: yup.string().required(),
  Email: yup.string().email().required(),
  Phone: yup.number().positive().integer().required(),
}).required();


function Step1({formStep, nextStep}) {

  const { data ,setFormValues } = useFormState();
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema), defaultValues: data});

  const saveData = (data) => {
    setFormValues(data);
    nextStep();
  };


  return (
    <>
        <LeftBar/>

        <h2>Select your plan</h2>
        <form onSubmit={handleSubmit(saveData)}>
          <input type="text" placeholder="e.g Stephen King" {...register("Name")} />
          <p>{errors.Name?.message}</p>
          <input type='email' placeholder="e.g stephenking@lorem.com" {...register("Email")} />
          <p>{errors.Email?.message}</p>
          <input type='tel' placeholder="e.g 1234567890" {...register("Phone")} />
          <p>{errors.Phone?.message}</p>
          <button type="submit">Next</button>
        </form>

    </>
  )
}

export default Step1