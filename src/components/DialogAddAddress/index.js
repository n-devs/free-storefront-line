import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Grid from '@material-ui/core/Grid';
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
// import queryString from "query-string";

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

export default function DialogAddAddress() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const control = useSelector(state => state.control);
    const address = useSelector(state => state.address);
    const user = useSelector(state => state.user);
    const appRef = fireStore.collection("line_apps");
    // const parsed = queryString.parse(window.location.search);

    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_ADD_ADDRESS", payload: !control.openDialogAddAddress })
    };

    const handleChange = (prop) => (event) => {
        switch (prop) {
            case "name":
                dispatch({ type: "ADDRESS_ADD_NAME", payload: event.target.value })
                break;
            case "numberPhone":
                dispatch({ type: "ADDRESS_ADD_NUMBER_PHONE", payload: event.target.value })
                break;
            case "address":
                dispatch({ type: "ADDRESS_ADD_ADDRESS", payload: event.target.value })
                break;
            default:
                break;
        }

    };

    async function Add() {
        const arr = address.storage;



        const addressRef = appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(user.userId).collection("address").doc();
        await addressRef.set({
            id: addressRef.id,
            name: address.addName,
            numberPhone: address.addNumbeerPhone,
            address: address.addAddress
        }).then(function () {
            arr.push({
                id: addressRef.id,
                name: address.addName,
                numberPhone: address.addNumbeerPhone,
                address: address.addAddress
            })

            dispatch({ type: "ADDRESS_STORAGE", payload: arr });
            dispatch({ type: "CONTROL_OPEN_DIALOG_ADD_ADDRESS", payload: !control.openDialogAddAddress })




        });
    }

    return (

        <Dialog fullScreen open={control.openDialogAddAddress} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        {"เพิ่มที่อยู่จัดส่ง"}
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
                <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={Add}>
                    {"บันทึก"}
                </Button>
            </AppBar>
        </Dialog>
    );
}
