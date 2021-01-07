import React from 'react';
import Graphs from '../../datasource/Graphs'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import CustomizationForm from './CustomizationForm';
import { Button } from '@material-ui/core';
import Plot from 'react-plotly.js';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#757de8',
        color: 'white',
        textAlign: 'center',
        overflow: 'auto',
        height: 300,
    },
    gridTitle: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridForm: {
        height: 75,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        minWidth: 200
    },
    ul: {
        padding: 0,
    },
    divider: {
        marginTop: '20px'
    },
    subHeader: {
        color: 'white',
    },
    listItemText: {
        fontWeight: '200'
    },
    folderIcon: {
        verticalAlign: 'middle',
        padding: 5
    },
    documentIconAvatar: {
        backgroundColor: 'transparent'
    },
    addIconAvatar: {
        backgroundColor: '#4caf50'
    },
    addIcon: {
        color: 'white'
    },
    deleteIconAvatar: {
        backgroundColor: 'red'
    }
}));

const graphRepresentationsItems = (data) => {
    const items = [];
    Graphs.dimensions.forEach((dimension) => {
        for (let graph of data.filter(graphRepresentation => graphRepresentation.nbDimensions === dimension)) {
            items.push(<MenuItem key={graph["id"]} value={graph}>{dimension + `D - ` + graph["typeName"]}</MenuItem>);
        }
    });
    return items;
}

const createArray = (size) => {
    var x = [];
    for (var i = 0; i < size; ++i) {
        x[i] = 0;
    }
    return x;
}

