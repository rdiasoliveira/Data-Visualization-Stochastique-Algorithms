import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function Menu(props) {
    const classes = useStyles();
    const { children } = props;
    
    return(
        <Box>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Data Visualizer
                        </Typography>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.setSettingsDialogActive}>
                        <SettingsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            { children }
        </Box>
    );
}