import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DJANGO_BASE_URL } from '@/constants'
import ReactHtmlParser from 'react-html-parser'

function ChildrenReplyItem ({ child }) {
  const theme = useTheme()
  // console.log('child', child)
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: theme.palette.grey[200],
        pl: 1,
        py: 1,
        borderLeft: `5px solid ${theme.palette.divider}`
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='start'
        spacing={2}
        mb={1}
      >
        <Avatar
          src={`${DJANGO_BASE_URL}${child.user.profileImage}`}
          alt='photoURL'
          sx={{ width: 30, height: 30 }}
        />
        <Typography
          variant='caption'
          color='text.primary'
          sx={{
            fontWeight: 600,
            display: 'flex',
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'primary.main'
            }
          }}
        >
          {child?.thread?.title}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {child?.thread?.topic?.title}
        </Typography>
      </Stack>
      <Typography variant='body2' color='text.primary'>
        {ReactHtmlParser(child?.content)}
      </Typography>
    </Box>
  )
}

export default ChildrenReplyItem
