import React from 'react';
import { Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import FeedPreview from './components/FeedPreview';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
        },
    })
);

function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FeedPreview url='https://www.gamespot.com/feeds/mashup/' />
        </div>
    );
}

export default App;
