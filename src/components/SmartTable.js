// Importing necessary Material-UI components, React hooks, and other utilities
import {
    Autocomplete, Box, Button, Checkbox, Chip, Divider, Drawer, FormControl,
    IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
    TableRow, TableSortLabel, TextField, Tooltip, Typography,
    useMediaQuery,
    Zoom
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';

// Helper function to create a dummy user with specified attributes
function dummyUser(nome, email, telefone, cpf, dataNascimento, status, _id, idade, createdAt) {
    return { nome, email, telefone, cpf, dataNascimento, status, _id, idade, createdAt };
}

// Define headers for the table, including name, label, filter type, and rendering logic for certain fields
const dummyHeaders = [
    { name: 'nome', label: 'Nome', numeric: false, sortable: true, filter: 'contains', width: '200px' },
    { name: 'email', label: 'Email', numeric: false, sortable: true, filter: 'contains' },
    { name: 'telefone', label: 'Telefone', numeric: false, sortable: true, filter: 'contains' },
    { name: 'cpf', label: 'CPF', numeric: false, sortable: true, filter: 'contains', width: '180px' },
    { name: 'dataNascimento', label: 'Data de Nascimento', numeric: false, sortable: true, filter: 'date_range', width: '300px' },
    { name: 'status', label: 'Status', numeric: false, sortable: true, filter: 'equals', width: '80px', render: (status) => status === 'Ativo' ? <Chip label='Ativo' color='success' /> : <Chip label='Inativo' color='error' />, filterOptions: ['Ativo', 'Inativo'] },
    { name: 'idade', label: 'Idade', numeric: true, sortable: true, filter: 'numeric', width: '80px' },
    { name: 'createdAt', label: 'Criado em', numeric: false, sortable: true, filter: 'date_range', width: '140px' },
];

// Sample rows of dummy data to populate the table
const dummyRows = [
    dummyUser('João', 'joao@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 1, 65, '01/01/2021'),
    dummyUser('Maria', 'maria@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 2, 88, '01/01/2021'),
    dummyUser('José', 'jose@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 3, 23, '01/01/2021'),
    dummyUser('Ana', 'ana@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 4, 28, '01/01/2021'),
    dummyUser('Maria', 'maria@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 2, 88, '01/01/2021'),
    dummyUser('José', 'jose@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 3, 23, '01/01/2021'),
    dummyUser('Ana', 'ana@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 4, 28, '01/01/2021'),
    dummyUser('Maria', 'maria@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 2, 88, '01/01/2021'),
    dummyUser('José', 'jose@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 3, 23, '01/01/2021'),
    dummyUser('Ana', 'ana@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 4, 28, '01/01/2021'),
    dummyUser('Maria', 'maria@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 2, 88, '01/01/2021'),
    dummyUser('José', 'jose@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 3, 23, '01/01/2021'),
    dummyUser('Ana', 'ana@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 4, 28, '01/01/2021'),
    dummyUser('Maria', 'maria@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 2, 88, '01/01/2021'),
    dummyUser('José', 'jose@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 3, 23, '01/01/2021'),
    dummyUser('Ana', 'ana@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 4, 28, '01/01/2021'),
    dummyUser('Maria', 'maria@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 2, 88, '01/01/2021'),
    dummyUser('José', 'jose@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 3, 23, '01/01/2021'),
    dummyUser('Ana', 'ana@fake.com', '123456789', '123.456.789-00', '01/01/2000', 'Ativo', 4, 28, '01/01/2021'),
];

// Create an empty filter object based on the headers (columns) and their filter types
const createEmptyFilters = (headers) => {
    const newFilters = {};
    headers.forEach(header => {
        if (header.filter === 'contains') {
            newFilters[header.name] = '';
        }
        if (header.filter === 'date_range') {
            newFilters[`min_${header.name}`] = null;
            newFilters[`max_${header.name}`] = null;
        }
        if (header.filter === 'numeric') {
            newFilters[`bigger_than_${header.name}`] = '';
            newFilters[`smaller_than_${header.name}`] = '';
        }
    });
    return newFilters;
};

// Function to dynamically create pagination options for rows per page
const createRowsPerPageOptions = (howMany, min, max) => {
    const options = [];
    let step = min;
    for (let i = 0; i <= howMany; i++) {
        const value = step * (i + 1);
        options.push(value);
    }
    if (max) {
        options.push(max);
    }
    return options;
};

// Width for the filter drawer on the right
const filterDrawerWidth = 400;

// Main component to render a smart table with filters and pagination
export default function SmartTable({
    rows = dummyRows,
    headers = dummyHeaders,
    dense = true,
    rowsPerPageOptionsLength = 5,
    rowsPerPageOptionsMin = 5,
    bulkActions = [],
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const [selected, setSelected] = useState([]);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [filters, setFilters] = useState(createEmptyFilters(headers));
    const [filterFormData, setFilterFormData] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptionsMin);
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('asc');

    // Effect to update filters based on the URL query parameters
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const newFilters = createFiltersFromURL(query);
        setFilters(newFilters);
        setFilterFormData(newFilters);
    }, []);

    // Effect to update the URL query parameters based on the current filters
    useEffect(() => {
        const newQuery = createURL();
        navigate(`?${newQuery}`);
    }, [filters, rowsPerPage, page, sortBy, sortOrder]);

    // Handler to select all rows in the table
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = dummyRows.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    // Handler to select or deselect individual rows
    const handleSelectOneClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [...selected];

        if (selectedIndex === -1)
            newSelected.push(id);
        else
            newSelected.splice(selectedIndex, 1);

        setSelected(newSelected);
    };

    // Function to convert URL search parameters into filter objects
    const createFiltersFromURL = (query) => {
        const newFilters = {};
        query.forEach((value, key) => {
            if (value) {
                if (key.startsWith('min_') || key.startsWith('max_')) {
                    const date = dayjs(value);
                    newFilters[key] = date;
                } else if (key.startsWith('bigger_than_') || key.startsWith('smaller_than_')) {
                    newFilters[key] = value;
                }
                else if (key === 'rowsPerPage') {
                    setRowsPerPage(parseInt(value));
                }
                else if (key === 'page') {
                    setPage(parseInt(value));
                }
                else if (key === 'sortBy') {
                    setSortBy(value);
                }
                else if (key === 'sortOrder') {
                    setSortOrder(value);
                }
                else {
                    newFilters[key] = value;
                }
            }
        });
        return newFilters;
    };

    // Function to create a URL from the current filters
    const createURL = () => {
        let newQuery = new URLSearchParams();


        // Add sorting to the URL query
        newQuery.set('sortBy', sortBy);
        newQuery.set('sortOrder', sortOrder);

        // Add rows per page to the URL query
        newQuery.set('rowsPerPage', rowsPerPage);

        // Add page number to the URL query
        newQuery.set('page', page);

        // Add filters to the URL query
        Object.keys(filterFormData).forEach(key => {
            if (filterFormData[key]) {
                newQuery.set(key, filterFormData[key]);
            }
        });
        return newQuery.toString();
    };

    // Handler for changing the number of rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    // Handler for changing the page number
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handler for changing the sorting order
    const handleSorting = header => {
        if (sortBy === header.name) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(header.name);
            setSortOrder('asc');
        }
    }

    // Function to open the filter drawer
    const openFilterDrawer = () => {
        setFilterDrawerOpen(true);
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters([]);
        setFilterFormData([]);
        setFilterDrawerOpen(false);
    };

    // Handler for submitting filters from the filter drawer
    const onFilterSubmit = (e) => {
        e.preventDefault();
        for (const key in filterFormData) {
            if (!filterFormData[key]) {
                delete filterFormData[key];
            }
        }
        setFilters(filterFormData);
        setFilterDrawerOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
            {/* Table Header: Actions when rows are selected */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: selected?.length > 0 ? '#f3f3f3' : 'transparent' }}>
                {selected?.length > 0 ?
                    <Typography variant='body1'>
                        {selected.length} {selected.length > 1 ? 'itens selecionados' : 'item selecionado'}
                    </Typography>
                    : <div></div>
                }
                {bulkActions.length > 0 && selected?.length > 0 ?
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        {bulkActions.map((action) => {
                            if (action.options) {
                                return (
                                    <Autocomplete
                                        key={action.label}
                                        options={mdUp ? action.options : [...bulkActions?.filter(a => !a.options), ...bulkActions.find(a => a.options).options]}
                                        getOptionLabel={(option) => option.label}
                                        noOptionsText='Nenhuma ação encontrada'
                                        onChange={(e, newValue) => {
                                            if (newValue) {
                                                newValue.action(selected);
                                                setSelected([]);
                                            }
                                        }}
                                        renderInput={(params) => <TextField {...params} variant='outlined' label={action.label} size='small' />}
                                    />
                                );
                            }
                            return (
                                <Tooltip title={action.tooltip} key={action.label} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <Button
                                        variant='outlined'
                                        onClick={() => {
                                            action.action(selected)
                                            setSelected([]);
                                        }}
                                        color={action.color || 'primary'}>
                                        {React.cloneElement(action.icon, { sx: { mr: action?.noOptionsText ? 1 : 0 } })}
                                        {!action.noText && action.label}
                                    </Button>
                                </Tooltip>
                            )
                        }
                        )}
                    </Box>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        {
                            filters && Object.keys(filters).length > 0 &&
                            <Typography variant='body1'>
                                {Object.keys(filters).length === 1 ? '1 filtro aplicado' : `${Object.keys(filters).length} filtros aplicados`}
                            </Typography>
                        }
                        {
                            filters && Object.keys(filters).length > 0 &&
                            <Tooltip title='Limpar Filtros'>
                                <Button variant='outlined' onClick={clearFilters}>
                                    <FilterListOffIcon sx={{ mr: { xs: 0, md: 1 } }} />
                                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>Limpar Filtros</Box>
                                </Button>
                            </Tooltip>
                        }
                        <Tooltip title={filters && Object.keys(filters).length > 0 ? 'Editar Filtros' : 'Filtrar'}>
                            <Button variant={filters && Object.keys(filters).length > 0 ? 'contained' : 'outlined'} onClick={openFilterDrawer}>
                                <FilterListIcon sx={{ mr: { xs: 0, md: 1 } }} />
                                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                    {filters && Object.keys(filters).length > 0 ? 'Editar Filtros' : 'Filtrar'}
                                </Box>
                            </Button>
                        </Tooltip>
                    </Box>
                }
            </Box>

            {/* Table Rendering */}
            <TableContainer>
                <Table sx={{ minWidth: 650 }} size={dense ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow>
                            {
                                bulkActions.length > 0 &&
                                <TableCell>
                                    {/* Checkbox for selecting all rows */}
                                    <Checkbox
                                        color='primary'
                                        variant='tableHeader'
                                        onChange={handleSelectAllClick}
                                        indeterminate={selected.length > 0 && selected.length < dummyRows.length}
                                        checked={selected.length === dummyRows.length}
                                    />
                                </TableCell>
                            }
                            {/* Render table headers dynamically */}
                            {dummyHeaders.map((header) => (
                                <TableCell key={header.name} width={header.width}>
                                    {header.sortable ?
                                        <TableSortLabel active={sortBy === header.name} direction={sortBy === header.name ? sortOrder : 'asc'} onClick={() => handleSorting(header)}>
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
                        {/* Render table rows dynamically */}
                        {rows?.map((row) => (
                            <TableRow key={row._id}>
                                {
                                    bulkActions.length > 0 &&
                                    <TableCell>
                                        <Checkbox
                                            color='primary'
                                            onChange={(event) => handleSelectOneClick(event, row._id)}
                                            checked={selected.indexOf(row._id) !== -1}
                                        />
                                    </TableCell>
                                }
                                {headers?.map((header) => (
                                    <TableCell key={header.name} width={header.width}>
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

            {/* Pagination Controls */}
            <TablePagination
                rowsPerPageOptions={createRowsPerPageOptions(rowsPerPageOptionsLength, rowsPerPageOptionsMin, rows?.length > rowsPerPageOptionsMin * rowsPerPageOptionsLength ? rows?.length : null)}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Itens por página'
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                sortDirection={sortOrder}
            />

            {/* Filter Drawer */}
            <Drawer
                anchor='right'
                open={filterDrawerOpen}
                onClose={(event, reason) => setFilterDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: filterDrawerWidth,
                        maxWidth: filterDrawerWidth, maxHeight: '100vh', overflowY: 'auto', overflowX: 'hidden'
                    }
                }}
            >
                {/* Drawer Header */}
                <Box sx={{ width: filterDrawerWidth, p: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h5'>Aplicar Filtros</Typography>
                        <Zoom in={filterFormData && Object.values(filterFormData).length > 0}>
                            <Tooltip title='Limpar Filtros'>
                                <Button variant='outlined' onClick={clearFilters}>
                                    <FilterListOffIcon sx={{ mr: { xs: 0, md: 1 } }} />
                                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>Limpar Filtros</Box>
                                </Button>
                            </Tooltip>
                        </Zoom>
                    </Box>
                    <Divider sx={{ p: 1 }} />
                </Box>

                {/* Filter Form */}
                <form onSubmit={onFilterSubmit}>
                    <FormControl sx={{ display: 'flex', flexDirection: 'column', p: 2 }} fullWidth>
                        {/* Render filters dynamically based on headers */}
                        {headers.map((header) => {
                            if (header.filter === 'contains' || header.filter === 'equals') {
                                if (!header.filterOptions) {
                                    return (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }} >
                                            <Typography variant='body1'>{header.label}</Typography>
                                            <TextField
                                                variant='outlined'
                                                fullWidth
                                                value={filterFormData[header.name]}
                                                onChange={(e) => {
                                                    const newFilters = { ...filterFormData };
                                                    newFilters[header.name] = e.target.value;
                                                    setFilterFormData(newFilters);
                                                }}
                                                sx={{ width: '100%' }}
                                            />
                                        </Box>
                                    );
                                }
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }} >
                                        <Typography variant='body1'>{header.label}</Typography>
                                        <Autocomplete
                                            fullWidth
                                            noOptionsText='Nenhuma opção encontrada'
                                            options={header.filterOptions}
                                            value={filterFormData[header.name]}
                                            onChange={(e, newValue) => {
                                                const newFilters = { ...filterFormData };
                                                newFilters[header.name] = newValue;
                                                setFilterFormData(newFilters);
                                            }}
                                            renderInput={(params) => <TextField {...params} fullWidth variant='outlined' sx={{ width: '100%' }} />}
                                        />
                                    </Box>
                                );
                            }

                            if (header.filter === 'date_range') {
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }} >
                                        <Typography variant='body1' sx={{ pb: 1 }}>{header.label}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                            <DatePicker
                                                label="Desde"
                                                value={filterFormData[`min_${header.name}`]}
                                                onChange={(date) => {
                                                    const newFilters = { ...filterFormData };
                                                    newFilters[`min_${header.name}`] = date;
                                                    setFilterFormData(newFilters);
                                                }}
                                                disableFuture
                                                maxDate={filterFormData[`max_${header.name}`]}
                                                sx={{ width: '50%' }}
                                                slotProps={{
                                                    textField: {
                                                        inputProps: {
                                                            placeholder: 'dd/mm/aaaa',
                                                        },
                                                        helperText: 'Formato: dd/mm/aaaa',  // Helper text as a guide for the user
                                                    },
                                                }}
                                            />

                                            <DatePicker
                                                label="Até"
                                                value={filterFormData[`max_${header.name}`]}
                                                onChange={(date) => {
                                                    const newFilters = { ...filterFormData };
                                                    newFilters[`max_${header.name}`] = date;
                                                    setFilterFormData(newFilters);
                                                }}
                                                disableFuture
                                                minDate={filterFormData[`min_${header.name}`]}
                                                displayWeekNumber
                                                sx={{ width: '50%' }}
                                                slotProps={{
                                                    textField: {
                                                        inputProps: {
                                                            placeholder: 'dd/mm/aaaa',
                                                        },
                                                        helperText: 'Formato: dd/mm/aaaa',  // Helper text as a guide for the user
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                );
                            }

                            if (header.filter === 'numeric') {
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }} >
                                        <Typography variant='body1'>{header.label}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                            <TextField
                                                variant='outlined'
                                                type='number'
                                                value={filterFormData[`bigger_than_${header.name}`]}
                                                onChange={(e) => {
                                                    const newFilters = { ...filterFormData };
                                                    newFilters[`bigger_than_${header.name}`] = e.target.value;
                                                    setFilterFormData(newFilters);
                                                }}
                                                error={filterFormData[`bigger_than_${header.name}`] > filterFormData[`smaller_than_${header.name}`]}
                                                sx={{ width: '50%' }}
                                            />

                                            <TextField
                                                variant='outlined'
                                                type='number'
                                                value={filterFormData[`smaller_than_${header.name}`]}
                                                onChange={(e) => {
                                                    const newFilters = { ...filterFormData };
                                                    newFilters[`smaller_than_${header.name}`] = e.target.value;
                                                    setFilterFormData(newFilters);
                                                }}
                                                error={parseFloat(filterFormData[`bigger_than_${header.name}`]) > parseFloat(filterFormData[`smaller_than_${header.name}`])}
                                                sx={{ width: '50%' }}
                                            />
                                        </Box>
                                    </Box>
                                );
                            }
                        })}
                        {/* Filter action buttons */}
                        <Button variant='contained' type='submit'>Filtrar</Button>

                    </FormControl>
                </form>
            </Drawer>
        </Box >
    );
}
