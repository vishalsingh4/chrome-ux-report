import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 12
    },
    success: {
        backgroundColor: theme.palette.success.light,
        height: 'inherit'
    },
    warning: {
        backgroundColor: theme.palette.warning.light,
        height: 'inherit'
    },
    danger: {
        backgroundColor: theme.palette.error.light,
        height: 'inherit'
    }
}));

export default useStyles;