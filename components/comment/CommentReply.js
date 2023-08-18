import React from 'react'
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DJANGO_BASE_URL } from '@/constants'
import {useTranslation} from "next-i18next";

function CommentReply ({ reply }) {
  const { t } = useTranslation('common')
  const acction = [
    t('like'),
    t('feedback')
  ]
  return (
    <StyledGrid
      container
      direction='row'
      spacing={1}
      columns={15}
    >
      <Grid item xs={1}>
        <Box sx={{ width: '100%' }}>
          <StyledAccount>
            <Avatar src={`${DJANGO_BASE_URL}${reply.user.profileImage}`} alt='photoURL' />
          </StyledAccount>
        </Box>
      </Grid>
      <Grid item xs={14}>
        <Stack
          alignItems='start'
          justifyContent='start'
        >
          <StyledMessage>
            <Typography variant='subtitle2' sx={{ color: 'text.primary', mb: 1 }}>
              {reply.user.username}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {reply.content}
            </Typography>
          </StyledMessage>
          <Box sx={{ mb: 1 }}>
            {acction.map((item, index) => (
              <Button variant='text' key={index}>
                <Typography variant='button' sx={{ color: 'text.secondary' }}>
                  {item}
                </Typography>
              </Button>
            ))}
          </Box>
        </Stack>
      </Grid>
    </StyledGrid>
  )
}

export default CommentReply

const StyledGrid = styled(Grid)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.grey[300]}`,
  padding: '0 8px'
}))

const StyledAccount = styled('div')(({ theme }) => ({
  width: '100%', // 100% of the parent
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'end',
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}))

const StyledMessage = styled('div')(({ theme }) => ({
  width: '100%', // 100% of the parent
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column',
  padding: theme.spacing(1, 1),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[200]
}))

