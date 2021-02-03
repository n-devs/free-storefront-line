//Reducer for character information Initialize State
const initState = {
    storage: [],
    length:0
}

//Define Actions
const Reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ORDER_STORAGE':
            return {
                ...state,
                storage: action.payload
            }
        case 'ORDER_LENGTH':
            console.log(action.payload);
            return {
                ...state,
                length: action.payload
            }
            case 'ORDER_ADDRESS':
            console.log(action.payload);
            return {
                ...state,
                address: action.payload
            }
        default:
            return state
    }
}

export default Reducer;