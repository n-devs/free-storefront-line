const initState = {
  openDialogChangNumber: false,
  openSnackbarUpdateNumberSeccuss: false,
  openDialogAddAddress: false,
  openDialogUpdateAddress: false,
  openDialogDeleteAddress: false,
  openDialogUpdateProduct: false,
  openDialogAddProduct: false,
  openDialogDeleteProduct: false,
  openDialogListOrder: false,
  openDialogSelectAddress: false,
  openDialogSumOrder: false,
}

const controlReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CONTROL_OPEN_DIALOG_CHANG_NUMBER_PHONE':
      return {
        ...state,
        openDialogChangNumber: action.payload
      }
    case 'CONTROL_OPEN_SNACKBARK_UPDATE_NUMBER_PHONE_SECCUSS':
      return {
        ...state,
        openSnackbarUpdateNumberSeccuss: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_ADD_ADDRESS':
      return {
        ...state,
        openDialogAddAddress: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_ADD_PRODUCT':
      return {
        ...state,
        openDialogAddProduct: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_UPDATE_ADDRESS':
      return {
        ...state,
        openDialogUpdateAddress: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_UPDATE_PRODUCT':
      return {
        ...state,
        openDialogUpdateProduct: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_DELETE_ADDRESS':
      return {
        ...state,
        openDialogDeleteAddress: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_DELETE_PRODUCT':
      return {
        ...state,
        openDialogDeleteProduct: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_LIST_ORDER':
      return {
        ...state,
        openDialogListOrder: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_SELECT_ADDRESS':
      return {
        ...state,
        openDialogSelectAddress: action.payload
      }
    case 'CONTROL_OPEN_DIALOG_SUM_ORDER':
      return {
        ...state,
        openDialogSumOrder: action.payload
      }
    default:
      return state
  }
}

export default controlReducer;