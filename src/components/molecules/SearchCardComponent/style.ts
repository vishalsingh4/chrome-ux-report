import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(4, 0)
    },
    grid_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submit_btn: {
        margin: '0 12px'
    }
}));

export default useStyles;