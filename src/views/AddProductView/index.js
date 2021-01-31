import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from "react-redux";
import { fireStore } from '../../firebase.config';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider';
import DialogAddProduct from '../../components/DialogAddProduct'
import DialogUpdateProduct from '../../components/DialogUpdateProduct'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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

// function TransitionDown(props) {
//     return <Slide {...props} direction="down" />;
// }

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

function AddProductView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    // const parsed = queryString.parse(window.location.search);
    const user = useSelector(state => state.user);
    const product = useSelector(state => state.product);
    const control = useSelector(state => state.control);

    function openDialogAddProduct() {
        dispatch({ type: "CONTROL_OPEN_DIALOG_ADD_PRODUCT", payload: !control.openDialogAddProduct })
    }
    const appRef = fireStore.collection("line_apps");

    const openDialogUpdateProduct = (prop, number) => (event) => {
        console.log(prop, number);
        dispatch({ type: "PRODUCT_UPDATE_NUMBER", payload: number })
        dispatch({ type: "PRODUCT_UPDATE_ID", payload: prop.id })
        dispatch({ type: "PRODUCT_UPDATE_NAME", payload: prop.name })
        dispatch({ type: "PRODUCT_UPDATE_PRUDUCT_ID", payload: prop.productId })
        dispatch({ type: "PRODUCT_UPDATE_PRICE", payload: prop.price })
        dispatch({ type: "PRODUCT_UPDATE_IMAGE", payload: prop.image })
        dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_PRODUCT", payload: !control.openDialogUpdateProduct })
    }

    React.useEffect(() => {
        const data = [];
        appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(user.userId).collection("products").get().then(snapshot => {
            snapshot.docs.forEach(hospital => {
                data.push(hospital.data())
            });
            dispatch({ type: "PRODUCT_STORAGE", payload: data })
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
                        {"สินค้า"}
                    </ListSubheader>
                }
                className={classes.root}
            >
                {product.storage.map((data, key) => (
                    <React.Fragment key={key}>

                        <ListItem alignItems="flex-start">
                            <Divider></Divider>
                            <ListItemAvatar>
                                <Avatar variant="rounded" alt="Remy Sharp" src={data.image} style={{
                                    width: 65,
                                    height: 65
                                }} />
                            </ListItemAvatar>
                            <ListItem button onClick={openDialogUpdateProduct(data, key)}>
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
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}

            </List>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={openDialogAddProduct}>
                    {"เพิ่มสินค้า"}
                </Button>
            </AppBar>
            <DialogAddProduct></DialogAddProduct>
            <DialogUpdateProduct></DialogUpdateProduct>
        </div>
    )
};

export default AddProductView;