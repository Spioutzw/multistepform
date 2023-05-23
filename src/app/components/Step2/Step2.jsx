'use client'

import React, { useState } from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormState } from '../../context/contextForm';
import Image from 'next/image';
import style from './Step2.module.css';

const schema = yup.object({
    Name: yup.string().required(),
    Email: yup.string().email().required(),
    Phone: yup.number().positive().integer().required(),
}).required();


function Step1({ formStep, nextStep }) {
    console.log(nextStep)
    const { data, setFormValues } = useFormState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [toggle, setToggle] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema), defaultValues: data });

    const saveData = (data) => {
        setFormValues(data);
        nextStep();
    };

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    }

    return (
        <>
            <LeftBar />
            <h3>Select your plan</h3>
            <p>You have the option of monthly or year billing.</p>
            <form onSubmit={handleSubmit(saveData)}>
                <div className={style.containerDiv}>
                    <Image className={style.image} src="/images/icon-arcade.svg" alt="Picture of the author" width={30} height={30} />
                    <div onClick={() => handleOptionClick('basic')} className={style.card}>
                        <p className={style.titleChoice}>Arcade</p>
                        <p className={style.price}>$90/yr</p>
                        <p className={style.free}>2 months free</p>
                    </div>
                </div>
                <div className={style.containerDiv}>
                    <Image className={style.image} src="/images/icon-advanced.svg" alt="Picture of the author" width={30} height={30} />
                    <div onClick={() => handleOptionClick('standard')} className={style.card}>
                        <p className={style.titleChoice}>Advanced</p>
                        <p className={style.price}>$120/yr</p>
                        <p className={style.free}>2 months free</p>
                    </div>
                </div>
                <div className={style.containerDiv}>
                    <Image className={style.image} src="/images/icon-pro.svg" alt="Picture of the author" width={30} height={30} />
                    <div onClick={() => handleOptionClick('premium')} className={style.card}>
                        <p className={style.titleChoice}>Pro</p>
                        <p className={style.price}>$150/yr</p>
                        <p className={style.free}>2 months free</p>
                    </div>
                </div>
                <div>
                    <button onClick={handleToggle}>
                        {toggle ? 'Monthly' : 'Yearly'}
                    </button>
                </div>
                <div>

                </div>
            </form>

        </>
    )
}

export default Step1