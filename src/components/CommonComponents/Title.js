import React from 'react'
import Typography from '@material-ui/core/Typography';
import { useTitleStyles } from './Styles';

const Title = () => {
    const classes = useTitleStyles();
    return (
        <Typography variant="h5" gutterBottom className={classes.gallryTitle}>
            Awesome Gallery
        </Typography>

    )
}

export default Title
