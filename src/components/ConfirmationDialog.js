import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

export default function ConfirmationDialog({ open, handleCancel, handleSubmit, title, content }) {
    return (

        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button variant='contained' onClick={handleSubmit} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>

    );
}