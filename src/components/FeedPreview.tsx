import React from 'react';
import { Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
        },
    })
);

interface Props {
    url: string;
}

function FeedPreview(props: Props) {
    const classes = useStyles();
    return <div className={classes.root}>FeedPreview works! {props.url}</div>;
}

export default FeedPreview;
