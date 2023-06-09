import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFormState } from '../../context/contextForm';
import style from './Step3.module.css';
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle';

function Step3({ nextStep }) {
  const { data, setFormValues } = useFormState();
  console.log(data, 'data');

  const [selectedAddOns, setSelectedAddOns] = useState(data.selectedAddOns || []);
  const AddOns = {
    OnlineService: {
      name: 'Online Service',
      price: data.isYearly ? '$10/yr' : '$1/mo',
    },
    LargerStorage: {
      name: 'Larger Storage',
      price: data.isYearly ? '$20/yr' : '$2/mo',
    },
    CustomizableProfile: {
      name: 'Customizable Profile',
      price: data.isYearly ? '$20/yr' : '$2/mo',
    },
  };

  const { handleSubmit } = useForm({ defaultValues: data });

  const handleAddOnSelection = (addOnName, isSelected) => {
    if (isSelected) {
      setSelectedAddOns((prevSelectedAddOns) => [...prevSelectedAddOns, addOnName]);
    } else {
      setSelectedAddOns((prevSelectedAddOns) =>
        prevSelectedAddOns.filter((item) => item.name !== addOnName.name)
      );
    }
  };

  const saveData = () => {
    setFormValues({ ...data, selectedAddOns });
    nextStep();
  };

  const onlineServiceRef = useRef();
  const largerStorageRef = useRef();
  const customizableProfileRef = useRef();

  const handleSelectStyle = useCallback((event) => {
    if (event.target.type === 'checkbox') {
      const parentDiv = event.target.closest(`.${style.containerDiv}`);

      if (event.target.checked) {
        parentDiv.classList.add(`${style.selected}`);
      } else {
        parentDiv.classList.remove(`${style.selected}`);
      }
    }
  }, []);

  useEffect(() => {

    if (data.selectedAddOns) {
      if (data.isYearly) {
        // modifie le prix des addOns dans data.selectedAddOns si l'utilisateur a choisi l'abonnement annuel
        const newSelectedAddOns = data.selectedAddOns.map((addOn) => {
          if (addOn.name === AddOns.OnlineService.name) {
            return { ...addOn, price: '$10/yr' };
          }
          if (addOn.name === AddOns.LargerStorage.name) {
            return { ...addOn, price: '$20/yr' };
          }
          if (addOn.name === AddOns.CustomizableProfile.name) {
            return { ...addOn, price: '$20/yr' };
          }
          return addOn;
        });
        setSelectedAddOns(newSelectedAddOns);
      } else {
        // modifie le prix des addOns dans data.selectedAddOns si l'utilisateur a choisi l'abonnement mensuel
        const newSelectedAddOns = data.selectedAddOns.map((addOn) => {
          if (addOn.name === AddOns.OnlineService.name) {
            return { ...addOn, price: '$1/mo' };
          }
          if (addOn.name === AddOns.LargerStorage.name) {
            return { ...addOn, price: '$2/mo' };
          }
          if (addOn.name === AddOns.CustomizableProfile.name) {
            return { ...addOn, price: '$2/mo' };
          }
          return addOn;
        });
        setSelectedAddOns(newSelectedAddOns);
      }
    }




    if (onlineServiceRef.current) {
      const onlineServiceCheckbox = onlineServiceRef.current.querySelector('input[type="checkbox"]');
      onlineServiceCheckbox.checked = selectedAddOns.some((addOn) => addOn.name === AddOns.OnlineService.name);
      const parentDiv = onlineServiceCheckbox.closest(`.${style.containerDiv}`);
      if (onlineServiceCheckbox.checked) {
        parentDiv.classList.add(`${style.selected}`);
      } else {
        parentDiv.classList.remove(`${style.selected}`);
      }
    }
    if (largerStorageRef.current) {
      const largerStorageCheckbox = largerStorageRef.current.querySelector('input[type="checkbox"]');
      largerStorageCheckbox.checked = selectedAddOns.some((addOn) => addOn.name === AddOns.LargerStorage.name);
      const parentDiv = largerStorageCheckbox.closest(`.${style.containerDiv}`);
      if (largerStorageCheckbox.checked) {
        parentDiv.classList.add(`${style.selected}`);
      } else {
        parentDiv.classList.remove(`${style.selected}`);
      }
    }
    if (customizableProfileRef.current) {
      const customizableProfileCheckbox = customizableProfileRef.current.querySelector(
        'input[type="checkbox"]'
      );
      customizableProfileCheckbox.checked = selectedAddOns.some(
        (addOn) => addOn.name === AddOns.CustomizableProfile.name
      );
      const parentDiv = customizableProfileCheckbox.closest(`.${style.containerDiv}`);
      if (customizableProfileCheckbox.checked) {
        parentDiv.classList.add(`${style.selected}`);
      } else {
        parentDiv.classList.remove(`${style.selected}`);
      }
    }
  }, []);

  console.log(data);

  return (
    <>
      <div className={style.containerAll}>
        <div className={style.containerForm}>
          <TitleSubtitle title="Pick add-ons" subTitle="You have the option of monthly or yearly billing." />
          <form id="stepForm" onSubmit={handleSubmit(saveData)}>
            <div ref={onlineServiceRef} className={style.containerDiv} onClick={handleSelectStyle}>
              <input
                onChange={(event) => handleAddOnSelection(AddOns.OnlineService, event.target.checked)}
                type="checkbox"
                id="onlineService"
                name="onlineService"
              />
              <div>
                <label className={style.label} htmlFor="onlineService">
                  Online Service
                </label>
                <p className={style.description}>Access to multiplayer games</p>
              </div>
              <p className={style.price}>+{AddOns.OnlineService.price}</p>
            </div>

            <div ref={largerStorageRef} className={style.containerDiv} onClick={handleSelectStyle}>
              <input
                onChange={(event) => handleAddOnSelection(AddOns.LargerStorage, event.target.checked)}
                type="checkbox"
                id="LargerStorage"
                name="LargerStorage"
              />
              <div>
                <label className={style.label} htmlFor="LargerStorage">
                  Larger Storage
                </label>
                <p className={style.description}>Extra 1TB of cloud save</p>
              </div>
              <p className={style.price}>+{AddOns.LargerStorage.price}</p>
            </div>

            <div ref={customizableProfileRef} className={style.containerDiv} onClick={handleSelectStyle}>
              <input
                onChange={(event) => handleAddOnSelection(AddOns.CustomizableProfile, event.target.checked)}
                type="checkbox"
                id="CustomeProfile"
                name="CustomeProfile"
              />
              <div className={style.container}>
                <label className={style.label} htmlFor="CustomeProfile">
                  Customizable profile
                </label>
                <p className={style.description}>Custom theme on your profile</p>
              </div>
              <p className={style.price}>+{AddOns.CustomizableProfile.price}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Step3;
