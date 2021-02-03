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
import DialogDeleteProduct from "../DialogDeleteProduct";
import Avatar from '@material-ui/core/Avatar';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

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

export default function DialogUpdateProduct() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const control = useSelector(state => state.control);
    const product = useSelector(state => state.product);
    const user = useSelector(state => state.user);

    const appRef = fireStore.collection("line_apps");

    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_PRODUCT", payload: !control.openDialogUpdateProduct })
    };

    const handleChange = (prop) => (event) => {
        switch (prop) {
            case "name":
                dispatch({ type: "PRODUCT_UPDATE_NAME", payload: event.target.value })
                break;
            case "price":
                dispatch({ type: "PRODUCT_UPDATE_PRICE", payload: event.target.value })
                break;
            case "image":
                // console.log(event.target.files[0]);
                var reader = new FileReader();
                var baseString;
                reader.onloadend = function () {
                    baseString = reader.result;
                    console.log(baseString);
                    dispatch({ type: "PRODUCT_UPDATE_IMAGE", payload: baseString })
                };
                reader.readAsDataURL(event.target.files[0]);

                break;
            case "productId":
                dispatch({ type: "PRODUCT_UPDATE_PRUDUCT_ID", payload: event.target.value })
                break;
            default:
                break;
        }

    };

    async function Add() {
        const productRef = appRef.doc(sessionStorage.getItem("liff_id")).collection("users").doc(user.userId).collection("products").doc(product.updateId);
        await productRef.set({
            id: product.updateId,
            name: product.updateName,
            productId: product.updateProductId,
            price: product.updatePrice,
            image: product.updateImage
        }).then(function () {
            product.storage[product.updateNumber].name = product.updateName;
            product.storage[product.updateNumber].productId = product.updateProductId;
            product.storage[product.updateNumber].price = product.updatePrice;
            product.storage[product.updateNumber].image = product.updateImage;
            dispatch({ type: "PRODUCT_STORAGE", payload: product.storage });
            dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_PRODUCT", payload: !control.openDialogUpdateProduct })

        });
    }

    function Delete() {
        dispatch({ type: "CONTROL_OPEN_DIALOG_DELETE_PRODUCT", payload: !control.openDialogDeleteProduct })
    }

    return (

        <Dialog fullScreen open={control.openDialogUpdateProduct} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        {"แก้ไขสินค้า"}
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
                            {"รหัสสินค้า"}
                        </Typography>}
                        secondary={
                            <React.Fragment>
                                <InputBase
                                    defaultValue={product.updateProductId}
                                    placeholder="โปรดกรอกรหัสสินค้า"
                                    style={{ width: '100%' }}
                                    onChange={handleChange("productId")}></InputBase>
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
                            {"ชื่อสินค้า"}
                        </Typography>}
                        secondary={
                            <React.Fragment>
                                <InputBase
                                    defaultValue={product.updateName}
                                    placeholder="โปรดกรอกชื่อสินค้า"
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
                            {"ราคาสินค้า"}
                        </Typography>}
                        secondary={
                            <React.Fragment>
                                <InputBase
                                    defaultValue={product.updatePrice}
                                    placeholder="โปรดกรอกราคาสินค้า"
                                    style={{ width: '100%' }}
                                    onChange={handleChange("price")}></InputBase>
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
                            {"รูปสินค้า"}
                        </Typography>}
                        secondary={
                            <React.Fragment>
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange("image")} />
                                <label htmlFor="icon-button-file">
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Avatar variant="rounded" alt="+" style={{ width: 150, height: 150 }} >
                                            {product.updateImage ? (<React.Fragment>
                                                <Avatar variant="rounded" alt="+" src={product.updateImage} style={{ width: 150, height: 150 }} />
                                            </React.Fragment>) : (<React.Fragment>
                                                <ImageSearchIcon style={{
                                                    fontSize: 80
                                                }}></ImageSearchIcon>
                                            </React.Fragment>)}

                                        </Avatar>
                                    </Grid>
                                </label>
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
            <DialogDeleteProduct></DialogDeleteProduct>
        </Dialog>
    );
}
