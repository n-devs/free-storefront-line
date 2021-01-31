//Reducer for character information Initialize State
const initState = {
    addName: "",
    addProductId: "",
    addId: "",
    addPrice: 0,
    addImage: "",
    updateName: "",
    updateProductId: "",
    updateId: "",
    updatePrice: 0,
    updateImage: "",
    updateNumber: 0,
    storage: []
}

//Define Actions
const productReducer = (state = initState, action) => {
    switch (action.type) {
        //Change character name
        case 'PRODUCT_ADD_NAME':
            return {
                ...state,
                addName: action.payload
            }

        case 'PRODUCT_ADD_PRUDUCT_ID':
            return {
                ...state,
                addProductId: action.payload
            }
        case 'PRODUCT_ADD_ID':
            return {
                ...state,
                addId: action.payload
            }
        case 'PRODUCT_ADD_PRICE':
            return {
                ...state,
                addPrice: action.payload
            }
        case 'PRODUCT_ADD_IMAGE':
            return {
                ...state,
                addImage: action.payload
            }
        case 'PRODUCT_UPDATE_NAME':
            return {
                ...state,
                updateName: action.payload
            }

        case 'PRODUCT_UPDATE_PRUDUCT_ID':
            return {
                ...state,
                updateProductId: action.payload
            }
        case 'PRODUCT_UPDATE_ID':
            return {
                ...state,
                updateId: action.payload
            }
        case 'PRODUCT_UPDATE_PRICE':
            return {
                ...state,
                updatePrice: action.payload
            }
        case 'PRODUCT_UPDATE_IMAGE':
            return {
                ...state,
                updateImage: action.payload
            }
        case 'PRODUCT_UPDATE_NUMBER':
            return {
                ...state,
                updateNumber: action.payload
            }
        case 'PRODUCT_STORAGE':
            return {
                ...state,
                storage: action.payload
            }
        default:
            return state
    }
}

export default productReducer;