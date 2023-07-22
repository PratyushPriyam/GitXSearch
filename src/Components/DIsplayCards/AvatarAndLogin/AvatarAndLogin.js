import React from 'react'
import style from './AvatarAndLogin.module.css'
export default function AvatarAndLogin(props) {
  return (
    <div className={style.main}>
        <div className={style.card}>
            <img src={props.avatarImg}/>
            <h3 style={{color: "gray", marginLeft:"5px"}}>Github id: </h3>
            <p>{props.loginId}</p>
        </div>
    </div>
  )
}
