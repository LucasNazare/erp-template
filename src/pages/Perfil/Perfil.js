import { Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider';

export default function Perfil() {
    const { notify } = useContext(SnackbarCenterContext);
    const [submitFailed, setSubmitFailed] = useState(false);

    // universal state handler
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
        estado: '',
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!formState.nome || !formState.email || !formState.telefone || !formState.CPF || !formState.RG || !formState.sexo || !formState.estadoCivil || !formState.cep || !formState.logradouro || !formState.numero || !formState.bairro || !formState.cidade || !formState.estado) {
            setSubmitFailed(true);
            notify('Preencha todos os campos corretamente.', 'warning');
            return;
        }
        try {
            //TODO: send data to backend
            notify('Usuário cadastrado com sucesso.', 'success');
        }
        catch (err) {
            setSubmitFailed(true);
            notify('Erro ao cadastrar usuário.', 'error');
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', p: 1, gap: 5 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                            <Typography variant='h5' sx={{ ml: -1, mt: 1, mb: 1 }}>Informações Pessoais</Typography>
                            <TextField
                                label="Nome *"
                                variant="outlined"
                                name="nome"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.nome}
                                error={submitFailed && !formState.nome}
                            />

                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                disabled
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.email}
                                error={submitFailed && !formState.email}

                            />

                            <TextField
                                label="Telefone *"
                                variant="outlined"
                                name="telefone"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.telefone}
                                error={submitFailed && !formState.telefone}
                            />

                            <TextField
                                label="CPF *"
                                variant="outlined"
                                name="CPF"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.CPF}
                                error={submitFailed && !formState.CPF}
                            />

                            <TextField
                                label="RG *"
                                variant="outlined"
                                name="RG"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.RG}
                                error={submitFailed && !formState.RG}
                            />

                            <FormControl fullWidth>
                                <InputLabel
                                    id="sex-select-label"
                                    error={submitFailed && !formState.sexo}
                                >
                                    Sexo
                                </InputLabel>
                                <Select
                                    label="Sexo *"
                                    labelId="sex-select-label"
                                    id="sex-select"
                                    variant="outlined"
                                    fullWidth
                                    name="sexo"
                                    onChange={handleFormChange}
                                    value={formState.sexo}
                                    error={submitFailed && !formState.sexo}
                                >
                                    <MenuItem value="masculino">Masculino</MenuItem>
                                    <MenuItem value="feminino">Feminino</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel
                                    id="state-select-label"
                                    error={submitFailed && !formState.estadoCivil}
                                >
                                    Estado Civil
                                </InputLabel>
                                <Select
                                    label="Estado Civil *"
                                    labelId="state-select-label"
                                    id="state-select"
                                    variant="outlined"
                                    fullWidth
                                    name="estadoCivil"
                                    onChange={handleFormChange}
                                    value={formState.estadoCivil}
                                    error={submitFailed && !formState.estadoCivil}
                                >
                                    <MenuItem value="solteiro">Solteiro</MenuItem>
                                    <MenuItem value="casado">Casado</MenuItem>
                                    <MenuItem value="divorciado">Divorciado</MenuItem>
                                    <MenuItem value="viuvo">Viúvo</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                            <Typography variant='h5' sx={{ ml: -1, mt: 2, mb: 1 }}>Endereço</Typography>
                            <TextField
                                label="CEP *"
                                variant="outlined"
                                name="cep"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.cep}
                                error={submitFailed && !formState.cep}
                            />
                            <TextField
                                label="Logradouro *"
                                variant="outlined"
                                name="logradouro"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.logradouro}
                                error={submitFailed && !formState.logradouro}
                            />
                            <TextField
                                label="Número *"
                                variant="outlined"
                                name="numero"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.numero}
                                error={submitFailed && !formState.numero}
                            />
                            <TextField
                                label="Complemento"
                                variant="outlined"
                                name="complemento"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.complemento}
                            />
                            <TextField
                                label="Bairro *"
                                variant="outlined"
                                name="bairro"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.bairro}
                                error={submitFailed && !formState.bairro}
                            />
                            <TextField
                                label="Cidade *"
                                variant="outlined"
                                name="cidade"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.cidade}
                                error={submitFailed && !formState.cidade}
                            />
                            <TextField
                                label="Estado *"
                                variant="outlined"
                                name="estado"
                                fullWidth
                                onChange={handleFormChange}
                                value={formState.estado}
                                error={submitFailed && !formState.estado}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button type='submit' variant="contained" color="primary" sx={{ m: 1 }}>Cadastrar Usuário</Button>
                            </Box>
                        </Box>

                    </Box>
                </FormControl>
            </form>
        </Box >
    )
}
