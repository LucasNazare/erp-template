import React, { useContext, useState } from 'react'
import { Alert, Box, Button, Divider, FormControl, IconButton, TextField, Typography } from '@mui/material'
import EyeIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider';

export default function AlterarSenha() {
    const { notify } = useContext(SnackbarCenterContext);
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitFailed, setSubmitFailed] = useState(false);

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setSubmitFailed(true);
            notify('As senhas não coincidem.', 'warning');
            return
        }
        if (!oldPassword || !newPassword || !confirmPassword) {
            setSubmitFailed(true);
            notify('Preencha todos os campos corretamente.', 'warning');
            return;
        }
        try {
            //TODO: send data to backend
            notify('Senha alterada com sucesso.', 'success');
        }
        catch (err) {
            setSubmitFailed(true);
            notify('Erro ao alterar senha.', 'error');
        }
    }

    return (
        <Box sx={{ flexGrow: 1, width: '100%', }}>
            <Typography sx={{ m: 1 }} variant='h1'>Alterar Senha</Typography>
            <Divider />
            <Alert severity="info" sx={{ m: 1, mt: 2 }}>
                <Typography variant='body1'>
                    Proteja sua conta com uma senha forte e única.
                </Typography>
            </Alert>

            <form onSubmit={onSubmit}>
                <FormControl sx={{ m: 1, gap: 1 }}>
                    <Typography variant='h5' sx={{ ml: -1, mt: 1, mb: 1 }}>Altere sua senha</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField
                            label="Senha Atual *"
                            variant="outlined"
                            name="senhaAtual"
                            type={oldPasswordVisible ? 'text' : 'password'}
                            fullWidth
                            onChange={handleOldPasswordChange}
                            value={oldPassword}
                            sx={{ mr: 1 }}
                            error={submitFailed && oldPassword === ''}
                        />
                        <IconButton
                            onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                            color='secondary'
                        >
                            {
                                !oldPasswordVisible ?
                                    <EyeIcon />
                                    :
                                    <VisibilityOffIcon />
                            }
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField
                            label="Nova Senha *"
                            variant="outlined"
                            name="novaSenha"
                            type={newPasswordVisible ? 'text' : 'password'}
                            fullWidth
                            onChange={handleNewPasswordChange}
                            value={newPassword}
                            error={submitFailed && newPassword === ''}
                        />
                        <IconButton
                            onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                            color='secondary'
                        >
                            {
                                !newPasswordVisible ?
                                    <EyeIcon />
                                    :
                                    <VisibilityOffIcon />
                            }
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField
                            label="Confirmar Nova Senha *"
                            variant="outlined"
                            name="confirmarNovaSenha"
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            fullWidth
                            onChange={handleConfirmPasswordChange}
                            value={confirmPassword}
                            error={(submitFailed && confirmPassword === '') || newPassword !== confirmPassword}
                            helperText={newPassword !== confirmPassword ? 'As senhas não coincidem.' : ''}

                        />
                        <IconButton
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            color='secondary'
                        >
                            {
                                !confirmPasswordVisible ?
                                    <EyeIcon />
                                    :
                                    <VisibilityOffIcon />
                            }
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button type='submit' variant="contained" color="primary" sx={{ m: 1 }}>Salvar Alterações</Button>
                    </Box>
                </FormControl>
            </form>
        </Box>
    )
}