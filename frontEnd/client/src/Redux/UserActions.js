export const saveText = (text) => {
    return function (dispatch) {
        dispatch({ type: 'saveText', value:text }); // loading
        
    }
}