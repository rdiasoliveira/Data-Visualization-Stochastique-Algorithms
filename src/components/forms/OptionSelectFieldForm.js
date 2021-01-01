import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function OptionTextFieldForm(props) {

    const classes = useStyles();

    const [fieldContent, setFieldContent] = React.useState(props.defaultSelect);

    const handleSelectFieldChange = (event) => {
        setFieldContent(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.formSubmit(fieldContent);
    }

    return (
        <form id={props.optionContent.formId} onSubmit={handleSubmit} >
            <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="simple-select-label">{props.optionContent.title}</InputLabel>
                <Select
                    labelId="select-label"
                    value={fieldContent}
                    onChange={handleSelectFieldChange}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }}>
                {props.items.map((dataPath) => 
                    <MenuItem selected={dataPath === props.defaultSelect} key={dataPath} value={dataPath}>{dataPath}</MenuItem>           
                )}
                </Select>
            </FormControl>
        </form>
    );

}