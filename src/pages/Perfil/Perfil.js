import { Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider';

export default function Perfil() {
    const { notify } = useContext(SnackbarCenterContext);
    const [formState, setFormState] = useState({
        nome: '',
        email: '',
        telefone: '',
        CPF: '',
        RG: '',
        sexo: '',
        estadoCivil: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
    });
    const [submitFailed, setSubmitFailed] = useState(false);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const { nome, email, telefone, CPF, RG, sexo, estadoCivil, cep, logradouro, numero, complemento, bairro, cidade, estado } = formState;
        if (!nome || !telefone || !CPF || !RG || !sexo || !estadoCivil || !cep || !logradouro || !numero || !bairro || !cidade || !estado) {
            setSubmitFailed(true);
            return notify('Preencha todos os campos obrigatórios.', 'warning');
        }
        try {
            //TODO: send data to backend
            notify('Perfil atualizado com sucesso.', 'success');
        }
        catch (err) {
            setSubmitFailed(true);
            notify('Erro ao atualizar perfil.', 'error');
        }
    }

    return (
        <Box sx={{ flexGrow: 1, width: '100%', }}>
            <Typography sx={{ m: 1 }} variant='h1'>Meu Perfil</Typography>
            <Divider />
            <form onSubmit={onSubmit}>
                <FormControl sx={{ m: 1, gap: 1 }}>
                    <Typography variant='h5' sx={{ ml: -1, mt: 1, mb: 1 }}>Informações Pessoais</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='label'>ID:</Typography>
                        <Typography variant='body1'>01012021</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='label'>Data de Cadastro:</Typography>
                        <Typography variant='body1'>01/01/2021</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='label'>Status da Conta:</Typography>
                        <Chip label="Ativo" color="success" />
                    </Box>
                    <TextField
                        label="Nome *"
                        variant="outlined"
                        name="nome"
                        fullWidth
                        value={formState.nome}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.nome}
                    />

                    <TextField
                        label="Email *"
                        variant="outlined"
                        name="email"
                        disabled
                        fullWidth
                        value={formState.email}
                        onChange={handleFormChange}
                    // error={submitFailed && !formState.email}
                    />

                    <TextField
                        label="Telefone *"
                        variant="outlined"
                        name="telefone"
                        fullWidth
                        value={formState.telefone}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.telefone}
                    />

                    <TextField
                        label="CPF *"
                        variant="outlined"
                        name="CPF"
                        fullWidth
                        value={formState.CPF}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.CPF}
                    />

                    <TextField
                        label="RG *"
                        variant="outlined"
                        name="RG"
                        fullWidth
                        value={formState.RG}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.RG}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="sex-select-label" error={submitFailed && !formState.sexo}>Sexo *</InputLabel>
                        <Select
                            label="Sexo *"
                            labelId="sex-select-label"
                            id="sex-select"
                            variant="outlined"
                            fullWidth
                            name="sexo"
                            value={formState.sexo}
                            onChange={handleFormChange}
                            error={submitFailed && !formState.sexo}
                        >
                            <MenuItem value="masculino">Masculino</MenuItem>
                            <MenuItem value="feminino">Feminino</MenuItem>

                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="state-select-label" error={submitFailed && !formState.estadoCivil}>Estado Civil *</InputLabel>
                        <Select
                            label="Estado Civil *"
                            labelId="state-select-label"
                            id="state-select"
                            variant="outlined"
                            fullWidth
                            name="estadoCivil"
                            value={formState.estadoCivil}
                            onChange={handleFormChange}
                            error={submitFailed && !formState.estadoCivil}
                        >
                            <MenuItem value="solteiro">Solteiro</MenuItem>
                            <MenuItem value="casado">Casado</MenuItem>
                            <MenuItem value="divorciado">Divorciado</MenuItem>
                            <MenuItem value="viuvo">Viúvo</MenuItem>

                        </Select>
                    </FormControl>

                    <Typography variant='h5' sx={{ ml: -1, mt: 2, mb: 1 }}>Endereço</Typography>
                    <TextField
                        label="CEP *"
                        variant="outlined"
                        name="cep"
                        fullWidth
                        value={formState.cep}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.cep}
                    />
                    <TextField
                        label="Logradouro *"
                        variant="outlined"
                        name="logradouro"
                        fullWidth
                        value={formState.logradouro}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.logradouro}
                    />
                    <TextField
                        label="Número *"
                        variant="outlined"
                        name="numero"
                        fullWidth
                        value={formState.numero}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.numero}
                    />
                    <TextField
                        label="Complemento"
                        variant="outlined"
                        name="complemento"
                        fullWidth
                        value={formState.complemento}
                        onChange={handleFormChange}
                    />
                    <TextField
                        label="Bairro *"
                        variant="outlined"
                        name="bairro"
                        fullWidth
                        value={formState.bairro}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.bairro}
                    />
                    <TextField
                        label="Cidade *"
                        variant="outlined"
                        name="cidade"
                        fullWidth
                        value={formState.cidade}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.cidade}
                    />
                    <TextField
                        label="Estado *"
                        variant="outlined"
                        name="estado"
                        fullWidth
                        value={formState.estado}
                        onChange={handleFormChange}
                        error={submitFailed && !formState.estado}
                    />


                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button type='submit' variant="contained" color="primary" sx={{ m: 1 }}>Salvar Alterações</Button>
                    </Box>
                </FormControl>
            </form>
        </Box>
    )
}
