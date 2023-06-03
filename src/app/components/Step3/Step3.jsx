'use client'

import React, { memo, useCallback, useRef, useState } from 'react'
import LeftBar from '../LeftBar/LeftBar'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useFormState } from '../../context/contextForm';
import style from './Step3.module.css';
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle';

function Step3({ formStep, nextStep }) {

    const { data, setFormValues } = useFormState();
    const [selectedOptions, setSelectedOptions] = useState(null);
    const AddOns = {
        OnlineService: {
            name: 'Online Service',
            price: data.isMonthly ? '$1/mo' : '$10/yr',
        },
        LargerStorage: {
            name: 'Larger Storage',
            price: data.isMonthly ? '$2/mo' : '$20/yr',
        },
        CustomizableProfile: {
            name: 'Customizable Profile',
            price: data.isMonthly ? '$2/mo' : '$20/yr',
        },
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data });

    const updateData = (options) => {
        const selectedOptions = {
            name: options.name,
            price: options.price,
            isMonthly: data.isMonthly
        };
        setSelectedOptions(selectedOptions);
    }

    const saveData = () => {
        setFormValues(selectedOptions);
        nextStep();
    };

    const onlineServiceRef = useRef();
    const largerStorageRef = useRef();
    const customizableProfileRef = useRef();


    const handleSelectStyle = useCallback((event) => {
        const allDivs = document.querySelectorAll(`.${style.containerDiv}`);

        allDivs.forEach(div => {
            div.classList.remove(`${style.selected}`);
        });

        event.target.classList.add(`${style.selected}`);
    }, []);

    return (
        <>
            <LeftBar />
            <div className={style.containerAll}>
                <div className={style.containerForm}>
                    <TitleSubtitle title="Pick add-ons" subTitle="You have the option of monthly or yearly billing." />
                    <form onSubmit={ () => handleSubmit(saveData)}>
                        <div ref={onlineServiceRef} className={style.containerDiv} onClick={handleSelectStyle}>
                            <input onSelect={ () => updateData(AddOns.OnlineService)} type="checkbox" id="onlineService" name="onlineService" />
                            <div>
                                <label htmlFor="onlineService">Online Service</label>
                                <p>Access to multiplayer games</p>
                            </div>
                            <p className={style.price}>{AddOns.OnlineService.price}</p>
                        </div>

                        <div ref={largerStorageRef} className={style.containerDiv} onClick={handleSelectStyle}>
                            <input onSelect={() => updateData(AddOns.LargerStorage)} type="checkbox" id="LargerStorage" name="LargerStorage" />
                            <div>
                                <label htmlFor="LargerStorage">Larger Storage</label>
                                <p>Extra 1TB of cloud save</p>
                            </div>
                            <p className={style.price}>{AddOns.LargerStorage.price}</p>
                        </div>

                        <div ref={customizableProfileRef} className={style.containerDiv} onClick={handleSelectStyle}>
                            <input onSelect={() => updateData(AddOns.CustomizableProfile)} type="checkbox" id="CustomeProfile" name="CustomeProfile" />
                            <div className={style.container}>
                                <label htmlFor="CustomeProfile">Customizable profile</label>
                                <p>Custom theme on your profile</p>
                            </div>
                            <p className={style.price}>{AddOns.CustomizableProfile.price}</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(Step3)