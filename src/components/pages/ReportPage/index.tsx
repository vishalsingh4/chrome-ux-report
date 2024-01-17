import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Checkbox, Container, Divider, FormControl, Grid, InputLabel, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { CrUXApiUtil } from 'services';

import ButtonGroup from 'components/atoms/ButtonGroup';
import { MenuProps, options } from "./utils";

import useStyles from './style';
import { COMBINED_PAGE_VITALS, ConnectionTypesList, Device } from 'interfaces';
import PageVital from './PageVital';

type ErrorType = {
    show: boolean,
    message: React.ReactElement<any>
}

const DEFAULT_DATE = {
    day: '-',
    month: '-',
    year: '-'
};

export const ReportPage = () => {
    const DefaultErrorState = {
        show: false,
        message: <></>
    };

    const { state: { url } } = useLocation() as any;
    const classes = useStyles();

    const [reportData, setReportData] = useState<any>({});
    const [error, setError] = useState<ErrorType>(DefaultErrorState);
    const [formFactor, setFormFactor] = useState(Device.PHONE);
    const [metrics, setMetrics] = useState<any[]>([]);
    const [connectionType, setConnectionType] = useState('');
    // const [selected, setSelected] = useState<any>([]);

    const isAllSelected =
        options.length > 0 && metrics.length === options.length;

    // const handleChange = (event: any) => {
    //     const value = event.target.value;
    //     if (value[value.length - 1] === "all") {
    //         setSelected(selected.length === options.length ? [] : options);
    //         return;
    //     }
    //     setSelected(value);
    // };

    const handleConnectionTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setConnectionType(event.target.value as string);
    };

    const handleMetricsTypeChange = (event: any) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setMetrics(metrics.length === options.length ? [] : options);
            return;
        }
        setMetrics(value);
    };

    const handleBtnChange = useCallback((selectedButton: string) => {
        setFormFactor(selectedButton as any);
    }, []);

    const getPostRequestData = () => {
        let reqData = {
            url,
            formFactor
        } as any;

        if (connectionType) {
            reqData = {
                ...reqData,
                effectiveConnectionType: connectionType,
            }
        }

        if (metrics) {
            reqData = {
                ...reqData,
                metrics: [...metrics]
            }
        }

        return reqData;
    };

    const fetchReportData = async () => {
        try {
            const res = await CrUXApiUtil.query(getPostRequestData());
            setReportData(res);
            setError(DefaultErrorState);
        } catch (e: any) {
            const errorMessage = e?.error?.message as string;
            setError({
                show: true,
                message: <>{errorMessage}</>
            });
            setReportData({});
        }
    };

    const getDataCollectionPeriod = () => {
        const collectionPeriod = reportData?.record?.collectionPeriod;
        const { day: startDay, month: startMonth, year: startYear } = collectionPeriod?.firstDate || DEFAULT_DATE;
        const { day: endDay, month: endMonth, year: endYear } = collectionPeriod?.lastDate || DEFAULT_DATE;

        return `${startDay}/${startMonth}/${startYear} - ${endDay}/${endMonth}/${endYear}`;
    };

    useEffect(() => {
        fetchReportData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formFactor, metrics, connectionType]);

    return (
        <>
            {error.show && <Alert severity="error">{error.message}</Alert>}
            <Divider />
            <Container maxWidth="lg" className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} md={6}>
                        <Typography variant='h5'>Page Speed Insights</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="button" display="block" gutterBottom>Website URL</Typography>
                        <Typography>{reportData?.record?.key?.url}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Typography variant="button" display="block" align='right' gutterBottom>Data Collection Period</Typography>
                        <Typography align='right'>{getDataCollectionPeriod()}</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            <Container className={classes.btn_group} maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} md={6} className={classes.btn_group}>
                        <ButtonGroup onChange={handleBtnChange} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="effective-connection-type">Effective Connection Type</InputLabel>
                            <Select
                                labelId="Effective Connection Type"
                                id="connection-type"
                                value={connectionType}
                                onChange={handleConnectionTypeChange}
                            >
                                {
                                    ConnectionTypesList.map((item: string, index: number) => <MenuItem value={item} key={index}>{item}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        {/* <FormControl className={classes.formControl}>
                            <InputLabel id="metrics-label">Metrics</InputLabel>
                            <Select
                                labelId="Metrics"
                                id="metrics-type"
                                value={metrics}
                                onChange={handleMetricsTypeChange}
                            >
                                {
                                    COMBINED_PAGE_VITALS.map((item: string, index: number) => <MenuItem value={item} key={index}>{item}</MenuItem>)
                                }
                            </Select>
                        </FormControl> */}
                        <FormControl className={classes.formControl_metric}>
                            <InputLabel id="metrics-label">Metrics</InputLabel>
                            <Select
                                labelId="Metrics"
                                multiple
                                value={metrics}
                                onChange={handleMetricsTypeChange}
                                renderValue={(selected: any) => selected.join(", ")}
                                MenuProps={MenuProps as any}
                            >
                                <MenuItem
                                    value="all"
                                    classes={{
                                        root: isAllSelected ? classes.selectedAll : ""
                                    }}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            color='primary'
                                            classes={{ indeterminate: classes.indeterminateColor }}
                                            checked={isAllSelected}
                                            indeterminate={
                                                metrics.length > 0 && metrics.length < options.length
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{ primary: classes.selectAllText }}
                                        primary="Select All"
                                    />
                                </MenuItem>
                                {options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        <ListItemIcon>
                                            <Checkbox checked={metrics.indexOf(option as never) > -1} color='primary' />
                                        </ListItemIcon>
                                        <ListItemText primary={option} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
            <PageVital metricsData={reportData?.record?.metrics} />
        </>
    )
}

export default ReportPage;