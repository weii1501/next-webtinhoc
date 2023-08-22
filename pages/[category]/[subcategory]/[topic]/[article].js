import React from 'react'
import NoSSR from '@/components/NoSSR'
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { WrapComments } from '@/components/comment'
import { getArticle } from '@/apis/apis'
import { DJANGO_BASE_URL } from '@/constants'
import { fDateTime } from '@/utils/formatTime'
import ReactHtmlParser from 'react-html-parser'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export async function getServerSideProps (context) {
  const { locale } = context
  const { article } = context.params
  const data = await getArticle(article).then(res => res.data)
  return {
    props: {
      article,
      data: data[0],
      ...(await serverSideTranslations(locale, ['common'], null, ['vi', 'en']))
    }
  }
}

function Article ({ article, data }) {
  // console.log(data)
  const { t } = useTranslation('common')
  const [like, setLike] = React.useState(false)
  const [openComment, setOpenComment] = React.useState(false)
  const handleLike = () => {
    setLike(!like)
  }

  const handleComment = () => {
    setOpenComment(!openComment)
  }

  const handleShare = () => {
    console.log('share')
  }

  const button = [
    {
      icon: 'bx:like',
      text: t('like'),
      onClick: handleLike
    },
    {
      icon: 'bx:comment',
      text: t('comment'),
      onClick: handleComment
    },
    {
      icon: 'bx:share',
      text: t('share'),
      onClick: handleShare
    }
  ]
  return (
    <>
      <Container>
        <Paper
          sx={{
            p: 3,
            bgcolor: 'background.paper'
          }}
        >

          <Stack
            direction='column'
            alignItems='start'
          >
            <Typography variant='h3' gutterBottom>
              {data.title}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <StyledAccount>
                <Avatar src={`${DJANGO_BASE_URL}${data.user.profileImage}`} alt='photoURL' />

                <Box sx={{ ml: 1 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                  }}
                  >
                    <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                      {data.user.username}
                    </Typography>
                    <Iconify
                      icon='eva:checkmark-circle-2-fill'
                      sx={{
                        width: 16,
                        height: 16,
                        ml: 0.5,
                        color: 'blue'
                      }}
                    />
                  </Box>
                  <Typography variant='caption'>
                    {fDateTime(data.createdAt)}
                  </Typography>
                </Box>
              </StyledAccount>
            </Box>
          </Stack>
          <Typography variant='body1' gutterBottom sx={{ mb: 3 }}>
            {ReactHtmlParser(data.content)}
          </Typography>
          <StyledDiv>
            <Grid container spacing={4} columns={3}>
              {button.map((icon, index) => (
                <Grid item xs={1} key={index}>
                  <StyledButton
                    type='button'
                    onClick={icon.onClick}
                    startIcon={Icon(like, icon.icon)}
                    sx={{
                      ...((like && (icon.icon === 'bx:like')) &&
                        { color: 'blue' })
                    }}
                  >
                    {icon.text}
                  </StyledButton>
                </Grid>
              ))}
            </Grid>
          </StyledDiv>
          <WrapComments
            openComment={openComment}
          />
        </Paper>
      </Container>
    </>
  )
}

export default NoSSR(Article)

const Icon = (action, icon) => {
  if (icon === 'bx:like') {
    const liked = action ? 'bxs:like' : 'bx:like'
    return (
      <Iconify icon={liked} />
    )
  }
  return (
    <Iconify icon={icon} />
  )
}

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0)
}))

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `solid 1px ${theme.palette.divider}`,
  borderTop: `solid 1px ${theme.palette.divider}`
}))

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary
}))
