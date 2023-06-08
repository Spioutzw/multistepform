import Image from 'next/image'
import React from 'react'
import TitleSubtitle from '../TitleSubtitle/TitleSubtitle'
import style from './Finish.module.css'

function Finish() {
  return (
    <div className={style.container}>
        <Image src="/images/icon-thank-you.svg" alt='Logo remerciement ' width={56} height={56} />
        <TitleSubtitle title={'Thank you'} subTitle={'Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.'} />
    </div>
  )
}

export default Finish