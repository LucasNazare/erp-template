import React from 'react'
import { Alert, Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Form } from 'react-router-dom'

export default function Pagamento() {
    return (
        <Box sx={{ flexGrow: 1, width: '100%', }}>
            <Typography sx={{ m: 1 }} variant='h1'>Pagamentos</Typography>
            <Divider />
            <Alert severity="info" sx={{ m: 1, mt: 2 }}>
                <Typography variant='body1'>
                    O pagamento de comissões é feito para a conta bancária cadastrada. Certifique-se de que os dados estão corretos.
                </Typography>
            </Alert>

            <FormControl sx={{ m: 1, gap: 1 }}>
                <Typography variant='h5' sx={{ ml: -1, mt: 1, mb: 1 }}>Dados Bancários</Typography>

                <TextField
                    label="Banco"
                    variant="outlined"
                    name="nome"
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel id="label-tipo-conta">Tipo de Conta</InputLabel>
                    <Select
                        labelId="label-tipo-conta"
                        id="tipo-conta"
                        label="Tipo de Conta"
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
                />

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" sx={{ m: 1 }}>Salvar Alterações</Button>
                </Box>
            </FormControl>

        </Box>
    )
}
