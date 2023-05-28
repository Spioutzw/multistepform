'use client'

import React, { useState } from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormState } from '../../context/contextForm';
import Image from 'next/image';
import style from './Step2.module.css';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle';

const schema = yup.object({
    Name: yup.string().required(),
    Email: yup.string().email().required(),
    Phone: yup.number().positive().integer().required(),
}).required();

const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-thumb': {
      width: 10,
      height: 10,
      margin: 5,
      backgroundColor: 'white',
      
    },
    '& .Mui-checked .MuiSwitch-thumb': {
        backgroundColor: 'white',
      },
    '& .MuiSwitch-track': {
        backgroundColor: '#022959',
        opacity: 1,
    },
    '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#022959',
        opacity: 1,
      },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(20px)',
    },
  }));


function Step2({ nextStep }) {
    const { data, setFormValues } = useFormState();
    console.log(data)
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
            <div className={style.containerAll}>
                <div className={style.containerForm}>
                    <TitleSubtitle title="Select your plan" subTitle="You have the option of monthly or yearly billing." />
                    <form id='stepForm' onSubmit={handleSubmit(saveData)}>
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
                        <div className={style.YM}>
                            <span>Monthly</span>
                            <CustomSwitch  defaultChecked  />
                            <span>Yearly</span>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Step2