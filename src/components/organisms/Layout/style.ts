import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    logo: {
        padding: theme.spacing(0, 1, 0)
    }
}));

export default useStyles;