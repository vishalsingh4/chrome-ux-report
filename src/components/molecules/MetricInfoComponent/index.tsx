import { FC } from 'react'
import { Divider, Grid, Tooltip, Typography } from '@material-ui/core';

import useStyles from './style';
import { CoreMetrics } from 'interfaces';

type Props = {
    metricName: string,
    data: any
};

export const MetricInfoComponent: FC<Props> = ({
    metricName,
    data
}) => {
    const classes = useStyles();

    const goodPercent = (data?.histogram?.[0]?.density * 100)?.toFixed(2);
    const warnPercent = (data?.histogram?.[1]?.density * 100)?.toFixed(2);
    const badPercent = (data?.histogram?.[2]?.density * 100)?.toFixed(2);

    const getMetricStats = (metricName: string, data: any) => {
        let goodStat = '';
        let warningStat = '';
        let badStat = '';
        let p75 = '';

        switch (metricName) {
            case CoreMetrics.largest_contentful_paint: {
                goodStat = `${data?.histogram?.[0]?.end / 1000} s`;
                warningStat = `${data?.histogram?.[1]?.start / 1000} s - ${data?.histogram?.[1]?.end / 1000} s`;
                badStat = `${data?.histogram?.[2]?.start / 1000} s`;
                p75 = `${data?.percentiles?.p75 / 1000} s`;
                break;
            }
            case CoreMetrics.first_input_delay: {
                goodStat = `${data?.histogram?.[0]?.end} ms`;
                warningStat = `${data?.histogram?.[1]?.start} ms - ${data?.histogram?.[1]?.end} ms`;
                badStat = `${data?.histogram?.[2]?.start} ms`;
                p75 = `${data?.percentiles?.p75} ms`;
                break;
            }
            case CoreMetrics.cumulative_layout_shift: {
                goodStat = `${data?.histogram?.[0]?.end}`;
                warningStat = `${data?.histogram?.[1]?.start} - ${data?.histogram?.[1]?.end}`;
                badStat = `${data?.histogram?.[2]?.start}`;
                p75 = `${data?.percentiles?.p75}`;
                break;
            }
            case CoreMetrics.first_contentful_paint: {
                goodStat = `${data?.histogram?.[0]?.end / 1000} s`;
                warningStat = `${data?.histogram?.[1]?.start / 1000} s - ${data?.histogram?.[1]?.end / 1000} s`;
                badStat = `${data?.histogram?.[2]?.start / 1000} s`;
                p75 = `${data?.percentiles?.p75 / 1000} s`;
                break;
            }
            case CoreMetrics.interaction_to_next_paint: {
                goodStat = `${data?.histogram?.[0]?.end} ms`;
                warningStat = `${data?.histogram?.[1]?.start} ms - ${data?.histogram?.[1]?.end} ms`;
                badStat = `${data?.histogram?.[2]?.start} ms`;
                p75 = `${data?.percentiles?.p75} ms`;
                break;
            }
            case CoreMetrics.experimental_time_to_first_byte: {
                goodStat = `${data?.histogram?.[0]?.end / 1000} s`;
                warningStat = `${data?.histogram?.[1]?.start / 1000} s - ${data?.histogram?.[1]?.end / 1000} s`;
                badStat = `${data?.histogram?.[2]?.start / 1000} s`;
                p75 = `${data?.percentiles?.p75 / 1000} s`;
                break;
            }
            default: {
                goodStat = '';
                warningStat = '';
                badStat = '';
                p75 = '';
            }
        }

        return { goodStat, warningStat, badStat, p75 };
    }

    const {
        goodStat,
        warningStat,
        badStat,
        p75
    } = getMetricStats(metricName, data);

    return (
        <div className={classes.root}>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9} md={9}>
                    <Typography>Good {`(<= ${goodStat})`}</Typography>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                    <Typography align='right'>{`${goodPercent}%`}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9} md={9}>
                    <Typography>Needs work {`(${warningStat})`}</Typography>
                </Grid>
                <Grid item xs={12} sm={9} md={3}>
                    <Typography align='right'>{`${warnPercent}%`}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9} md={9}>
                    <Typography>Bad {`(> ${badStat})`}</Typography>
                </Grid>
                <Grid item xs={12} sm={9} md={3}>
                    <Typography align='right'>{`${badPercent}%`}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} className={classes.p75}>
                <Grid item xs={12} sm={9} md={9}>
                    <Tooltip title="p75" placement="bottom">
                        <Typography>75th Percentile</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} sm={9} md={3}>
                    <Typography align='right'>{p75}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default MetricInfoComponent;
