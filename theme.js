import { createTheme } from "@mui/material/styles"
import { red, blue, orange, green, purple } from "@mui/material/colors"


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // main: "#ffcd38",
      main: "#2196f3"
      // main: blue[500]
    },
    secondary: {
      // main: "#ff3d00",
      // main: "#3d5afe",
      // main: "#02A9EA",
      main: "#2d82b7",
      // main: "#bb86fc"
    },
    error: {
      main: red.A400,
    },
    btn: {
      main: orange[900]
    },
    background: {
      default: "#fff",
      // default: "#000",
    },
  },
})

export default theme
