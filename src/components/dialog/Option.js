import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Option(props) {

    const [fieldContent, setFieldContent] = React.useState(null);

    const handleFieldContentKeyUp = (event) => {
        setFieldContent(event.target.value);
    }

    return (
        <Dialog open={props.isOptionDialogActive} onClose={props.setOptionDialogInactive} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                { props.optionDialogContent && props.optionDialogContent.dialogTitle }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { props.optionDialogContent && props.optionDialogContent.dialogMessage }
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="dataPath"
                    label="Data Path"
                    type="text"
                    onKeyUp={handleFieldContentKeyUp}
                    fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.setOptionDialogInactive} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.setOptionDialogInactive} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )

}