import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import Graphs from "../../datasource/Graphs";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { CompactPicker } from 'react-color';

export default function CustomizationForm(props) {

    const {
        file,
        style,
        directory,
        graphRepresentation,
        fileIndex,
        graphColorPosition
    } = props;

    const classes = style;

    const [data, setData] = useState([]);
    const [color, setColor] = useState("#000000");

    const refreshGraphPlotData = (arr, c=color) => {
        if (!data.includes(0) && arr.length > 0) {
            switch (graphRepresentation["objBuild"]) {
                case Graphs.addDataToViolin.name: {
                    props.handleSetGraphPlotData(Graphs.addDataToViolin(arr[0]["data"], c, directory["directoryName"], file["filename"], arr[0]["columnName"]), fileIndex);
                    break;
                }
                case Graphs.addDataToBox.name: {
                    props.handleSetGraphPlotData(Graphs.addDataToBox(arr[0]["data"], c, directory["directoryName"], file["filename"], arr[0]["columnName"]), fileIndex);
                    break;
                }
                case Graphs.addDataToScatter2D.name: {
                    props.handleSetGraphPlotData(Graphs.addDataToScatter2D(arr[0]["data"], arr[1]["data"], c, directory["directoryName"], file["filename"], arr[0]["columnName"], arr[1]["columnName"]), fileIndex);
                    break;
                }
                case Graphs.addDataToScatter3D.name: {
                    props.handleSetGraphPlotData(Graphs.addDataToScatter3D(arr[0]["data"], arr[1]["data"], arr[2]["data"], c, directory["directoryName"], file["filename"], arr[0]["columnName"], arr[1]["columnName"], arr[2]["columnName"]), fileIndex);
                    break;
                }
                case Graphs.addDataToScatter3DWithColor.name: {
                    props.handleSetGraphPlotData(Graphs.addDataToScatter3DWithColor(arr[0]["data"], arr[1]["data"], arr[2]["data"], arr[3]["data"], c, directory["directoryName"], file["filename"], arr[0]["columnName"], arr[1]["columnName"], arr[2]["columnName"], graphColorPosition), fileIndex);
                    break;
                }
                default:
                    break;
            }
        }
    };

    const handleSetData = (event, index) => {
        data[index] = event.target.value;
        setData([...data]);
        refreshGraphPlotData(data);
    };

    const handleColorChange = (cl) => {
        setColor(cl.hex);
        refreshGraphPlotData(data, cl.hex);
    };

    React.useEffect(() => {
        const newArray = new Array(graphRepresentation['nbDimensions']).fill(0);
        data.forEach((element, i) => {
            if(i >= newArray.length) return;
            newArray[i] = element;
        });
        setData(newArray);
        refreshGraphPlotData(newArray)
    // eslint-disable-next-line
    }, [graphRepresentation]);

    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch">

                <Grid item xs={12} className={classes.gridForm}>
                    <Typography variant="h6" align="center">
                        {directory["directoryName"] + "/" + file["filename"]}
                    </Typography>
                </Grid>

                <Grid item xs className={classes.gridForm}>
                    <CompactPicker color={color} onChangeComplete={handleColorChange} />
                </Grid>

                    {
                        data.map((it, index) => {
                            return (
                                <Grid item xs className={classes.gridForm} key={index}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="grouped-select">Column</InputLabel>
                                        <Select id="grouped-select"
                                            onChange={(event) => handleSetData(event, index)}
                                            MenuProps={{
                                                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                                getContentAnchorEl: null
                                            }}
                                            defaultValue="">
                                            {
                                                file["filedata"].map((it) => {
                                                    const name = it['columnName'];
                                                    return (<MenuItem key={Graphs.getIterator()} value={it} selected={data[index] !== 0}>{name}</MenuItem>);
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            );
                        })
                    }
            </Grid>

            <Divider variant="middle" className={classes.divider} />
        </div>
    );
}