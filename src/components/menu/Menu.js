import React from 'react';
import SettingsDialog from '../dialog/SettingsDialog'
import OptionDialog from '../dialog/OptionDialog'
import OptionSelectFieldForm from '../forms/OptionSelectFieldForm'
import OptionTextFieldForm from '../forms/OptionTextFieldForm'
import OptionSwitchForm from '../forms/OptionSwitchForm'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
    logo: {
        marginRight: theme.spacing(2),
        width: "28px",
        height: "28px"
    }
}));

export default function Menu(props) {

    const classes = useStyles();
    
    const [isSettingsDialogActive, setSettingsDialogActive] = React.useState(false);
    const [isOptionDialogActive, setOptionDialogActive] = React.useState(false);
    const [optionDialogContent, setOptionDialogContent] = React.useState(null);
    const [optionDialogForm, setOptionDialogForm] = React.useState(null);

    const [tmpDataPath, setTmpDataPath] = React.useState(props.dataPath);
    const [tmpDelimiter, setTmpDelimiter] = React.useState(props.delimiter);
    const [tmpFilePattern, setTmpFilePattern] = React.useState(props.filePattern);
    const [tmpIgnoreFirstLine, setTmpIngoreFirstLine] = React.useState(props.ignoreFirstLine)

    const handleSetSettingsDialogInactive = () => {
        setTmpDataPath(props.dataPath);
        setTmpDelimiter(props.delimiter);
        setTmpFilePattern(props.filePattern);
        setTmpIngoreFirstLine(props.ignoreFirstLine);
        setSettingsDialogActive(false);
    };

    const handleSaveSettingsChanges = () => {
        props.setDataPath(tmpDataPath);
        props.setDelimiter(tmpDelimiter);
        props.setFilePattern(tmpFilePattern);
        props.setIgnoreFirstLine(tmpIgnoreFirstLine);
        setSettingsDialogActive(false);
    }

    const handleOptionSetTmpDataPath = (tmpDataPath) => {
        setTmpDataPath(tmpDataPath);
        setOptionDialogActive(false);
    }

    const handleOptionSetTmpDelimiter = (tmpDelimiter) => {
        setTmpDelimiter(tmpDelimiter);
        setOptionDialogActive(false);
    }

    const handleOptionSetTmpFilePattern = (tmpFilePattern) => {
        setTmpFilePattern(tmpFilePattern);
        setOptionDialogActive(false);
    }

    const handleOptionSetTmpIgnoreFirstLine = (tmpIgnoreFirstLine) => {
        console.log(tmpIgnoreFirstLine);
        setTmpIngoreFirstLine(tmpIgnoreFirstLine);
        setOptionDialogActive(false);
    }

    const handleSetOptionDialogInactive = () => {
        setOptionDialogActive(false);
    }

    const handleSetOptionDialogDataPathActive = (optionContent) => {
        fetch("http://127.0.0.1:8080/getDirectories/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setOptionDialogForm(
                        <OptionSelectFieldForm optionContent={optionContent} formSubmit={handleOptionSetTmpDataPath} items={result} defaultSelect={tmpDataPath} />
                    );
                    setOptionDialogContent(optionContent);
                    setOptionDialogActive(true);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    const handleSetOptionDialogDelimiterActive = (optionContent) => {
        setOptionDialogForm(
            <OptionTextFieldForm optionContent={optionContent} formSubmit={handleOptionSetTmpDelimiter} />
        );
        setOptionDialogContent(optionContent);
        setOptionDialogActive(true);
    }

    const handleSetOptionDialogFilePatternActive = (optionContent) => {
        setOptionDialogForm(
            <OptionTextFieldForm optionContent={optionContent} formSubmit={handleOptionSetTmpFilePattern} />
        );
        setOptionDialogContent(optionContent);
        setOptionDialogActive(true);
    }

    const handleSetOptionDialogIgnoreFirstLineActive = (optionContent) => {
        setOptionDialogForm(
            <OptionSwitchForm optionContent={optionContent} formSubmit={handleOptionSetTmpIgnoreFirstLine} isChecked={tmpIgnoreFirstLine}/>
        );
        setOptionDialogContent(optionContent);
        setOptionDialogActive(true);
    }
    
    return(
        <Box>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <img alt="Application Logo" className={classes.logo} src="logo192.png"/>
                    <Typography variant="h6" className={classes.title}>
                        Data Visualizer
                        </Typography>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setSettingsDialogActive(true)}>
                        <SettingsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SettingsDialog isSettingsDialogActive={isSettingsDialogActive}
                setSettingsDialogInactive={handleSetSettingsDialogInactive}
                setOptionDialogDataPathActive={handleSetOptionDialogDataPathActive}
                setOptionDialogDelimiterActive={handleSetOptionDialogDelimiterActive}
                setOptionDialogFilePatternActive={handleSetOptionDialogFilePatternActive}
                setOptionDialogIngoreFirstLineActive={handleSetOptionDialogIgnoreFirstLineActive}
                dataPath={tmpDataPath}
                delimiter={tmpDelimiter}
                filePattern={tmpFilePattern}
                ignoreFirstLine={tmpIgnoreFirstLine}
                saveSettingsChanges={handleSaveSettingsChanges} />
            <OptionDialog isOptionDialogActive={isOptionDialogActive}
                optionDialogContent={optionDialogContent}
                optionDialogForm={optionDialogForm}
                setOptionDialogInactive={handleSetOptionDialogInactive} />
        </Box>
    );
}