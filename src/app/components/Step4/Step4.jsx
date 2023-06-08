import React, { useState } from 'react';
import style from './Step4.module.css';
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle';
import { useFormState } from '@/app/context/contextForm';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Finish from '../Finish/Finish'; // import the new component

function Step4() {
  const [showNewComponent, setShowNewComponent] = useState(false); // add state variable

  const getTotalPrice = (data) => {
    const pricePlan = parseFloat(data.pricePlan.slice(1));
    const addOnsPrice = data.selectedAddOns.reduce(
      (total, addOn) => total + parseFloat(addOn.price.slice(1)),
      0
    );
    const totalPrice = pricePlan + addOnsPrice;

    return totalPrice;
  };

  const { data } = useFormState();
  console.log(data, 'data4');
  const { handleSubmit } = useForm({ defaultValues: data });
  const totalPrice = getTotalPrice(data);

  const saveData = () => {
    console.log(data);
    setShowNewComponent(true); // update state variable
  };

  return (
    <>
      <div className={style.containerAll}>
        {showNewComponent ? ( // conditionally render new component
          <Finish />
        ) : (
          <div className={style.containerForm}>
            <TitleSubtitle
              title="Finishing up"
              subTitle="Double-check everything look OK before confirming."
            />
            <form id="stepForm" onSubmit={handleSubmit(saveData)}>
              <div className={style.containerInfo}>
                <div className={style.containerPlan}>
                  <div>
                    <p className={style.police5}>
                      {data.namePlan} {data.isYearly ? '(Yearly)' : '(Monthly)'}
                    </p>
                    <Link className={`${style.police} ${style.link}`} href="/">
                      Change
                    </Link>
                  </div>
                  <span className={style.police5}>
                    {data.pricePlan}
                    {data.isYearly ? '/yr' : '/mo'}
                  </span>
                </div>
                <hr />
                {data.selectedAddOns.map((item, index) => (
                  <div key={index} className={style.containerAddons}>
                    <p className={`${style.addonsName} ${style.police}`}>
                      {item.name}
                    </p>
                    <p className={`${style.addonsPrice} ${style.police}`}>
                      +{item.price}
                    </p>
                  </div>
                ))}
              </div>
              <div className={style.containerPlan}>
                <p className={`${style.police}`}>
                  {`Total ${data.isYearly ? 'per year' : 'per month'}`}
                </p>
                <span className={style.totalPrice}>
                  {`${data.isYearly ? '' : '+'}$${totalPrice}${
                    data.isYearly ? '/yr' : '/mo'
                  }`}
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Step4;
