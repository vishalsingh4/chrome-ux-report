import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 16,
        marginBottom: 16,
    },
    btn_group: {
        marginTop: 24
    },
    card: {
        minWidth: 375,
        maxWidth: 375
    },
    metrics_container: {
        marginTop: 24
    },
    accordion_details: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    metric_title: {
        marginBottom: 12
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
        maxWidth: 220,
        float: 'right'
    },
    formControl_metric: {
        margin: theme.spacing(1),
        minWidth: 320,
        maxWidth: 320,
        float: 'right'
    },
    indeterminateColor: {
        color: theme.palette.primary.dark
    },
    selectAllText: {
        fontWeight: 500
    },
    selectedAll: {
        backgroundColor: theme.palette.primary.light,
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        }
    }
}));

export default useStyles;