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
import NumberPhoneInput from '../../components/NumberPhoneInput';
import DialogChangNumberPhone from '../../components/DialogChangNumberPhone';
// import liff from '@line/liff';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';

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

function SettingView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const parsed = queryString.parse(window.location.search);
    const user = useSelector(state => state.user);
    const control = useSelector(state => state.control);

    function openDialog() {
        dispatch({ type: "CONTROL_OPEN_DIALOG_CHANG_NUMBER_PHONE", payload: !control.openDialogChangNumber })
    }
    const appRef = fireStore.collection("line_apps");

    async function Update() {
        await appRef.doc(parsed.liff_id).collection("users").doc(user.userId).update({
            userId: user.userId,
            displayName: user.displayName,
            pictureUrl: user.pictureUrl,
            numberPhone: user.numberPhone
        }).then(function () {
            dispatch({ type: "AUTH_STATUS", payload: true })
            dispatch({ type: "CONTROL_OPEN_SNACKBARK_UPDATE_NUMBER_PHONE_SECCUSS", payload: !control.openSnackbarUpdateNumberSeccuss })
            // liff.init({ liffId: `${parsed.liff_id}` }).then(async () => {
            //     await liff.init().closeWindow()

            // }).catch(err => { throw err });


        });

    }

    function handleClose() {
        dispatch({ type: "CONTROL_OPEN_SNACKBARK_UPDATE_NUMBER_PHONE_SECCUSS", payload: !control.openSnackbarUpdateNumberSeccuss })
    }

    React.useEffect(() => {
        dispatch({ type: "AUTH_FIST_PATH", payload: window.location.pathname })
        dispatch({ type: "AUTH_LIFF_ID", payload: parsed.liff_id })
    }, [window.location.pathname])
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.app}
            >
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className={classes.layout}
                                style={{
                                    paddingTop: 20
                                }}
                            >
                                <Avatar alt={user.displayName} src={user.pictureUrl} className={classes.avatars} />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className={classes.layout}
                            >
                                <Typography variant="h6" component="h6">
                                    {user.displayName}
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className={classes.layout}
                                style={{
                                    paddingTop: 20
                                }}
                            >
                                <label htmlFor="phone">{"หมายเลขโทรศัพท์ที่ลงทะเบียน:"}</label>
                                <NumberPhoneInput type="tel" id="phone" name="phone" pattern="[0-9]{3} [0-9]{2} [0-9]{3} [0-9]{4}" placeholder="+66 80 123 1234" value={user.numberPhone} onClick={openDialog}></NumberPhoneInput>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}></Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={Update}>
                    {"เปลี่ยนหมายเลขโทรศัพท์"}
                </Button>
            </AppBar>
            <DialogChangNumberPhone></DialogChangNumberPhone>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={control.openSnackbarUpdateNumberSeccuss}
                onClose={handleClose}
                style={{ backgroundColor: 'white' }}
                ContentProps={{ style: { backgroundColor: 'white',
                boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 0%), 0px 6px 10px 0px rgb(0 0 0 / 0%), 0px 1px 18px 0px rgb(0 0 0 / 0%)' } }}
                TransitionComponent={TransitionDown}
                autoHideDuration={6000}
                message={<Alert onClose={handleClose} severity="success">
                    {`บันทึกหมายเลขโทรศัพท์ ${user.numberPhone}`}
                </Alert>}
                key={"top" + "center"}
            >

            </Snackbar>
        </div>
    )
};

export default SettingView;