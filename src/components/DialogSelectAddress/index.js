import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
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
// import InputBase from '@material-ui/core/InputBase';
import { fireStore } from '../../firebase.config'
// import queryString from "query-string";
import ListSubheader from '@material-ui/core/ListSubheader';
// import DialogBuyProduct from '../DialogBuyProduct'

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

export default function DialogSelectAddress() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const control = useSelector(state => state.control);
    const address = useSelector(state => state.address);
    const user = useSelector(state => state.user);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const appRef = fireStore.collection("line_apps");

    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_SELECT_ADDRESS", payload: !control.openDialogSelectAddress })
    };


    async function Next() {
        dispatch({ type: "CONTROL_OPEN_DIALOG_SUM_ORDER", payload: true })
        dispatch({ type: "CONTROL_OPEN_DIALOG_SELECT_ADDRESS", payload: false })
    }

    const handleListItemClick = (event, index, data) => {
        setSelectedIndex(index);
        dispatch({ type: "ORDER_ADDRESS", payload: data })
        console.log(index, data);
    };

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

        <Dialog fullScreen open={control.openDialogSelectAddress} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        {"เลือกที่อยู่จัดส่ง"}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

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
                        <ListItem selected={selectedIndex === key} button onClick={(event) => handleListItemClick(event, key, data)}>
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

            <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={Next}>
                    {"เลือกที่จัดส่ง"}
                </Button>
            </AppBar>
       
        </Dialog>
    );
}
