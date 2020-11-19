export const myPostGet = (mypost) => {
    return dispatch => {
        dispatch({ type: "MY_POST", payload: mypost })
    }
}