export default function VizualisationDataForm(props) {

    const classes = useStyles();

    const [dataList, setDataList] = React.useState({ "directories": [] });
    const [vizualisationList, setVizualisationList] = React.useState({ "directories": [] });
    const [graphRepresentation, setGraphRepresentation] = React.useState(null);

    const [graphPlot, setGraphPlot] = React.useState(null);
    const [graphPlotData, setGraphPlotData] = React.useState([]);
    const [graphPlotLayout, setGraphPlotLayout] = React.useState({});

    const countNbFilesVizualisationList = () => {
        let count = 0;
        vizualisationList["directories"].forEach((directory) => {
            count += directory["files"].length;
        });
        return count;
    }

    const handleAddNewFileToVizualisation = (directoryIndex, directoryName, fileIndex, file) => {
        const vizualisationListDirectoryIndex = vizualisationList["directories"].findIndex((directory) => directory.directoryName === directoryName);
        if (vizualisationListDirectoryIndex === -1) {
            vizualisationList["directories"].push({ "directoryName": directoryName, "files": [file] });
        } else {
            file["id"] = Math.random();
            if (vizualisationList["directories"][vizualisationListDirectoryIndex]["files"].findIndex((f) => f.filename === file.filename) === -1)
                vizualisationList["directories"][vizualisationListDirectoryIndex]["files"].push(file);
            else
                return;
        }
        setVizualisationList(Object.assign({}, vizualisationList));
        const newArray = createArray(countNbFilesVizualisationList());
        graphPlotData.forEach((element, i) => {
            if (i < newArray.length)
                newArray[i] = element;
        });
        setGraphPlotData(newArray);
    }

    const handleRemoveFileFromVizualisation = (directoryIndex, directoryName, fileIndex, file) => {
        vizualisationList["directories"][directoryIndex]["files"].splice(fileIndex, 1);
        if (vizualisationList["directories"][directoryIndex]["files"].length === 0) {
            vizualisationList["directories"].splice(directoryIndex, 1);
        }
        setVizualisationList(Object.assign({}, vizualisationList));

        const newArray = createArray(countNbFilesVizualisationList());
        graphPlotData.forEach((element, i) => {
            if (i < newArray.length)
                newArray[i] = element;
        });
        setGraphPlotData(newArray);
    };

    const handleChangeGraphRepresentation = (event) => {
        setGraphRepresentation(event.target.value);
        setGraphPlotData(createArray(countNbFilesVizualisationList()));
        setGraphPlotLayout(event.target.value["layout"]);
    }

    const handleSetGraphPlotData = (data, dataIndex) => {
        graphPlotData[dataIndex] = data;
        setGraphPlotData([...graphPlotData]);
    }

    const handleDrawGraphRepresentation = () => {
        const count = countNbFilesVizualisationList();
        if (count === 0) return;
        if (graphPlotData.length === count) {
            setGraphPlot(<Plot data={graphPlotData} layout={graphPlotLayout} />);
        }
    }

    React.useEffect(() => {
        setDataList(props.data);
        setVizualisationList({ "directories": [] });
    }, [props.data]);

    const isNotValid = graphRepresentation === undefined
        || graphRepresentation === null
        || graphRepresentation === ""
        || vizualisationList["directories"].length === 0;

    const directories = isNotValid ? [] : vizualisationList["directories"];

    const getFileIndex = (directories) => {
        let doubleT = [];
        let countFileIndex = 0;
        directories.forEach((directory, directoryIndex) => {
            doubleT[directoryIndex] = [];
            directory["files"].forEach((file, fileIndex) => {
                doubleT[directoryIndex][fileIndex] = countFileIndex;
                countFileIndex++;
            });
        });
        return doubleT;
    }

    const indexes = getFileIndex(directories);

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={6} className={classes.gridTitle}>
                    <Typography variant="h6" align="center">
                        Available Data
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridTitle}>
                    <Typography variant="h6" align="center">
                        Vizualisation Cart
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <List className={classes.root} subheader={<li />}>
                        {dataList["directories"].length > 0 ? dataList["directories"].map((directory, directoryIndex) => (
                            <li key={`section-${directory["directoryName"]}`} className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader className={classes.subHeader} disableSticky={true}>
                                        <FolderIcon className={classes.folderIcon} />
                                        {directory["directoryName"]}
                                    </ListSubheader>
                                    {directory["files"].map((file, fileIndex) => (
                                        <ListItem key={`file-${file["filename"]}`} >
                                            <ListItemAvatar>
                                                <Avatar className={classes.documentIconAvatar}>
                                                    <DescriptionIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={file["filename"]} className={classes.listItemText} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="add" onClick={() => handleAddNewFileToVizualisation(directoryIndex, directory["directoryName"], fileIndex, file)}>
                                                    <Avatar className={classes.addIconAvatar}>
                                                        <AddIcon className={classes.addIcon} />
                                                    </Avatar>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        )) : <h3>Empty List.</h3>}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List className={classes.root} subheader={<li />}>
                        {vizualisationList["directories"].length > 0 ? vizualisationList["directories"].map((directory, directoryIndex) => (
                            <li key={`section-${directory["directoryName"]}`} className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader className={classes.subHeader} disableSticky={true}>
                                        <FolderIcon className={classes.folderIcon} />
                                        {directory["directoryName"]}
                                    </ListSubheader>
                                    {directory["files"].map((file, fileIndex) => (
                                        <ListItem key={`file-${file["filename"]}-${fileIndex}`}>
                                            <ListItemAvatar>
                                                <Avatar className={classes.documentIconAvatar}>
                                                    <DescriptionIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={file["filename"]} className={classes.listItemText} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveFileFromVizualisation(directoryIndex, directory["directoryName"], fileIndex, file)}>
                                                    <Avatar className={classes.deleteIconAvatar}>
                                                        <DeleteIcon className={classes.addIcon} />
                                                    </Avatar>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        )) : <h3>Empty List.</h3>}
                    </List>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={12} className={classes.gridForm}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="grouped-select">Graph Representation</InputLabel>
                        <Select id="grouped-select" defaultValue="" onChange={handleChangeGraphRepresentation} autoFocus MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}>
                            {graphRepresentationsItems(Graphs.data)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Divider variant="middle" />

            {directories.map((directory, directoryIndex) => {
                return (
                    <Box>
                        {
                            directory["files"].map((file, fileIndex) => {
                                return (
                                    <CustomizationForm
                                        key={file["id"]}
                                        style={classes}
                                        directory={directory}
                                        directoryIndex={directoryIndex}
                                        file={file}
                                        fileIndex={indexes[directoryIndex][fileIndex]}
                                        graphRepresentation={graphRepresentation}
                                        handleSetGraphPlotData={handleSetGraphPlotData}
                                        graphColorPosition={(0.7 + 0.1 * indexes[directoryIndex][fileIndex])}
                                    />
                                );
                            })
                        }
                    </Box>
                );
            })
            }

            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={handleDrawGraphRepresentation}>Draw Graph Representation</Button>
            </div>
            <center>{graphPlot}</center> 
        </div>);
}