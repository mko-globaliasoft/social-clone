import React from 'react'
import GoogleLogin from 'react-google-login';

const Googlelogin = () => {
    const responseGoogle = (response) => {
        console.log(response)
    }
    return (
        <GoogleLogin
            clientId="629694605327-8i763nq6n6erquf2sfcuje6ukuebdt9d.apps.googleusercontent.com"
            buttonText="Login With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default Googlelogin;