import React from 'react';
import { Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import RssParser from 'rss-parser';
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CircularProgress,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '100vw',
            marginTop: theme.spacing(2),
        },
        isLoading: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        feedItem: {
            margin: 'auto',
            marginBottom: theme.spacing(2),
            width: '40%',
            maxWidth: '90%',
        },
    })
);

interface FeedItemProps {
    classes: ReturnType<typeof useStyles>;
    item: RssParser.Item;
}
const FeedItem = ({ classes, item }: FeedItemProps) => {
    const rtf = new Intl.RelativeTimeFormat('pl', { numeric: 'auto' });
    const hourDiff = Math.abs(Date.now() - new Date(item.isoDate || 0).getTime()) / (36e5 * -1);
    const pubDate = rtf.format(Math.floor(hourDiff), 'hour');

    return (
        <Card className={classes.feedItem}>
            <CardActionArea>
                <CardHeader title={item.title} subheader={pubDate} />
                <CardContent>
                    <Typography noWrap variant='body2' color='textSecondary'>
                        {item.contentSnippet}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

interface Props {
    url: string;
}

function FeedPreview(props: Props) {
    const classes = useStyles();
    const [feed, setFeed] = React.useState<RssParser.Output>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadFeed = async () => {
            const parser = new RssParser();
            setFeed(await parser.parseURL(props.url));
            setIsLoading(false);
        };
        loadFeed();
    }, [props.url]);

    console.log({ feed });
    if (isLoading) {
        return (
            <div className={classes.isLoading}>
                <CircularProgress color='secondary' />
            </div>
        );
    }
    return (
        <div className={classes.root}>
            {feed?.items?.map((item) => (
                <FeedItem key={item.guid} {...{ classes, item }} />
            ))}
        </div>
    );
}

export default FeedPreview;
