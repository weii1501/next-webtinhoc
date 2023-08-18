import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DJANGO_BASE_URL } from '@/constants'
import Iconify from '@/components/iconify'
import Link from 'next/link'

function TopUser ({ user }) {
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
        spacing={3}
      >
        <Link href={`/profile/${user?.id}/summary`}>
          <Avatar
            src={`${DJANGO_BASE_URL}${user?.profileImage}`}
            alt='photoURL'
            sx={{ width: 40, height: 40 }}
          />
        </Link>
        <Box>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            spacing={1}
          >
            <Typography
              variant='body2'
              color={theme.palette.grey[700]}
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 0,
                '&:hover': {
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: theme.palette.primary.main
                }
              }}
            >
              <Link href={`/profile/${user?.id}/summary`}>
                {user?.username}
              </Link>
            </Typography>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {user?.firstName}
            </Typography>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {user?.lastName}
            </Typography>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='start'
            spacing={1}
          >
            <Iconify icon='majesticons:share' color='text.grey.800' />
            <Typography variant='body2' color='text.grey.800' gutterBottom>
              {user?.totalReplies}
            </Typography>
          </Stack>
        </Box>
      </Stack>

    </Box>
  )
}

export default TopUser
