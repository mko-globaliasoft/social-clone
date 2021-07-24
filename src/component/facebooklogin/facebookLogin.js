import React from 'react'
import FacebookLogin from 'react-facebook-login';

import style from './facebookButton.css'

const Facebooklogin = () => {
    const responseFacebook = (res) => {
        // we get facebook reponse here
        // we want to call our API here
        console.log(res)
    }

    const componentClicked = () => {
        console.log('clicked')
    }

    return (
        <FacebookLogin
            className={style.button}
            appId="2833729503542121"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook} />
    )
}

export default Facebooklogin;