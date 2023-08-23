import React, { useState } from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LanguagePopover () {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { pathname, asPath, locale } = router
  const [open, setOpen] = useState(null)
  const LANGS = [
    {
      value: 'en',
      label: t('lang_en'),
      icon: '/assets/icons/ic_flag_en.svg'
    },
    {
      value: 'vi',
      label: t('lang_vi'),
      icon: '/assets/icons/Flag_of_Vietnam.svg'
    }
  ]
  const language = LANGS.find((lang) => lang.value === locale)

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = (option) => {
    setOpen(null)
  }

  const handleClick = (option) => {
    setOpen(null)
    router.push(pathname, asPath, { locale: option.value })
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 30,
          overflow: 'hidden',
          borderRadius: '4px',
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img
          src={language.icon}
          alt={language.label}
          width={44}
          height={30}
          className='w-auto h-full object-cover'
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75
            }
          }
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === locale} onClick={() => handleClick(option)}>
              <Box component='img' alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  )
}
