export const fetchUser = () => {
    return function (dispatch) {
        //dispatch({ type: FETCH_USERS_REQUEST }); // loading
        return fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((body) => {
                        dispatch({
                            type: FETCH_USERS_REQUEST_SUCCESS,
                            body: body
                        })
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_USERS_REQUEST_FAILURE,
                    error: error.message
                })
            })
    }
}