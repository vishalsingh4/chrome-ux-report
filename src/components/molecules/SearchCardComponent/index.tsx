import React, { useState, FC, useCallback } from 'react';

import { Card, CardContent, Button, TextField, Grid, Container } from '@material-ui/core';

import useStyles from './style';

type Props = {
    onSubmit?: (url: string) => void
};

type HandleSubmitFnType = {
    (e: any): void
};

export const SearchCardComponent: FC<Props> = ({
    onSubmit = () => { }
}) => {
    const classes = useStyles();

    const errorDefault = {
        hasError: false,
        errorMessage: ''
    }

    const [url, setUrl] = useState('');
    const [error, setError] = useState(errorDefault);

    const handleInputChange = (e: React.SyntheticEvent | any) => {
        e.preventDefault();
        setError(errorDefault);
        setUrl(e.target?.value);
    };

    const handleSubmit: HandleSubmitFnType = useCallback((e: any) => {
        e.preventDefault();
        const isValidUrl = /^((https?):\/\/)?[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(url);

        if (isValidUrl) {
            setError(errorDefault);
            onSubmit?.(url);
        } else {
            setError({
                hasError: true,
                errorMessage: 'Please enter valid URL'
            })
        }
    }, [url]);

    return (
        <Container maxWidth="md">
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Grid className={classes.grid_container}>
                        <Grid item xs={12} sm={9} md={9}>
                            <TextField id="search-url" label="Website URL" variant="filled" error={error.hasError} helperText={error.errorMessage} value={url} onChange={handleInputChange} autoFocus fullWidth required />
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} alignItems='center'>
                            <Button className={classes.submit_btn} size="medium" variant="contained" color="primary" onClick={handleSubmit} disabled={error.hasError} fullWidth>Search</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

export default SearchCardComponent;
