import React, { useContext, useState } from 'react'
import { Alert, Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider';

export default function Pagamento() {
    const { notify } = useContext(SnackbarCenterContext);
    const [submitFailed, setSubmitFailed] = useState(false);

    // universal state handler
    const [formState, setFormState] = useState({
        banco: '',
        tipoConta: '',
        agencia: '',
        conta: '',
        tipoPix: '',
        pix: ''
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const { banco, tipoConta, agencia, conta, tipoPix, pix } = formState;
        if (!banco || !tipoConta) {
            setSubmitFailed(true);
            return notify('Preencha todos os campos obrigatórios.', 'warning');
        }
        try {
            //TODO: send data to backend
            notify('Conta bancária salva com sucesso.', 'success');
        }
        catch (err) {
            setSubmitFailed(true);
            notify('Erro ao salvar conta bancária.', 'error');
        }
    }

    return (
        <Box sx={{ flexGrow: 1, width: '100%', }}>
            <Typography sx={{ m: 1 }} variant='h1'>Pagamentos</Typography>
            <Divider />
            <Alert severity="info" sx={{ m: 1, mt: 2 }}>
                <Typography variant='body1'>
                    O pagamento de comissões é feito para a conta bancária cadastrada. Certifique-se de que os dados estão corretos.
                </Typography>
            </Alert>
            <form onSubmit={onSubmit}>
                <FormControl sx={{ m: 1, gap: 1 }}>
                    <Typography variant='h5' sx={{ ml: -1, mt: 1, mb: 1 }}>Dados Bancários</Typography>

                    <TextField
                        label="Banco *"
                        variant="outlined"
                        name="banco"
                        fullWidth
                        value={formState.banco}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.banco}
                    />

                    <FormControl fullWidth>
                        <InputLabel
                            id="label-tipo-conta"
                            error={submitFailed && !formState.tipoConta}
                        >
                            Tipo de Conta *
                        </InputLabel>
                        <Select
                            labelId="label-tipo-conta"
                            id="tipo-conta"
                            label="Tipo de Conta"
                            name="tipoConta"
                            value={formState.tipoConta}
                            onChange={handleFormChange}
                            error={submitFailed && !formState.tipoConta}
                        >
                            <MenuItem value={'corrente'}>Corrente</MenuItem>
                            <MenuItem value={'poupanca'}>Poupança</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Agência"
                        variant="outlined"
                        name="agencia"
                        fullWidth
                        onChange={handleFormChange}
                        value={formState.agencia}
                    />

                    <TextField
                        label="Conta e Dígito"
                        variant="outlined"
                        name="conta"
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel id="label-tipo-pix">Tipo de Chave Pix</InputLabel>
                        <Select
                            labelId="label-tipo-pix"
                            id="tipo-pix"
                            label="Tipo de Pagamento"
                            name="tipoPix"
                            value={formState.tipoPix}
                            onChange={handleFormChange}
                        >
                            <MenuItem value={'cpf'}>CPF</MenuItem>
                            <MenuItem value={'email'}>Email</MenuItem>
                            <MenuItem value={'telefone'}>Telefone</MenuItem>
                            <MenuItem value={'aleatoria'}>Aleatória</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Pix"
                        variant="outlined"
                        name="pix"
                        fullWidth
                        onChange={handleFormChange}
                        value={formState.pix}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button type='submit' variant="contained" color="primary" sx={{ m: 1 }}>Salvar Alterações</Button>
                    </Box>
                </FormControl>
            </form>
        </Box>
    )
}
