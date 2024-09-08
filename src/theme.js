import { createTheme } from "@mui/material";
import { red, green } from "@mui/material/colors";

const darkGrey = "#212529";
const lightGrey = "#373f51";
const almostWhite = "#FEFEFE";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0099a7",
        },
        secondary: {
            main: "#282b33",
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
            fontWeight: 500,
            color: darkGrey,
        },
        h5: {
            fontSize: "1rem",
            fontWeight: 500,
            color: darkGrey,
        },
        h6: {
            fontSize: ".85rem",
            fontWeight: 500,
            color: darkGrey,
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
    },
});

export default theme;