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
import NumberPhoneInput from '../NumberPhoneInput'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "#7d8690",
    },

    title: {
        // marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogChangNumberPhone() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const control = useSelector(state => state.control);
    const user = useSelector(state => state.user);
    const handleClose = () => {
        dispatch({ type: "CONTROL_OPEN_DIALOG_CHANG_NUMBER_PHONE", payload: !control.openDialogChangNumber })
    };

    const handleChange = (prop) => (event) => {
        dispatch({ type: "USER_NUMBER_PHONE", payload: event.target.value })
    };

    return (

        <Dialog fullScreen open={control.openDialogChangNumber} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        {"เปลี่ยนหมายเลขโทรศัพท์"}
                    </Typography>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List>
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
                    <NumberPhoneInput type="tel" id="phone" name="phone" pattern="[0-9]{3} [0-9]{2} [0-9]{3} [0-9]{4}" placeholder="+66 80 123 1234" defaultValue={user.numberPhone} onChange={handleChange()} style={{color:"#5b82db"}}></NumberPhoneInput>
                    <Button variant="contained" style={{ fontSize: '1em', backgroundColor: "#00b900", color: "#fff", fontWeight: "bold", width: 250 }} onClick={handleClose}>
                        {"บันทึก"}
                    </Button>
                </Grid>
            </List>
        </Dialog>
    );
}
