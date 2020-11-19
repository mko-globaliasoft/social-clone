export const userGet = (user) => {
    return dispatch => {
        console.log('Usereee', user)
        dispatch({
            type: "USER_LOGIN_SUCCESS", payload: user
        })
    }
}

export const logout = (history) => {
    return dispatch => {
        localStorage.removeItem('jwt');
        dispatch({
            type: "USER_LOGOUT_SUCCESS", payload: []
        })
        history.push('/login');
    }
}

