import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from "react-redux";
import { fireStore } from '../../firebase.config';
import ListSubheader from '@material-ui/core/ListSubheader';
// import DialogAddProduct from '../../components/DialogAddProduct'
// import DialogUpdateProduct from '../../components/DialogUpdateProduct'
import List from '@material-ui/core/List';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListItem from '@material-ui/core/ListItem';
// import { ButtonBase } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DialogListOrder from '../../components/DialogListOrder'
import DialogSelectAddress from '../../components/DialogSelectAddress'
import DialogBuyProduct from '../../components/DialogBuyProduct'

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);


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
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

// function TransitionDown(props) {
//     return <Slide {...props} direction="down" />;
// }

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

function ProductView() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [onLength, setLength] = React.useState(0)
    // const parsed = queryString.parse(window.location.search);
    const user = useSelector(state => state.user);
    const product = useSelector(state => state.product);
    const control = useSelector(state => state.control);
    const order = useSelector(state => state.order);

    function openDialogSelectAddress() {
        dispatch({ type: "CONTROL_OPEN_DIALOG_SELECT_ADDRESS", payload: !control.openDialogSelectAddress })
    }
    const appRef = fireStore.collection("line_apps");

    // const openDialogUpdateProduct = (prop, number) => (event) => {
    //     console.log(prop, number);
    //     dispatch({ type: "PRODUCT_UPDATE_NUMBER", payload: number })
    //     dispatch({ type: "PRODUCT_UPDATE_ID", payload: prop.id })
    //     dispatch({ type: "PRODUCT_UPDATE_NAME", payload: prop.name })
    //     dispatch({ type: "PRODUCT_UPDATE_PRUDUCT_ID", payload: prop.productId })
    //     dispatch({ type: "PRODUCT_UPDATE_PRICE", payload: prop.price })
    //     dispatch({ type: "PRODUCT_UPDATE_IMAGE", payload: prop.image })
    //     dispatch({ type: "CONTROL_OPEN_DIALOG_UPDATE_PRODUCT", payload: !control.openDialogUpdateProduct })
    // }

    const getOrder = (prop, key) => (event) => {
        order.storage.push(prop)
        dispatch({ type: "ORDER_STORAGE", payload: order.storage })
        dispatch({ type: "ORDER_LENGTH", payload: order.storage.length })
        setLength(order.storage.length)
    }

    const openDialogListOrder = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_LIST_ORDER", payload: !control.openDialogListOrder })
    };


    React.useEffect(() => {
        const data = [];
        appRef.doc(sessionStorage.getItem("liff_id")).collection("products").get().then(snapshot => {
            snapshot.docs.forEach(hospital => {
                data.push(hospital.data())
            });
            dispatch({ type: "PRODUCT_STORAGE", payload: data })
            dispatch({ type: "AUTH_FIST_PATH", payload: sessionStorage.getItem("fist_path") })
            dispatch({ type: "AUTH_LIFF_ID", payload: sessionStorage.getItem("liff_id") })
        })
        setLength(order.storage.length)
    }, [order.storage])

    return (
        <div style={{ paddingBottom: 70 }}>

            <List style={{ 
                backgroundColor: "white"
            }} component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div">{"สินค้า"} <IconButton style={{ float: 'right' }} aria-label="cart" onClick={openDialogListOrder}>
                        <StyledBadge badgeContent={order.length} color="secondary" >
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton></ListSubheader>
                }>
                {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">{"สินค้า"} <IconButton style={{ float: 'right' }} aria-label="cart" onClick={openDialogListOrder}>
                        <StyledBadge badgeContent={order.length} color="secondary" >
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton></ListSubheader>

                </GridListTile> */}
                <GridList className={classes.gridList}>
                    {product.storage.map((data, key) => (

                        <GridListTile key={key} component="a" onClick={getOrder(data, key)}>
                            {/* <div style={{
                            textAlign: 'end',
                            color: '#35b900',
                        }}>
                            <Typography variant="h6">{0}</Typography>
                        </div> */}

                            <img src={data.image} alt={data.name} />

                            <GridListTileBar
                                title={data.name}
                                subtitle={<span>id: {data.productId}</span>}
                                actionIcon={
                                    <Typography variant="h6" style={{ color: 'white' }}>{`${data.price} `}<span style={{ fontSize: 15 }}>บาท</span></Typography>
                                }
                            />
                        </GridListTile>

                    ))}
                </GridList>
            </List>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold" }} onClick={openDialogSelectAddress}>
                    {"ซื้อ"}
                </Button>
            </AppBar>
            <DialogListOrder></DialogListOrder>
            <DialogSelectAddress></DialogSelectAddress>
            <DialogBuyProduct></DialogBuyProduct>
        </div >
    )
};

export default ProductView;