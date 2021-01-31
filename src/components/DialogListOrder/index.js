import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from "react-redux";
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

export default function DialogListOrder() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const control = useSelector(state => state.control);
    const order = useSelector(state => state.order);

    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_LIST_ORDER", payload: !control.openDialogListOrder })
    };


    const DeleteItem = (prop, key) => (event) => {
        console.log(prop, key);
        delete order.storage[key];
        dispatch({ type: "ORDER_STORAGE", payload: order.storage })
        dispatch({ type: "ORDER_LENGTH", payload: order.storage.length }) 
        console.log(order.length);
    }

    return (

        <Dialog fullScreen open={control.openDialogListOrder} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        {"ตระกร้า"}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {order.storage.map((data, key) => (
                <React.Fragment key={key}>

                    <ListItem alignItems="flex-start">
                        <Divider></Divider>
                        <ListItemAvatar>
                            <Avatar variant="rounded" alt="Remy Sharp" src={data.image} style={{
                                width: 65,
                                height: 65
                            }} />
                        </ListItemAvatar>
                        <ListItem button >
                            <ListItemText
                                primary={data.productId}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {data.name}
                                        </Typography>
                                        {" — " + data.price}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <IconButton aria-label="delete" onClick={DeleteItem(data, key)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </Dialog>
    );
}
