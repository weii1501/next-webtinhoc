import React from 'react'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { DJANGO_BASE_URL } from '@/constants'
import { useTheme } from '@mui/material/styles'
import ReactHtmlParser from 'react-html-parser'
import { getFromNowShort } from '@/utils/utils'

function AnswerReply ({ answer }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        py: 1
      }}
    >
      <Avatar
        src={`${DJANGO_BASE_URL}${answer.user.profileImage}`}
        alt='photoURL'
        sx={{ width: 24, height: 24, mr: 1, mt: 0.5 }}
      />
      <Stack
        direction='column'
        alignItems='start'
        justifyContent='start'
      >
        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
          {answer.user.username}
        </Typography>
        <Typography variant='caption' sx={{ color: 'text.primary' }}>
          {ReactHtmlParser(answer.content)}
        </Typography>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          spacing={0.5}
        >
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            {getFromNowShort(answer.createdAt, true)}
          </Typography>
          {/*<Button variant='text' sx={{ padding: 0 }}>*/}
          {/*  <Typography variant='caption' sx={{ color: 'text.secondary' }}>*/}
          {/*    Trả lời*/}
          {/*  </Typography>*/}
          {/*</Button>*/}
        </Stack>
      </Stack>
    </Box>
  )
}

export default AnswerReply
