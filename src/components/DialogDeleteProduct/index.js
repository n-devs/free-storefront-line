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
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

export default function DialogDeleteProduct() {
    const product = useSelector(state => state.product);
    const control = useSelector(state => state.control);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const appRef = fireStore.collection("line_apps");


    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_DELETE_PRODUCT", payload: !control.openDialogDeleteProduct })
    };

    async function Delete() {
        const productRef = appRef.doc(sessionStorage.getItem("liff_id")).collection("products").doc(product.updateId);
        await productRef.delete()
        delete product.storage[product.updateNumber]
        dispatch({ type: "PRODUCT_STORAGE", payload: product.storage });
        dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_PRODUCT", payload: !control.openDialogUpdateProduct })
        dispatch({ type: "CONTROL_OPEN_DIALOG_DELETE_PRODUCT", payload: !control.openDialogDeleteProduct })
    }

    return (
        <div>
            <Dialog
                open={control.openDialogDeleteProduct}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"คุณต้องการจะลบสินค้านี้!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar variant="rounded" alt="Remy Sharp" src={product.updateImage} style={{
                                    width: 65,
                                    height: 65
                                }} />
                            </ListItemAvatar>
                            <ListItem >
                                <ListItemText
                                    primary={product.updateProductId}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {product.updateName}
                                            </Typography>
                                            {" — " + product.updatePrice}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
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
