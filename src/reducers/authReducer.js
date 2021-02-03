//Reducer for character information Initialize State
const initState = {
    status: false
}

//Define Actions
const authReducer = (state = initState, action) => {
    switch (action.type) {
        //Change character name
        case 'AUTH_STATUS':
            return {
                ...state,
                status: action.payload
            }
        case 'AUTH_LIFF_ID':
            return {
                ...state,
                liff_id: action.payload
            }
        case 'AUTH_FIST_PATH':
            return {
                ...state,
                fistPath: action.payload
            }
        default:
            return state
    }
}

export default authReducer;