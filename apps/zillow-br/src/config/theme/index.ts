import { createTheme } from '@mui/material'
import { palette } from '@/config/theme/palette'
import { typography } from '@/config/theme/typography'
import { MuiButton } from '@/config/theme/components/mui-button'
import { MuiCard } from '@/config/theme/components/mui-card'

export const theme = createTheme({
  palette,
  typography,
  components: {
    MuiButton,
    MuiCard,
  }
})
