import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings(props) {

    const classes = useStyles();

    return (
        <Dialog fullScreen open={props.isSettingsDialogActive}
            onClose={props.setSettingsDialogInactive}
            TransitionComponent={Transition} >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit"
                        onClick={props.setSettingsDialogInactive} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Settings
                    </Typography>
                </Toolbar>
            </AppBar>
            <List>
                {props.settingsOptions.map((settingsOption) => {
                    return (
                        <Box key={settingsOption.id}>
                            <ListItem button onClick={() => props.setOptionDialogActive(settingsOption)}>
                                <ListItemText primary={settingsOption.title} secondary={settingsOption.subTitle} />
                            </ListItem>
                            <Divider />
                        </Box>
                    );
                })}
            </List>
        </Dialog>
    );
}

