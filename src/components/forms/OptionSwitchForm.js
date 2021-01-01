import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const SwitchCheck = withStyles({
    switchBase: {
        color: red[500],
        '&$checked': {
            color: green[500],
        },
        '&$checked + $track': {
            backgroundColor: green[500],
        },
    },
    checked: {},
    track: {
        backgroundColor: red[500]
    },
})(Switch);

export default function OptionSwitchForm(props) {

    const [switchContent, setSwitchContent] = React.useState(props.isChecked);

    const handleSwitchChange = (event) => {
        setSwitchContent(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.formSubmit(switchContent);
    }

    return (
        <form id={props.optionContent.formId} onSubmit={handleSubmit} >
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>False</Grid>
                    <Grid item>
                        <SwitchCheck
                            checked={switchContent}
                            onChange={handleSwitchChange}
                            name="switchChecked"
                        />
                    </Grid>
                    <Grid item>True</Grid>
                </Grid>
            </Typography>
        </form>
    );

}