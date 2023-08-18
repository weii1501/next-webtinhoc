import PropTypes from 'prop-types'
import { useMemo } from 'react'
// @mui
import { CssBaseline } from '@mui/material'
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
import palette from '@/theme/palette'
import typography from '@/theme/typography'
import shadows from '@/theme/shadows'
import customShadows from '@/theme/customShadows'
import GlobalStyles from '@/theme/globalStyles'
import componentsOverride from '@/theme/overrides'

ThemeProvider.propTypes = {
  children: PropTypes.node
}

export default function ThemeProvider ({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows()
    }),
    []
  )
  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme)
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
