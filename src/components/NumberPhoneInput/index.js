import {
    // fade,
    withStyles
} from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';

const NumberPhoneInput = withStyles((theme) => ({
    // root: {
    //     'label + &': {
    //         marginTop: theme.spacing(3),
    //     },
    // },
    input: {
        color: '#00b900',
        fontWeight: 'bold',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        //   border: '1px solid #ced4da',
        textAlign: 'center',
        fontSize: 30,
        width: 'auto',
        padding: '10px 12px',
        //   transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Roboto','Meiryo','-apple-system','system-ui','BlinkMacSystemFont','Segoe UI','Helvetica Neue','Segoe UI Emoji','Segoe UI Symbol','Apple Color Emoji','Noto Color Emoji','Noto Emoji','sans-serif','Arial',
        ].join(','),
        //   '&:focus': {
        //     boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        //     borderColor: theme.palette.primary.main,
        //   },
    },
}))(InputBase);

export default NumberPhoneInput