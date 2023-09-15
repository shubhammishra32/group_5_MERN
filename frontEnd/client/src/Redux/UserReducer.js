
const initialState = {
    searchText: ''
}


const UserReducer=(state=initialState, action)=>{

    switch(action.type){
        case 'saveText':
            return{
                ...state,
                searchText : action.value 
            }        
        default:
            return state
    }

}
export default UserReducer