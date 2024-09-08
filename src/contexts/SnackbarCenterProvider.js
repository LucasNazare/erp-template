import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react'

export const SnackbarCenterContext = createContext()

export default function SnackbarCenterProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [snackPack, setSnackPack] = useState([]);
  const [messageInfo, setMessageInfo] = useState(undefined);
  const [severity, setSeverity] = useState('info');
  const [title, setTitle] = useState('Title');

  const exampleNotification = {
    title: 'Title',
    message: 'My message',
    type: 'info',
  }

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSeverity(snackPack[0]?.type);
      setSnackPack((prev) => prev.slice(1));
      setTitle(snackPack[0]?.title);
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const notify = (message, type) => {
    const notification = { message, type };
    // Check if notification is valid
    if (!notification.message || !notification.type) {
      console.error('Invalid notification:', notification);
      console.log(`Expected: ${JSON.stringify(exampleNotification)}`);
      return;
    }
    setSnackPack((prev) => [...prev, { ...notification, key: new Date().getTime() }]);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <SnackbarCenterContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alert severity={severity} onClose={handleClose} variant='filled'>
          {messageInfo?.message ? <AlertTitle>{messageInfo.message}</AlertTitle> : undefined}
          {/* {messageInfo ? messageInfo.message : undefined} */}
        </Alert>

      </Snackbar>
    </SnackbarCenterContext.Provider>
  )
}
