import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function OptionTextFieldForm(props) {

    const [fieldContent, setFieldContent] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');

    const handleFieldContentKeyUp = (event) => {
        if(event.target.value === '' || event.target.value === null) {
            setHelperText("Input not valid.");
        } else {
            setError(false);
            setHelperText('');
        }
        setFieldContent(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (fieldContent === '' || fieldContent === null) {
            setError(true);
            setHelperText("Input not valid.");
        } else {
            props.formSubmit(fieldContent);
        }
    }

    return (
        <form id={props.optionContent.formId} onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
                autoFocus
                margin="dense"
                label={props.optionContent.title}
                helperText={helperText}
                variant="filled"
                onKeyUp={handleFieldContentKeyUp}
                error={error}
                fullWidth
                required
            />
        </form>
    );

}