import React from 'react';
import { Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import RssParser from 'rss-parser';
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    InputAdornment,
    TextField,
    Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import ogParser from 'og-parser';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100vw',
            marginTop: theme.spacing(2),
        },
        flexCenter: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        error: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            '& button': {
                marginTop: theme.spacing(3),
            },
        },

        feedItem: {
            margin: 'auto',
            marginBottom: theme.spacing(2),
            width: '90%',
        },
        feedItemContent: {
            display: 'flex',
        },

        searchField: {
            width: '90%',
            marginLeft: '5%',
            marginBottom: theme.spacing(3),
        },
    })
);

interface FeedItemProps {
    classes: ReturnType<typeof useStyles>;
    item: RssParser.Item;
    proxy: string;
    show: boolean;
}
const FeedItem = ({ classes, item, proxy, show }: FeedItemProps) => {
    const imageWidth = 355;
    const [ogImage, setOgImage] = React.useState<string>();
    React.useEffect(() => {
        if (!item.link) return;
        const url = proxy + item.link;
        console.warn({ url });
        ogParser(proxy + item.link, (err, data) => {
            if (err) {
                console.error(err);
                setOgImage(
                    'https://images.wallpaperscraft.com/image/no_image_inscription_text_151413_1280x720.jpg'
                );
                return;
            }
            setOgImage(data?.og?.image?.url);
        });
    }, [item.link, proxy]);

    const rtf = new Intl.RelativeTimeFormat('pl', { numeric: 'auto' });
    const hourDiff = Math.abs(Date.now() - new Date(item.isoDate || 0).getTime()) / (36e5 * -1);
    const pubDate = rtf.format(Math.floor(hourDiff), 'hour');

    const shortenedContent = item.contentSnippet?.replace(/^(.{210}[^\s]*).*/s, '$1');

    const cardClickHandler = () => window.open(item.link, '_blank');

    return (
        <Card
            className={classes.feedItem}
            style={{
                display: show ? 'block' : 'none',
            }}
            raised
            onClick={cardClickHandler}
        >
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
    let proxy = typeof props.proxy === 'undefined' ? '' : props.proxy;
    const classes = useStyles();
    const [feed, setFeed] = React.useState<RssParser.Output>();
    const [filter, setFilter] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isError, setIsError] = React.useState<boolean>(false);

    const [parser] = React.useState<RssParser>(new RssParser());
    const loadFeedCallback = React.useCallback(() => {
        setIsLoading(true);
        setIsError(false);
        parser
            .parseURL(proxy + props.url)
            .then(setFeed)
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [parser, proxy, props.url]);
    React.useEffect(loadFeedCallback, [loadFeedCallback]);

    if (isLoading || isError) {
        return (
            <div className={classes.flexCenter}>
                {isLoading && <CircularProgress color='secondary' />}
                {isError && (
                    <div className={classes.error}>
                        <Typography variant='h4'>Nie można załadować kanału</Typography>
                        <Button variant='contained' color='secondary' onClick={loadFeedCallback}>
                            Spróbuj ponownie
                        </Button>
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className={classes.root}>
            <TextField
                className={classes.searchField}
                label='Przeszukaj kanał'
                variant='outlined'
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {feed?.items?.map((item) => (
                <FeedItem
                    key={item.guid}
                    show={
                        filter.length === 0 ||
                        item.title?.toLowerCase()?.indexOf(filter.toLowerCase()) !== -1
                    }
                    {...{ classes, item, proxy }}
                />
            ))}
        </div>
    );
}

export default FeedPreview;
