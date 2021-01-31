//Reducer for character information Initialize State
const initState = {
    userId:"",
    displayName: "",
    pictureUrl: "",
    numberPhone: ""
}

//Define Actions
const userReducer = (state = initState, action) => {
    switch (action.type) {
        //Change character name
        case 'USER_DISPLAY_NAME':
            return {
                ...state,
                displayName: action.payload
            }

        case 'USER_ID':
            return {
                ...state,
                userId: action.payload
            }
        case 'USER_PICTURE_URL':
            return {
                ...state,
                pictureUrl: action.payload
            }
        case 'USER_NUMBER_PHONE':
            return {
                ...state,
                numberPhone: action.payload
            }
        default:
            return state
    }
}

export default userReducer;