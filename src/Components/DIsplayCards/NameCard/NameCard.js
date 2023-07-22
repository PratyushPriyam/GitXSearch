import React from 'react'
import style from './NameCard.module.css'

export default function NameCard(props) {
  return (
    <div className={style.main}>
        <div className={style.card}>
            <h2><span className={style.h2Span}>Name</span>: {props.name}</h2>
        </div>
    </div>
  )
}
