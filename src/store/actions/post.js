export const postGet = (post) => {
    return dispatch => {
        dispatch({ type: "ALL_POST", payload: post })
    }
}
