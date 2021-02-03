import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from "react-redux";
import { fireStore } from '../../firebase.config';
import queryString from "query-string";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import DialogAddAddress from '../../components/DialogAddAddress'
import DialogUpdateAddress from '../../components/DialogUpdateAddress'

const useStyles = makeStyles((theme) => ({
    avatars: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: 'white',
        padding: 15,
    },
    layout: {
        padding: "10px 0px"
    },
    app: {
        height: 450
    }
}));

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddressView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const parsed = queryString.parse(window.location.search);
    const user = useSelector(state => state.user);
    const address = useSelector(state => state.address);
    const control = useSelector(state => state.control);

    function openDialogAddAddress() {
        dispatch({ type: "CONTROL_OPEN_DIALOG_ADD_ADDRESS", payload: !control.openDialogAddAddress })
    }
    const appRef = fireStore.collection("line_apps");

    const openDialogUpdateAddress = (prop, number) => (event) => {
        console.log(prop,number);
        dispatch({ type: "ADDRESS_UPDATE_NUMBER", payload: number })
        dispatch({ type: "ADDRESS_UPDATE_ID", payload: prop.id })
        dispatch({ type: "ADDRESS_UPDATE_NAME", payload: prop.name })
        dispatch({ type: "ADDRESS_UPDATE_NUMBER_PHONE", payload: prop.numberPhone })
        dispatch({ type: "ADDRESS_UPDATE_ADDRESS", payload: prop.address })
        dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_ADDRESS", payload: !control.openDialogUpdateAddress })
    }

    function handleClose() {
        dispatch({ type: "CONTROL_OPEN_SNACKBARK_UPDATE_NUMBER_PHONE_SECCUSS", payload: !control.openSnackbarUpdateNumberSeccuss })
    }

    React.useEffect(() => {
        const data = [];
        appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(user.userId).collection("address").get().then(snapshot => {
            snapshot.docs.forEach(hospital => {
                data.push(hospital.data())
            });
            dispatch({ type: "ADDRESS_STORAGE", payload: data })
            dispatch({ type: "AUTH_FIST_PATH", payload: sessionStorage.getItem("fist_path") })
            dispatch({ type: "AUTH_LIFF_ID", payload: sessionStorage.getItem("liff_id") })
        })
    }, [])

    return (
        <div style={{ paddingBottom: 70 }}>

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" style={{ backgroundColor: "white" }}>
                        {"ที่อยู่จัดส่ง"}
                    </ListSubheader>
                }
                className={classes.root}
            >
                {address.storage.map((data, key) => (
                    <React.Fragment key={key}>
                        <Divider></Divider>
                        <ListItem button onClick={openDialogUpdateAddress(data, key)}>
                            <ListItemText
                                primary={data.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {data.numberPhone}
                                        </Typography>
                                        {" — " + data.address}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </React.Fragment>
                ))}

            </List>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={openDialogAddAddress}>
                    {"เพิ่มที่อยู่จัดส่ง"}
                </Button>
            </AppBar>
            <DialogAddAddress></DialogAddAddress>
            <DialogUpdateAddress></DialogUpdateAddress>
           
        </div>
    )
};

export default AddressView;