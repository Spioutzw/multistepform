'use client'

import React, { memo, use, useCallback, useEffect, useRef, useState } from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormState } from '../../context/contextForm';
import Image from 'next/image';
import style from './Step2.module.css';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle';

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
    const [selectedPlan, setSelectedPlan] = useState(null);
    console.log(data.isYearly, 'data.isMonthly');
    const [isYearly, setIsYearly] = useState(data.isYearly ? data.isYearly : false);
    const [planPrices, setPlanPrices] = useState({
        Arcade: {
            name: 'Arcade',
            monthly: '$9',
            yearly: '$90'
        },
        Advanced: {
            name: 'Advanced',
            monthly: '$12',
            yearly: '$120'
        },
        Pro: {
            name: 'Pro',
            monthly: '$15',
            yearly: '$150'
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data });


    const updateData = (plan) => {
        const selectedPlan = {
            namePlan: plan.name,
            pricePlan: isYearly ? plan.yearly : plan.monthly,
            isYearly: isYearly
        };
        setSelectedPlan(selectedPlan);
    }

    const saveData = () => {
        if (selectedPlan === null && data.namePlan === undefined) {
            console.log(data.namePlan);
            alert('Veuillez sélectionner un plan avant de continuer');
            return;
        }
        setFormValues(selectedPlan);
        nextStep();
    };

    const handleChangeSwitch = () => {
        setIsYearly((prevIsYearly) => {
            const newIsYearly = !prevIsYearly;
            console.log(newIsYearly, 'newIsYearly');
            setSelectedPlan((prevState) => {
                return { ...prevState, isYearly: newIsYearly, pricePlan: newIsYearly === true ? planPrices.Arcade.yearly : planPrices.Arcade.monthly };
            });
            return newIsYearly;
        });
    };


    const arcadeRef = useRef();
    const advancedRef = useRef();
    const proRef = useRef();


    const handleSelectStyle = useCallback((event) => {
        console.log(event.target)
        // Check if the clicked element is the div itself
        if (event.target === event.currentTarget) {
            // Remove the selected class from all elements
            [arcadeRef, advancedRef, proRef].forEach(ref => {
                ref.current.classList.remove(`${style.selected}`);
            });

            // Add the selected class to the clicked element
            event.target.classList.add(`${style.selected}`);
        }
    }, []);

    useEffect(() => {

        console.log(isYearly);

        // Remove the selected class from all elements
        [arcadeRef, advancedRef, proRef].forEach((ref) => {
            ref.current.classList.remove(`${style.selected}`);
        });


        // Add the selected class to the selected plan's div
        if (data) {
            switch (data.namePlan) {
                case 'Arcade':
                    arcadeRef.current.classList.add(`${style.selected}`);
                    break;
                case 'Advanced':
                    advancedRef.current.classList.add(`${style.selected}`);
                    break;
                case 'Pro':
                    proRef.current.classList.add(`${style.selected}`);
                    break;
            }
        }
    }, [data]);


    return (
        <>
            <div className={style.containerAll}>
                <div className={style.containerForm}>
                    <TitleSubtitle title="Select your plan" subTitle="You have the option of monthly or yearly billing." />
                    <form id='stepForm' onSubmit={handleSubmit(saveData)}>
                        <div>
                            <div ref={arcadeRef} className={style.containerDiv} onClick={(e) => { updateData(planPrices.Arcade); handleSelectStyle(e) }} >
                                <Image className={style.image} src="/images/icon-arcade.svg" alt="Picture of the author" width={30} height={30} />
                                <div className={style.card}>
                                    <p className={style.titleChoice}>{planPrices.Arcade.name}</p>
                                    <p className={style.price}>{!isYearly ? planPrices.Arcade.monthly : planPrices.Arcade.yearly}</p>
                                    {isYearly ? <p className={style.free}>2 months free </p> : ''}
                                </div>
                            </div>
                            <div ref={advancedRef} className={style.containerDiv} onClick={(e) => { updateData(planPrices.Advanced); handleSelectStyle(e) }}>
                                <Image className={style.image} src="/images/icon-advanced.svg" alt="Picture of the author" width={30} height={30} />
                                <div className={style.card}>
                                    <p className={style.titleChoice}>{planPrices.Advanced.name}</p>
                                    <p className={style.price}>{!isYearly ? planPrices.Advanced.monthly : planPrices.Advanced.yearly}</p>
                                    {isYearly ? <p className={style.free}>2 months free </p> : ''}
                                </div>
                            </div>
                            <div ref={proRef} className={style.containerDiv} onClick={(e) => { updateData(planPrices.Pro); handleSelectStyle(e) }}>
                                <Image className={style.image} src="/images/icon-pro.svg" alt="Picture of the author" width={30} height={30} />
                                <div className={style.card}>
                                    <p className={style.titleChoice}>{planPrices.Pro.name}</p>
                                    <p className={style.price}>{!isYearly ? planPrices.Pro.monthly : planPrices.Pro.yearly}</p>
                                    {isYearly ? <p className={style.free}>2 months free </p> : ''}
                                </div>
                            </div>
                        </div>
                        <div className={style.YM}>
                            <span>Monthly</span>
                            <CustomSwitch checked={isYearly} onChange={handleChangeSwitch} />
                            <span>Yearly</span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Step2