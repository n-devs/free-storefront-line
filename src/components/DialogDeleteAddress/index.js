import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from "react-redux";
import { fireStore } from "../../firebase.config"

export default function DialogDeleteAddress() {
    const address = useSelector(state => state.address);
    const control = useSelector(state => state.control);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const appRef = fireStore.collection("line_apps");
    

    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_DELETE_ADDRESS", payload: !control.openDialogDeleteAddress })
    };

    async function Delete() {
        const addressRef = appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(user.userId).collection("address").doc(address.updateId);
        await addressRef.delete()
        delete address.storage[address.updateNumber]
        dispatch({ type: "ADDRESS_STORAGE", payload: address.storage });
        dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_ADDRESS", payload: !control.openDialogUpdateAddress })
        dispatch({ type: "CONTROL_OPEN_DIALOG_DELETE_ADDRESS", payload: !control.openDialogDeleteAddress })
    }

    return (
        <div>
            <Dialog
                open={control.openDialogDeleteAddress}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"คุณต้องการจะลบที่อยู่จัดส่งนี้!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ListItem>
                            <ListItemText
                                primary={address.updateName}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {address.updateNumberPhone}
                                        </Typography>
                                        {" — " + address.updateAddress}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {"ยกเลิก"}
                    </Button>
                    <Button onClick={Delete} color="primary" autoFocus >
                        {"ยืนยัน"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
