import { Box, Button, Checkbox, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate } from 'react-router-dom';

function dummyUser(nome, email, telefone, cpf, dataNascimento, status, _id, createdAt, updatedAt) {
    return { nome, email, telefone, cpf, dataNascimento, status, _id, createdAt, updatedAt }
}

const dummyHeaders = [
    { name: 'nome', label: 'Nome', numeric: false, sortable: true, filter: 'contains', width: '200px' },
    { name: 'email', label: 'Email', numeric: false, sortable: true, filter: 'contains' },
    { name: 'telefone', label: 'Telefone', numeric: false, sortable: true, filter: 'contains' },
    { name: 'cpf', label: 'CPF', numeric: false, sortable: true, filter: 'contains', width: '200px' },
    { name: 'dataNascimento', label: 'Data de Nascimento', numeric: false, sortable: true, filter: 'date_range', width: '200px' },
    { name: 'status', label: 'Status', numeric: false, sortable: true, filter: 'equals', render: (status) => status === 'Ativo' ? <Chip label='Ativo' color='success' /> : <Chip label='Inativo' color='error' /> },
    { name: 'createdAt', label: 'Criado em', numeric: false, sortable: true, filter: 'date_range' },
    { name: 'updatedAt', label: 'Atualizado em', numeric: false, sortable: true, filter: 'date_range' },
]

const dummyRows = [
    dummyUser('João', 'joao@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 1, '01/01/2021', '01/01/2021'),
    dummyUser('Maria', 'maria@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 2, '01/01/2021', '01/01/2021'),
    dummyUser('José', 'jose@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 3, '01/01/2021', '01/01/2021'),
    dummyUser('Ana', 'ana@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 4, '01/01/2021', '01/01/2021'),
]

export default function SmartTable({ rows = dummyRows, headers = dummyHeaders, dense = true }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState(new URLSearchParams(location.search));
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setQuery(new URLSearchParams(location?.search));
    }, [location?.search]);

    const updateQuery = (key, value) => {
        const newQuery = new URLSearchParams(window.location.search);
        newQuery.set(key, value);
        navigate(`?${newQuery.toString()}`);
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = dummyRows.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectOneClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [...selected];

        if (selectedIndex === -1)
            newSelected.push(id);
        else
            newSelected.splice(selectedIndex, 1);

        setSelected(newSelected);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: selected?.length > 0 ? '#f3f3f3' : 'transparent' }}>
                {selected?.length > 0 ?
                    <Typography variant='body1'>
                        {selected.length} {selected.length > 1 ? 'itens selecionados' : 'item selecionado'}
                    </Typography>
                    : <div></div>
                }
                {selected?.length > 0 ?
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                        <Button variant='outlined'>Editar</Button>
                        <Button variant='outlined'>Excluir</Button>
                        <Button variant='outlined'>Exportar</Button>
                    </Box>
                    :
                    <Button variant='outlined'>
                        <FilterListIcon sx={{ mr: 1 }} />
                        Filtrar
                    </Button>
                }
            </Box>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} size={dense ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {/* Checkbox */}
                                <Checkbox
                                    color='primary'
                                    variant='tableHeader'
                                    onChange={handleSelectAllClick}
                                    indeterminate={selected.length > 0 && selected.length < dummyRows.length}
                                    checked={selected.length === dummyRows.length}
                                />
                            </TableCell>

                            {dummyHeaders.map((header) => (
                                <TableCell key={header.name} width={header.width}>
                                    {header.sortable ?
                                        <TableSortLabel>
                                            <Typography variant='tableHeader'>{header.label}</Typography>
                                        </TableSortLabel>
                                        :
                                        <Typography variant='tableHeader'>{header.label}</Typography>
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>
                                    <Checkbox
                                        color='primary'
                                        onChange={(event) => handleSelectOneClick(event, row._id)}
                                        checked={selected.indexOf(row._id) !== -1}
                                    />
                                </TableCell>
                                {headers?.map((header) => (
                                    <TableCell>
                                        {
                                            header.render ?
                                                header.render(row[header.name])
                                                :
                                                row[header.name]
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={dummyRows.length}
                rowsPerPage={5}
                page={0}
                onPageChange={() => { }}
                onRowsPerPageChange={() => { }}
                labelRowsPerPage='Itens por página'
            />
        </Box >
    )
}
