import { createContext, useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export const ColorModeContext = createContext({ toggleColorMode: () => { } })

export const ThemeButton = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <IconButton onClick={colorMode.toggleColorMode} >
      {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}
