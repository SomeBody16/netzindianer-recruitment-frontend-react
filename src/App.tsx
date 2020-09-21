import React from 'react';
import { Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import FeedPreview from './components/FeedPreview';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflowX: 'hidden',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
        },
    })
);

function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <FeedPreview
                url='https://codepen.io/picks/feed/'
                // Proxy is optional (url will be appended at end of proxy url)
                // proxy='https://thingproxy.freeboard.io/fetch/'
            />
        </div>
    );
}

export default App;
