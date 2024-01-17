import { FC } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Container, Grid, Typography, Link } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab'

import IndicatorComponent from 'components/molecules/IndicatorComponent';
import MetricInfoComponent from 'components/molecules/MetricInfoComponent';

import { CORE_PAGE_VITALS, EXTRA_PAGE_VITALS, Metrics, MetricsLink } from 'interfaces';

import useStyles from './style';

type PageVitalProps = {
    metricsData: Record<keyof typeof Metrics, any>
};

export const PageVital: FC<PageVitalProps> = ({
    metricsData = {}
}) => {
    const classes = useStyles();

    const coreVitalsList = Object.entries(metricsData).filter(([key, _value]) => CORE_PAGE_VITALS.includes(key as any));
    const extraVitalsList = Object.entries(metricsData).filter(([key, _value]) => EXTRA_PAGE_VITALS.includes(key as any));

    const getMetricLinks = (key: string) => {
        return (
            <Link href={MetricsLink[key as keyof typeof Metrics]} target="_blank">
                {Metrics[key as keyof typeof Metrics]}
            </Link>
        );
    };

    const RenderVitals = ({
        dataList = [],
        title = '',
        isAccordionExpanded = false
    }) => (
        <Container maxWidth="lg" className={classes.metrics_container}>
            <Grid justifyContent='center'>
                <Accordion defaultExpanded={isAccordionExpanded}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordion_details}>
                        {
                            dataList.map(([key, value]) => (
                                <Grid item key={key}>
                                    <Card variant="outlined" className={classes.card}>
                                        <CardContent>
                                            <Typography className={classes.metric_title} variant='button' gutterBottom>
                                                {getMetricLinks(key)}
                                            </Typography>
                                            <IndicatorComponent metricName={key} data={value} />
                                            <MetricInfoComponent metricName={key} data={value} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Container>
    );

    if (coreVitalsList?.length > 0 && extraVitalsList?.length > 0) {
        return <>
            <RenderVitals title='Core Page Metrics' dataList={coreVitalsList as any} isAccordionExpanded />
            <RenderVitals title='Other Page Metrics' dataList={extraVitalsList as any} />
        </>
    }

    if (coreVitalsList?.length > 0) {
        return <RenderVitals title='Core Page Metrics' dataList={coreVitalsList as any} isAccordionExpanded />;
    }

    if (extraVitalsList?.length > 0) {
        return <RenderVitals title='Other Page Metrics' dataList={extraVitalsList as any} />;
    }

    return <Container maxWidth="lg" className={classes.metrics_container}>
        <Grid container spacing={4} justifyContent='center'>
            <Grid item>
                <Skeleton variant="rect" width={210} height={118} />
            </Grid>
            <Grid item>
                <Skeleton variant="rect" width={210} height={118} />
            </Grid>
            <Grid item>
                <Skeleton variant="rect" width={210} height={118} />
            </Grid>
        </Grid>
    </Container>;

}

export default PageVital;