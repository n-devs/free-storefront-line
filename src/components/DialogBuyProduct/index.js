import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import NumberPhoneInput from '../NumberPhoneInput';
import Snackbar from '@material-ui/core/Snackbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import { fireStore } from '../../firebase.config'
import queryString from "query-string";
import Avatar from '@material-ui/core/Avatar';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ListSubheader from '@material-ui/core/ListSubheader';

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
    input: {
        display: 'none',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



function DialogBuyProduct() {
    const order = useSelector(state => state.order)
    const control = useSelector(state => state.control)
    const user = useSelector(state => state.user)
    const classes = useStyles();
    const dispatch = useDispatch();
    const appRef = fireStore.collection("line_apps");
    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_SUM_ORDER", payload: !control.openDialogSumOrder })
    };

    async function Buy() {
        const orderRef = appRef.doc(sessionStorage.getItem("liff_id")).collection("orders").doc();
        await orderRef.set({
            id: orderRef.id,
            product: order.storage,
            user: user,
            address: order.address
        }).then(function () {


            dispatch({ type: "CONTROL_OPEN_DIALOG_SUM_ORDER", payload: !control.openDialogSumOrder })
            dispatch({ type: "ORDER_ADDRESS", payload: null })
            dispatch({ type: "ORDER_STORAGE", payload: [] })




        });

    }

    function amount(item) {
        return parseInt(item.price);
    }

    function sum(prev, next) {
        return prev + next;
    }
    React.useEffect(() => {
        console.log(order.storage.length);

    })


    return (

        <Dialog fullScreen open={control.openDialogSumOrder} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        {"สรุปยอดสินค้า"}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{
                paddingBottom: 150
            }}>
                {order.storage.map((data, key) => (
                    <React.Fragment key={key}>

                        <ListItem alignItems="flex-start">
                            <Divider></Divider>

                            <ListItem  >
                                <ListItemText
                                    primary={key + 1}

                                />
                            </ListItem>
                            <ListItem  >
                                <ListItemText
                                    primary={data.name}

                                />
                            </ListItem>
                            <ListItem  >
                                <ListItemText
                                    primary={data.price + " บาท"}

                                />
                            </ListItem>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
                <ListItem alignItems="flex-start">
                    <ListItem  >
                        <ListItemText
                            primary={"รวม"}

                        />
                    </ListItem>
                    <ListItem  >
                        <ListItemText
                            primary={order.storage.length === 0 ? 0 : order.storage.map(amount).reduce(sum) + " บาท"}

                        />
                    </ListItem>
                </ListItem>
                <Divider />
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
                    {order.address ? (<ListItem button >
                        <ListItemText
                            primary={order.address.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {order.address.numberPhone}
                                    </Typography>
                                    {" — " + order.address.address}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    ) : (<React.Fragment></React.Fragment>)}

                </List>
            </div>
            <AppBar position="fixed" color="primary" className={classes.appBarBottom}>
                <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={Buy}>
                    {"สั่งเลย"}
                </Button>
            </AppBar>
        </Dialog>
    );
}

export default DialogBuyProduct