const initialstate = {
    mypost: []
}

const myPostReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "MY_POST": return {
            ...state,
            mypost: action.payload
        }
        default: return state
    }
}

export default myPostReducer