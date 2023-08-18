import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import Link from 'next/link'
import { getFromNowShort } from '@/utils/utils'

function TopThreadItem ({ thread }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        pl: 1,
        borderLeft: `2px solid ${theme.palette.divider}`
      }}
    >
      <Stack
        direction='row'
        alignItems='start'
        justifyContent='start'
        spacing={0.5}
      >
        <Typography variant='caption' color='text.secondary'>
          {getFromNowShort(thread?.createdAt, true)}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          ·
        </Typography>
        <Iconify
          icon='mdi:like'
          color={theme.palette.primary.main}
          sx={{ width: 16, height: 16 }}
        />
        <Typography variant='caption' color='text.secondary'>
          {thread?.totalLikes}
        </Typography>
      </Stack>
      <Typography
        variant='body2'
        color={theme.palette.success.darker}
        gutterBottom
        sx={{
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        <Link href={`/thread/${thread?.slug}`}>
          {thread?.title}
        </Link>
      </Typography>
    </Box>
  )
}

export default TopThreadItem
