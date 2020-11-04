import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useHeaderStyles } from '../CommonComponents/Styles';

const Header = (props) => {
    const classes = useHeaderStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [isInputValue, setIsInputValue] = useState(null);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const handleOnSearchInputChange = (event) => {
        const searchQuery = event.target.value;
        if (searchQuery !== "") {
            props.getSearchResults(event.target.value);
            setIsInputValue(searchQuery);
        } else {
            setIsInputValue(null)
        }
    };

    const resetInputData = () => {
        props.resetSearchedResult();
        document.getElementById('search-input').value = "";
        setIsInputValue(null);
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem >
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        ReactJs Test with Imgur
                    </Typography>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search Images…"
                            onChange={handleOnSearchInputChange}
                            id="search-input"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        {isInputValue != null ?
                            <IconButton aria-label="delete" color="secondary" onClick={resetInputData}>
                                <HighlightOffIcon />
                            </IconButton>
                            : null
                        }

                        {isInputValue != null || isInputValue === "" ?
                            <div div className={classes.quickSearch}>
                                {props.searchTagData &&
                                    props.searchTagData.map(tag => (
                                        <div key={tag}>
                                            <Button variant="contained" color="secondary" onClick={props.tagOnClick} id="search-by-tag">
                                                {tag}
                                            </Button>
                                        </div>
                                    ))}
                            </div> : null}
                    </div>


                    <div className={classes.grow} />

                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            { renderMobileMenu}
        </div >
    );
}

export default Header
