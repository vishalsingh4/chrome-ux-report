import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Assessment, AccountCircle } from '@material-ui/icons';

import useStyles from './style';

export const Layout = () => {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar className={classes.container}>
                <span className={classes.header}>
                    <Assessment fontSize='large' className={classes.logo} />
                    <Typography variant="h6">
                        Chrome UX Report
                    </Typography>
                </span>
                <AccountCircle />
            </Toolbar>
        </AppBar>
    )
}

export default Layout;
