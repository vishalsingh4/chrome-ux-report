import { FC, useEffect, useState } from 'react';
import { Button, ButtonGroup as ButtonGroupContainer } from '@material-ui/core';

import { Device } from 'interfaces';

type Props = {
    onChange?: (device: string) => void
};

export const ButtonGroup: FC<Props> = ({
    onChange = () => { }
}) => {
    const [device, setDevice] = useState(Device.PHONE);

    useEffect(() => {
        onChange?.(device);
    }, [device, onChange]);

    return (
        <ButtonGroupContainer aria-label="contained primary button group">
            <Button variant={device === Device.PHONE ? 'contained' : 'outlined'} color="primary" onClick={() => setDevice(Device.PHONE)}>{Device.PHONE}</Button>
            <Button variant={device === Device.DESKTOP ? 'contained' : 'outlined'} color="primary" onClick={() => setDevice(Device.DESKTOP)}>{Device.DESKTOP}</Button>
            <Button variant={device === Device.TABLET ? 'contained' : 'outlined'} color="primary" onClick={() => setDevice(Device.TABLET)}>{Device.TABLET}</Button>
        </ButtonGroupContainer>
    )
}

export default ButtonGroup;
