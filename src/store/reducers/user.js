const initalstate = {
    user: {
        userData: {},
        isLogin: localStorage.getItem('jwt') ? true : false
    }
}

const userReducer = (state = initalstate.user, action) => {
    switch (action.type) {
        case "USER_LOGIN_SUCCESS":
            return {
                ...state,
                userData: action.payload,
                isLogin: true
            }

        case "USER_LOGOUT_SUCCESS":
            return {
                ...state,
                userData: {},
                isLogin: false
            }
        default: return state
    }
}

export default userReducer;