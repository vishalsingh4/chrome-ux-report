import { FC } from 'react';

import useStyles from './style';

type Props = {
    metricName: string,
    data: any
}

export const IndicatorComponent: FC<Props> = ({
    data
}) => {
    const classes = useStyles();

    const successVal = (data?.histogram?.[0]?.density * 100)?.toFixed(2);
    const warningsVal = (data?.histogram?.[1]?.density * 100)?.toFixed(2);
    const dangerVal = (data?.histogram?.[2]?.density * 100)?.toFixed(2);

    return (
        <div className={classes.root}>
            <div className={classes.success} style={{
                width: `${successVal}%`
            }}></div>
            <div className={classes.warning} style={{
                width: `${warningsVal}%`
            }}></div>
            <div className={classes.danger} style={{
                width: `${dangerVal}%`
            }}></div>
        </div>
    )
}

export default IndicatorComponent;
