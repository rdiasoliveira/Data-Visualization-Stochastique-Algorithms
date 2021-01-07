import React from 'react';
import OptionDialogContent from '../../datasource/OptionDialogContent'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
    const dialogContent = OptionDialogContent.data;

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
                    <Button autoFocus color="inherit" onClick={props.saveSettingsChanges}>
                        Save Changes
                    </Button>
                </Toolbar>
            </AppBar>
            <List>
                <Box key="dataPath">
                    <ListItem button onClick={() => props.setOptionDialogDataPathActive(dialogContent.dataPath)}>
                        <ListItemText primary={dialogContent.dataPath.title} secondary={props.dataPath} />
                    </ListItem>
                    <Divider />
                </Box>
                <Box key="delimiter">
                    <ListItem button onClick={() => props.setOptionDialogDelimiterActive(dialogContent.delimiter)}>
                        <ListItemText primary={dialogContent.delimiter.title} secondary={props.delimiter} />
                    </ListItem>
                    <Divider />
                </Box>
                <Box key="filePattern">
                    <ListItem button onClick={() => props.setOptionDialogFilePatternActive(dialogContent.filePattern)}>
                        <ListItemText primary={dialogContent.filePattern.title} secondary={props.filePattern.toString()} />
                    </ListItem>
                    <Divider />
                </Box>
                <Box key="ignoreFirstLine">
                    <ListItem button onClick={() => props.setOptionDialogIngoreFirstLineActive(dialogContent.ignoreFirstLine)}>
                        <ListItemText primary={dialogContent.ignoreFirstLine.title} secondary={props.ignoreFirstLine.toString()} />
                    </ListItem>
                </Box>
            </List>
        </Dialog>
    );
}

