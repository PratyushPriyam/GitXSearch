import React from 'react'
import style from './BioCard.module.css'

export default function BioCard(props) {
  return (
    <div className={style.main}>
        <div className={style.card}>
            <h3><span className={style.h3Span}>Bio</span>: {props.bio}</h3>
        </div>

    </div>
  )
}
