import { createTheme } from "@mui/material";
import { red, green } from "@mui/material/colors";

const darkGrey = "#212529";
const lightGrey = "#373f51";
const almostWhite = "#FEFEFE";

export const primary = "#0099a7";
export const secondary = "#282b33";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: primary
        },
        secondary: {
            main: secondary
        },
        background: {
            default: almostWhite,
        },
    },
    typography: {
        fontFamily: "Mulish, sans-serif",
        h1: {
            fontSize: "2rem",
            fontWeight: 700,
            color: darkGrey,
        },
        h2: {
            fontSize: "1.75rem",
            fontWeight: 500,
            color: darkGrey,
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 500,
            color: darkGrey,
        },
        h4: {
            fontSize: "1.25rem",
            fontWeight: 600,
            color: darkGrey,
        },
        h5: {
            fontSize: "1rem",
            fontWeight: 700,
            color: darkGrey,
        },
        h6: {
            fontSize: ".85rem",
            fontWeight: 800,
            color: darkGrey,
        },
        label: {
            fontSize: ".85rem",
            fontWeight: 600,
            color: darkGrey,
        },
        appbarButton: {
            fontSize: "1.0rem",
            letterSpacing: "0.1em",
            fontWeight: 500,
            color: almostWhite,
        },
        tableHeader: {
            fontSize: ".9rem",
            fontWeight: 700,
            color: almostWhite,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Mulish, sans-serif",
                    textTransform: "none",
                    fontWeight: 800,
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    width: "300px",
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: secondary
                },
            },
        },
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    color: almostWhite, // Default color for TableSortLabel
                    '&:hover': {
                        color: almostWhite, // Color on hover
                    },
                    '&.Mui-active': {
                        color: lightGrey, // Color when active (sorted)
                    },
                    '&.Mui-active .MuiTableSortLabel-icon': {
                        color: almostWhite, // Color of the sort icon when active
                    },
                },
            },
        },
        MuiCheckbox: {
            variants: [
                {
                    props: { variant: 'tableHeader' },
                    style: {
                        color: almostWhite,
                        '&.Mui-checked': {
                            color: primary,
                        },
                    },
                },
            ],
        },
    },
});

export default theme;