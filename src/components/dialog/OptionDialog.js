import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function OptionDialog(props) {

    return (
        <Dialog open={props.isOptionDialogActive} onClose={props.setOptionDialogInactive} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {props.optionDialogContent && props.optionDialogContent.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.optionDialogContent && props.optionDialogContent.message}
                </DialogContentText>
                {props.optionDialogForm}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.setOptionDialogInactive} color="primary">
                    Cancel
                </Button>
                <Button form={props.optionDialogContent && props.optionDialogContent.formId} type="submit" color="primary">
                    Set
                </Button>
            </DialogActions>
        </Dialog>
    );
}