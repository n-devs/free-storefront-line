//Reducer for character information Initialize State
const initState = {
    addName: "",
    addNumbeerPhone: "",
    addAddress: "",
    updateNumber: 0,
    updateId: "",
    updateName: "",
    updateNumberPhone: "",
    updateAddress: "",
    storage: []
}

//Define Actions
const addressReducer = (state = initState, action) => {
    switch (action.type) {
        //Change character name
        case 'ADDRESS_ADD_NAME':
            return {
                ...state,
                addName: action.payload
            }

        case 'ADDRESS_ADD_NUMBER_PHONE':
            return {
                ...state,
                addNumbeerPhone: action.payload
            }
        case 'ADDRESS_ADD_ADDRESS':
            return {
                ...state,
                addAddress: action.payload
            }
        case 'ADDRESS_UPDATE_NAME':
            return {
                ...state,
                updateName: action.payload
            }
        case 'ADDRESS_UPDATE_NUMBER_PHONE':
            return {
                ...state,
                updateNumberPhone: action.payload
            }
        case 'ADDRESS_UPDATE_ADDRESS':
            return {
                ...state,
                updateAddress: action.payload
            }
        case 'ADDRESS_UPDATE_NUMBER':
            return {
                ...state,
                updateNumber: action.payload
            }
        case 'ADDRESS_UPDATE_ID':
            return {
                ...state,
                updateId: action.payload
            }
        case 'ADDRESS_STORAGE':
            return {
                ...state,
                storage: action.payload
            }
        default:
            return state
    }
}

export default addressReducer;