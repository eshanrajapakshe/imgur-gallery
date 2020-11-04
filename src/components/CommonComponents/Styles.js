import { makeStyles, fade } from '@material-ui/core/styles';

// Home Component Styles
export const useHomeStyles = makeStyles({
    cardRoot: {
        width: '100%',
        display: 'inline-block',
        marginBottom: '1em',
        '& .MuiCardActions-root': {
            display: 'block',
            overflowY: 'auto',
            '& .MuiChip-root': {
                margin: '1px',
                height: '30px',
                '& .MuiChip-label': {
                    paddingLeft: '10px',
                    paddingRight: '10px',
                }
            }
        },
        '& .MuiCardContent-root': {
            padding: '10px',
        }
    },
    media: {
        height: 200,
    },
    showPoints: {
        display: 'flex',
        padding: '0 10px',
        justifyContent: 'space-between',
    },
    cardParent: {
        columnCount: "5",
    },
    headerStyles: {
        paddingTop: '6rem',
        paddingBottom: '3rem',
    },
    featuresMain: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        '& .MuiTypography-body1': {
            color: '#ffffff',
        },
        '& .MuiTypography-body2': {
            color: '#ffffff',
        }
    },
    '@media screen and (max-width: 992px)': {
        cardParent: {
            columnCount: "4",
        },
    },
    '@media screen and (max-width: 768px)': {
        cardParent: {
            columnCount: "3",
        },
        featuresMain: {
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        gallryTitle: {
            marginBottom: '2rem',
        }
    },
    '@media screen and (max-width: 600px)': {
        featuresMain: {
            '& div': {
                width: '100%',
                justifyContent: 'center',
                margin: '0.5rem 0',
            }
        },
    },
    '@media screen and (max-width: 576px)': {
        cardParent: {
            columnCount: "2",
        },
    },
    '@media screen and (max-width: 450px)': {
        cardParent: {
            columnCount: "1",
        },
    },
});


// Header Component Styles
export const useHeaderStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '56vw',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    quickSearch: {
        position: 'absolute',
        left: '0',
        top: '117%',
        backgroundColor: '#ffffff',
        borderRadius: '3px',
        padding: '7px',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '100%',
        maxHeight: '150px',
        overflowY: 'auto',
        '& div': {
            margin: '5px 5px',
        }
    },
    '@media screen and (max-width: 1150px)': {
        search: {
            position: 'relative',
            '& .MuiIconButton-colorSecondary': {
                position: 'absolute',
                top: '130%',
                right: '-45px',
            }
        }
    },
    '@media screen and (max-width: 960px)': {
        search: {
            width: '100%',
        }
    },
}));


// Title Component Styles
export const useTitleStyles = makeStyles((theme) => ({
    gallryTitle: {
        fontFamily: 'Pacifico',
        color: 'azure'
    }
}));