import React, { useState, useEffect } from 'react'
import { Chip, CardMedia, CardContent, CardActions, Card, Container, Typography, FormGroup, FormControlLabel, Switch, CircularProgress } from '@material-ui/core';
import ImageSlider from '../CommonComponents/ImageSlider';
import Header from './Header';
import LazyLoad from 'react-lazyload';
import { allAvailableTags } from '../CommonComponents/AutocompleteWords'
import { useHomeStyles } from '../CommonComponents/Styles';
import Title from '../CommonComponents/Title';
import { getGalleryData, fetchSearchResults } from '../API/Api';
import VideoPlayer from 'react-simple-video-player';
import Notification from '../CommonComponents/Notification';

const HomeComponent = () => {

    const classes = useHomeStyles();

    const [state, setState] = useState([]);
    const [records, setRecords] = useState({ fn: items => { return items; } });
    const [searchTagData, setSarchTagData] = useState([]);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [features, setFeatures] = useState({
        filter: false,
        sort: false,
    });

    // Get Gallery Images
    useEffect(() => {
        getGalleryData(
            (data) => { setState(data) },
            (error) => {
                setError(error);
                setNotify({
                    isOpen: true,
                    message: "Something's Wrong! Please Try Again",
                    type: 'error'
                })
            },
        );
    }, [])

    // Show all initial images or after filtered
    const showAllRecords = () => {
        return records.fn(state)
    }

    // Show local time
    const showDateTime = (dateTime) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let event = new Date(dateTime * 1000);
        let formatedDate = (monthNames[event.getMonth()]) + '/' + event.getDate() + '/' + event.getFullYear();
        return formatedDate
    }

    // Filter the results where the sum of “points”, “score” and “topic_id” adds up to an even number
    const handleFilterFeature = (event) => {
        setFeatures({ ...features, [event.target.name]: event.target.checked });
        let filterFields = ['points', 'score', 'topic_id'];
        setRecords({
            fn: items => {
                if (event.target.checked === true) {
                    return items.filter(item => {
                        return filterFields.some((field) => item[field] % 2 === 0)
                    })
                }
                else {
                    return items;
                }
            }
        })
    };

    // Sorting Images
    const handleSortFeature = (event) => {
        setFeatures({ ...features, [event.target.name]: event.target.checked });
        if (event.target.checked === true) {
            setState(state.sort().reverse());
        } else {
            setState(state.sort().reverse());
        }
    };

    // Suggest search terms
    const handleTagDisplay = (searchedQuery) => {
        let availableTag = allAvailableTags.filter(tag => tag.toLowerCase().includes(searchedQuery.toLowerCase()))
        setSarchTagData(availableTag);
    }

    const handleShowSearchedData = (showSearchData) => {
        setRecords({
            fn: items => {
                if (showSearchData) {
                    items = showSearchData
                    return items;
                }
                else {
                    items = records
                    return items;
                }
            }
        })
    }

    const resetSearchedResult = () => {
        setRecords({
            fn: items => {
                if (state) {
                    items = state
                    return items;
                }
            }
        })
    }

    // Quick Search on click the tag
    const tagOnClick = () => {
        const tagValue = document.getElementById('search-by-tag').innerText;
        getSearchResults(tagValue)
    }

    // Get search results
    const getSearchResults = async (query) => {
        await fetchSearchResults(query,
            (data) => { handleShowSearchedData(data) },
            (error) => {
                setError(error);
                setNotify({
                    isOpen: true,
                    message: "Something's Wrong! Please Try Again",
                    type: 'error'
                })
            },
        );
        handleTagDisplay(query);
        setSearchKeyword(query);
    }

    return (
        <div>
            <div>
                <Header
                    getSearchResults={getSearchResults}
                    resetSearchedResult={resetSearchedResult}
                    searchTagData={searchTagData}
                    tagOnClick={tagOnClick}
                />
            </div>
            <Container maxWidth="lg" className={classes.headerStyles}>
                <Title />
                <div className={classes.featuresMain}>
                    <div>
                        {searchKeyword !== "" && document.getElementById('search-input').value !== "" ?
                            <Typography id="show-search-keyword" variant="body2">Showing Results Of "{searchKeyword}"</Typography>
                            : null}
                    </div>
                    <div>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={features.filter}
                                        onChange={handleFilterFeature}
                                        name="filter"
                                        color="primary"
                                    />
                                }
                                label="Filter Lucky Results"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={features.sort}
                                        onChange={handleSortFeature}
                                        name="sort"
                                        color="primary"
                                    />
                                }
                                label="Sort Descending"
                            />
                        </FormGroup>
                    </div>
                </div>
                {state.length ?
                    <div className={classes.cardParent}>
                        {showAllRecords().map(image => (
                            <LazyLoad key={image.id} height={5} offset={10} once >
                                <Card key={image.id} className={classes.cardRoot}>
                                    <div>
                                        {image.images && image.images.length > 1 ?

                                            <ImageSlider
                                                imagesData={image.images}
                                            />
                                            :
                                            image.images &&
                                            image.images.map(photo => (
                                                photo.type === "video/mp4" ?
                                                    <VideoPlayer width="100%" height="auto" autosize url={photo.link} />
                                                    :
                                                    <CardMedia key={photo.id}
                                                        className={classes.media}
                                                        image={photo.link}
                                                        title={image.title}
                                                    />
                                            ))
                                        }
                                        <CardContent className={classes.cardContent}>
                                            <Typography variant="subtitle2">{image.title}</Typography>
                                        </CardContent>
                                    </div>
                                    <div className={classes.showPoints}>
                                        <div><Typography gutterBottom variant="body2">{image.points} Points</Typography></div>
                                        <div><Typography gutterBottom variant="body2">{showDateTime(image.datetime)}</Typography></div>
                                    </div>
                                    <CardActions>
                                        {image.tags ?
                                            image.tags.map(displayTags => (
                                                <Chip key={displayTags.name} label={displayTags.display_name} color="primary" />
                                            )) : null}
                                    </CardActions>
                                </Card>
                            </LazyLoad>
                        ))}
                    </div>
                    : <CircularProgress />}
            </Container>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    )
}

export default HomeComponent
