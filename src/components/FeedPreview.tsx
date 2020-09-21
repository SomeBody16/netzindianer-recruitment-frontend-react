import React from 'react';
import { Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import RssParser from 'rss-parser';
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ogParser from 'og-parser';

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
            width: '90%',
        },
        feedItemContent: {
            display: 'flex',
        },
    })
);

interface FeedItemProps {
    classes: ReturnType<typeof useStyles>;
    item: RssParser.Item;
    proxy?: string;
}
const FeedItem = ({ classes, item, proxy }: FeedItemProps) => {
    const imageWidth = 355;
    const [ogImage, setOgImage] = React.useState<string>();
    React.useEffect(() => {
        if (!item.link) return;
        ogParser(proxy + item.link, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log({ err, data });
            setOgImage(data?.og?.image?.url);
        });
    }, [item.link, proxy]);

    const rtf = new Intl.RelativeTimeFormat('pl', { numeric: 'auto' });
    const hourDiff = Math.abs(Date.now() - new Date(item.isoDate || 0).getTime()) / (36e5 * -1);
    const pubDate = rtf.format(Math.floor(hourDiff), 'hour');

    const shortenedContent = item.contentSnippet?.replace(/^(.{210}[^\s]*).*/s, '$1');

    const cardClickHandler = () => window.open(item.link, '_blank');

    return (
        <Card className={classes.feedItem} raised onClick={cardClickHandler}>
            <CardActionArea className={classes.feedItemContent}>
                <CardMedia
                    component={() =>
                        ogImage ? (
                            <img
                                src={ogImage}
                                alt={item.title}
                                width={imageWidth}
                                height={imageWidth * (2 / 3)}
                            />
                        ) : (
                            <Skeleton
                                variant='rect'
                                width={imageWidth}
                                height={imageWidth * (2 / 3)}
                            />
                        )
                    }
                />
                <div style={{ width: `calc(100% - ${imageWidth}px)` }}>
                    <CardHeader title={item.title} subheader={pubDate} />
                    <CardContent>
                        <Typography variant='body2' color='textSecondary'>
                            {shortenedContent} ...
                        </Typography>
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>
    );
};

interface Props {
    url: string;
    proxy?: string;
}

function FeedPreview(props: Props) {
    const classes = useStyles();
    const [feed, setFeed] = React.useState<RssParser.Output>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const loadFeed = async () => {
            const parser = new RssParser();
            setFeed(await parser.parseURL((props.proxy || '') + props.url));
            setIsLoading(false);
        };
        loadFeed();
    }, [props.url, props.proxy]);

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
                <FeedItem key={item.guid} {...{ classes, item, proxy: props.proxy }} />
            ))}
        </div>
    );
}

export default FeedPreview;
