import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from "react-redux";
// import NumberPhoneInput from '../NumberPhoneInput';
// import Snackbar from '@material-ui/core/Snackbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { fireStore } from '../../firebase.config'
import DialogDeleteAddress from "../DialogDeleteAddress";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "#7d8690",
    },
    appBarBottom: {
        top: 'auto',
        bottom: 0,
        backgroundColor: 'white',
        padding: 15,
    },
    title: {
        // marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogUpdateAddress() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const control = useSelector(state => state.control);
    const address = useSelector(state => state.address);
    const user = useSelector(state => state.user);

    const appRef = fireStore.collection("line_apps");

    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_ADDRESS", payload: !control.openDialogUpdateAddress })
    };

    const handleChange = (prop) => (event) => {
        switch (prop) {
            case "name":
                dispatch({ type: "ADDRESS_UPDATE_NAME", payload: event.target.value })
                break;
            case "numberPhone":
                dispatch({ type: "ADDRESS_UPDATE_NUMBER_PHONE", payload: event.target.value })
                break;
            case "address":
                dispatch({ type: "ADDRESS_UPDATE_ADDRESS", payload: event.target.value })
                break;
            default:
                break;
        }

    };

    async function Add() {
        const addressRef = appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(user.userId).collection("address").doc(address.updateId);
        await addressRef.set({
            id: address.updateId,
            name: address.updateName,
            numberPhone: address.updateNumberPhone,
            address: address.updateAddress
        }).then(function () {
            address.storage[address.updateNumber].name = address.updateName;
            address.storage[address.updateNumber].numberPhone = address.updateNumberPhone;
            address.storage[address.updateNumber].address = address.updateAddress;
            dispatch({ type: "ADDRESS_STORAGE", payload: address.storage });
            dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_ADDRESS", payload: !control.openDialogUpdateAddress })

        });
    }

    function Delete() {
        dispatch({ type: "CONTROL_OPEN_DIALOG_DELETE_ADDRESS", payload: !control.openDialogDeleteAddress })
    }

    return (

        <Dialog fullScreen open={control.openDialogUpdateAddress} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        {"แก้ไขที่อยู่จัดส่ง"}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <React.Fragment>
                <ListItem button>
                    <ListItemText
                        primary={<Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                        >
                            {"ผู้รับ"}
                        </Typography>}
                        secondary={
                            <React.Fragment>
                                <InputBase
                                    defaultValue={address.updateName}
                                    placeholder="โปรดกรอกชื่อผู้รับ"
                                    style={{ width: '100%' }}
                                    onChange={handleChange("name")}></InputBase>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider></Divider>
            </React.Fragment>
            <React.Fragment>
                <ListItem button>
                    <ListItemText
                        primary={<Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                        >
                            {"หมายเลขโทรศัพท์มือถือ"}
                        </Typography>}
                        secondary={
                            <React.Fragment>
                                <InputBase
                                    defaultValue={address.updateNumberPhone}
                                    placeholder="โปรดกรอกหมายเลขโทรศัพท์มือถือผู้รับ"
                                    style={{ width: '100%' }}
                                    onChange={handleChange("numberPhone")}></InputBase>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider></Divider>
            </React.Fragment>
            <React.Fragment>
                <ListItem button>
                    <ListItemText
                        primary={<Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                        >
                            {"ที่อยู่จัดส่ง"}
                        </Typography>}
                        secondary={
                            <React.Fragment>
                                <InputBase
                                    rows={4}
                                    defaultValue={address.updateAddress}
                                    multiline
                                    placeholder="โปรดกรอกรายละเอียดที่อยู่ เช่นบ้านเลขที่ หมู่บ้าน ถนน เขต ตำบล อำเภอ จังหวัด รหัสไปรษณีย์ "
                                    style={{ width: '100%' }}
                                    onChange={handleChange("address")}></InputBase>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider></Divider>
            </React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={8}>
                        <Button
                            variant="contained"
                            style={{
                                fontSize: '1em',
                                backgroundColor: "#00b900",
                                color: "#fff",
                                fontWeight: "bold",
                                width: '100%'
                            }} onClick={Add}>
                            {"บันทึก"}
                        </Button>
                    </Grid>
                    <Grid item xs={4} >
                        <Button
                            variant="contained"
                            style={{
                                fontSize: '1em',
                                backgroundColor: "#f44336",
                                color: "#fff",
                                fontWeight: "bold",
                                width: '100%'
                            }} onClick={Delete}>
                            {"ลบ"}
                        </Button>
                    </Grid>
                </Grid>
            </AppBar>
            <DialogDeleteAddress></DialogDeleteAddress>
        </Dialog>
    );
}
