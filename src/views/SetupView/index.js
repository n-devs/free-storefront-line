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
import { useHistory } from 'react-router-dom';
import liff from "@line/liff";
import Loading from '../../components/Loading';
import { Redirect } from 'react-router-dom'

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


function SetupView() {
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();
    const classes = useStyles();
    const parsed = queryString.parse(window.location.search);
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    // const [status,setStatus] = React.useState(false)
    const history = useHistory();
    const handleChange = (prop) => (event) => {
        dispatch({ type: "USER_NUMBER_PHONE", payload: event.target.value })
    };
    const appRef = fireStore.collection("line_apps");

    async function Update() {
        await appRef.doc(parsed.liff_id).collection("users").doc(user.userId).update({
            userId: user.userId,
            displayName: user.displayName,
            pictureUrl: user.pictureUrl,
            numberPhone: user.numberPhone
        }).then(function () {
            dispatch({ type: "AUTH_STATUS", payload: true });
            history.push(`${parsed.pathname}?liff_id=${parsed.liff_id}`)
        });

    }
    React.useEffect(() => {
        const appRef = fireStore.collection("line_apps");
        if (sessionStorage.getItem("liff_id")) {
            liff.init({ liffId: `${sessionStorage.getItem("liff_id")}` }).then(async () => {

                if (liff.isLoggedIn()) {
                    const getProfile = await liff.getProfile();
                    console.log(getProfile);

                    const userId = await appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(getProfile.userId).get();

                    if (!userId.exists) {
                        console.log("No such document!");
                        dispatch({ type: "AUTH_STATUS", payload: false })
                        dispatch({ type: "USER_DISPLAY_NAME", payload: getProfile.displayName });
                        dispatch({ type: "USER_ID", payload: getProfile.userId });
                        dispatch({ type: "USER_PICTURE_URL", payload: getProfile.pictureUrl });
                        await appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(getProfile.userId).set({ ...getProfile })

                    } else {
                       
                        console.log("getProfile line:", getProfile);
                        if (userId.data().numberPhone) {
                            console.log("Document data:", userId.data());
                            dispatch({ type: "AUTH_STATUS", payload: true })
                            dispatch({ type: "USER_DISPLAY_NAME", payload: userId.data().displayName });
                            dispatch({ type: "USER_ID", payload: userId.data().userId });
                            dispatch({ type: "USER_PICTURE_URL", payload: userId.data().pictureUrl });
                            dispatch({ type: "USER_NUMBER_PHONE", payload: userId.data().numberPhone })
                            setLoading(false)
                            // setStatus(auth.status)
                        } else {
                            dispatch({ type: "AUTH_STATUS", payload: false })
                            dispatch({ type: "USER_DISPLAY_NAME", payload: userId.data().displayName });
                            dispatch({ type: "USER_ID", payload: userId.data().userId });
                            dispatch({ type: "USER_PICTURE_URL", payload: userId.data().pictureUrl });
                            setLoading(false)
                        }
                    }
                } else {
                    dispatch({ type: "AUTH_FIST_PATH", payload: window.location.pathname })

                    liff.login({ redirectUri: `${window.location.href}` });
                    console.log("a");
                }

            }).catch(err => { throw err });
        } else {
            // setLoading(false)
            console.log("b");
            dispatch({ type: "AUTH_LIFF_ID", payload: parsed.liff_id })
        }
    }, [])

    return (
        <div>
            {loading ? (<React.Fragment>
                <Loading></Loading>
            </React.Fragment>) : (<React.Fragment>
                {auth.status ? (<React.Fragment>
                    <Redirect to={`${parsed.pathname}?liff_id=${parsed.liff_id}`}></Redirect>
                </React.Fragment>) : (<React.Fragment>
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
                                        <label htmlFor="phone">{"ลงทะเบียนหมายเลขโทรศัพท์:"}</label>
                                        <NumberPhoneInput type="tel" id="phone" name="phone" pattern="[0-9]{3} [0-9]{2} [0-9]{3} [0-9]{4}" placeholder="+66 80 123 1234" onChange={handleChange()}></NumberPhoneInput>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <AppBar position="fixed" color="primary" className={classes.appBar}>
                        <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={Update}>
                            {"เพิ่มหมายเลขโทรศัพท์"}
                        </Button>
                    </AppBar>
                </React.Fragment>)}

            </React.Fragment>)}

        </div>
    )
};

export default SetupView;