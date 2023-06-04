import React from 'react'
import style from './Step4.module.css'
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle'
import { useFormState } from '@/app/context/contextForm';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

function Step4() {


  const getTotalPrice = (data) => {

    const pricePlan = parseFloat(data.pricePlan.slice(1));
    const addOnsPrice = data.selectedAddOns.reduce((total, addOn) => total + parseFloat(addOn.price.slice(1)), 0);
    const totalPrice = pricePlan + addOnsPrice;

    return totalPrice;
  }


  const { data } = useFormState();
  console.log(data)
  const { handleSubmit } = useForm({ defaultValues: data });
  const totalPrice = getTotalPrice(data);
  const saveData = () => {
    console.log(data)
  };

  return (
    <>
      <div className={style.containerAll}>
        <div className={style.containerForm}>
          <TitleSubtitle title="Finishing up" subTitle="Double-check everything look OK before confirming" />
          <form id='stepForm' onSubmit={handleSubmit(saveData)}>
            <div className={style.containerInfo}>
              <div>
                <p className={style.police5}>{data.namePlan} {data.isMonthly ? '(Monthly)' : '(Yearly)'}</p>
                <span className={style.police5}>{data.pricePlan}</span>
                <Link className={`${style.police}`} href="/">Change</Link>
              </div>
              <hr />
              {data.selectedAddOns.map((item, index) => (
                <div key={index}>
                  <p className={`${style.AddonsName} ${style.police}`}>{item.name}</p>
                  <p className={`${style.AddonsPrice} ${style.police}`}>+{item.price}</p>
                </div>
              )
              )}
            </div>
            <p className={`${style.police}`}>{`Total ${data.isMonthly ? 'per month' : 'per year'}`}</p>
            <span className={style.totalPrice}>{`${data.isMonthly ? '+' : ''}$${totalPrice}${data.isMonthly ? '/mo' : '/yr'}`}</span>
          </form>
        </div>
      </div>
    </>
  )
}

export default Step4