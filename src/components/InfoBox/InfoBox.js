import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

const InfoBox = ({ title, cases, total }) => {
    return (
        <Card className='infoBox'>
            <CardContent>
                <Typography className='infoBox_title' color='textSecondary'>
                    {title}
                </Typography>
                <h2 className='infoBox_cases'>{cases}</h2>
                <Typography className='infoBox_total' color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;