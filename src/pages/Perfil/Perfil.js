import { Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Perfil() {
    return (
        <Box sx={{ flexGrow: 1, width: '100%', }}>
            <Typography sx={{ m: 1 }} variant='h1'>Meu Perfil</Typography>
            <Divider />

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
                    label="Nome"
                    variant="outlined"
                    name="nome"
                    fullWidth
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    disabled
                    fullWidth
                />

                <TextField
                    label="Telefone"
                    variant="outlined"
                    name="telefone"
                    fullWidth
                />

                <TextField
                    label="CPF"
                    variant="outlined"
                    name="CPF"
                    fullWidth
                />

                <TextField
                    label="RG"
                    variant="outlined"
                    name="RG"
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel id="sex-select-label">Sexo</InputLabel>
                    <Select
                        label="Sexo"
                        labelId="sex-select-label"
                        id="sex-select"
                        variant="outlined"
                        fullWidth
                        name="estadoCivil"
                    >
                        <MenuItem value="masculino">Masculino</MenuItem>
                        <MenuItem value="feminino">Feminino</MenuItem>

                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="state-select-label">Estado Civil</InputLabel>
                    <Select
                        label="Estado Civil"
                        labelId="state-select-label"
                        id="state-select"
                        variant="outlined"
                        fullWidth
                        name="estadoCivil"
                    >
                        <MenuItem value="solteiro">Solteiro</MenuItem>
                        <MenuItem value="casado">Casado</MenuItem>
                        <MenuItem value="divorciado">Divorciado</MenuItem>
                        <MenuItem value="viuvo">Viúvo</MenuItem>

                    </Select>
                </FormControl>

                <Typography variant='h5' sx={{ ml: -1, mt: 2, mb: 1 }}>Endereço</Typography>
                <TextField
                    label="CEP"
                    variant="outlined"
                    name="cep"
                    fullWidth
                />
                <TextField
                    label="Logradouro"
                    variant="outlined"
                    name="logradouro"
                    fullWidth
                />
                <TextField
                    label="Número"
                    variant="outlined"
                    name="numero"
                    fullWidth
                />
                <TextField
                    label="Complemento"
                    variant="outlined"
                    name="complemento"
                    fullWidth
                />
                <TextField
                    label="Bairro"
                    variant="outlined"
                    name="bairro"
                    fullWidth
                />
                <TextField
                    label="Cidade"
                    variant="outlined"
                    name="cidade"
                    fullWidth
                />
                <TextField
                    label="Estado"
                    variant="outlined"
                    name="estado"
                    fullWidth
                />


                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" sx={{ m: 1 }}>Salvar Alterações</Button>
                </Box>
            </FormControl>

        </Box>
    )
}
