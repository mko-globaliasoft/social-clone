import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import API from "../apiconfi";
import { connect } from 'react-redux';
import { userGet } from '../store/actions/user'
import { logout } from '../store/actions/user';

function Header(props) {
    const history = useHistory()

    useEffect(() => {
        console.log('In headet')
        if (props.user.isLogin) {
            axios.get(`${API}/myprofile`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            }).then((res) => {
                console.log('UserData', res.data.data)
                props.userGet(res.data.data)
            }).catch((error) => {
                console.log('error', error)
            })

        }

    }, [props.user.isLogin])

    // ***** Logout ****
    const Logout = () => {
        axios.post(`${API}/logout`, {
            key: "value"
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((res) => {
            if (res.message === "not valid") {
                props.logOut(history);
            }
        }).catch((err) => {
            props.logOut(history);
        })
        props.logOut(history);

    }
    console.log('Islogin', props.user.isLogin)
    return (
        <Fragment>
            <ul>
                <header className="text-gray-700 body-font" >
                    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                        <Link to='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            <span className="ml-3 text-xl" style={{ color: 'black', fontWeight: 500 }}>ReactJS</span>
                        </Link>
                        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                            <>
                                {props.user.isLogin ? <><Link to='/' className="mr-5 hover:text-gray-900">Home</Link>
                                    <Link to='/addpost' className="mr-5 hover:text-gray-900">Add Post</Link>
                                    <Link to='/mypost' className="mr-5 hover:text-gray-900">My Post</Link>
                                    <Link to='/myprofile' className="mr-5 hover:text-gray-900">My Profile</Link>
                                    <button onClick={() => Logout()} className="mr-5 hover:text-gray-900"> Logout</button></>
                                    : <><Link to='/login' className="mr-5 hover:text-gray-900">Login</Link>
                                        <Link to='/signup' className="mr-5 hover:text-gray-900">Signup</Link></>
                                }
                            </>
                        </nav>
                    </div>
                </header>
            </ul >
        </Fragment >
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: (history) => dispatch(logout(history)),
        userGet: (user) => dispatch(userGet(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header); 