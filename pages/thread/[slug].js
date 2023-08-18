import React, { useEffect } from 'react'
import NoSSR from '@/components/NoSSR'
import {
  Avatar,
  Box,
  Button,
  Card,
  Container, Divider,
  Grid, Modal,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { getThread, postThreadLike, postView } from '@/apis/apis'
import { DJANGO_BASE_URL } from '@/constants'
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser'
import WrapReplies from '@/components/replies/WrapReplies'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { getFromNowShort } from '@/utils/utils'

export async function getServerSideProps (context) {
  const { locale } = context
  const { slug } = context.params
  const data = await getThread(slug.split('.').reverse()[0]).then(res => res.data)
  return {
    props: {
      slug,
      data: data[0],
      ...(await serverSideTranslations(locale, [
        'common'
      ]))
    }
  }
}

function Article ({ data }) {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const [like, setLike] = React.useState(data.isLiked)
  const [isLike, startLike] = React.useTransition()
  const [openAnswer, setOpenAnswer] = React.useState(false)
  const [src, setSrc] = React.useState('')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const view = {
      thread_id: data.id
    }
    postView(view).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  const handleLike = () => {
    setLike(!like)
    startLike(() => {
      const sent = {
        thread_id: data.id,
        action: 'like'
      }
      postThreadLike(sent).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
        setLike(!like)
      })
    })
  }

  const handleAnswer = () => {
    setOpenAnswer(!openAnswer)
  }

  const handleShare = () => {
    console.log('share')
  }

  const handleClose = () => setOpen(false)
  const handleOpen = (src) => {
    setOpen(true)
    setSrc(src)
  }

  const button = [
    {
      icon: 'bx:like',
      text: t('like'),
      onClick: handleLike
    },
    {
      icon: 'bx:comment',
      text: t('reply'),
      onClick: handleAnswer
    },
    {
      icon: 'bx:share',
      text: t('share'),
      onClick: handleShare
    }
  ]

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <img
          src={src}
          alt='img'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            boxShadow: 24
          }}
        />
      </Modal>
      <Container>
        <Paper
          sx={{
            p: 3,
            bgcolor: 'background.paper'
          }}
        >

          <Typography variant='h3'>
            {data.title}
          </Typography>
          <Stack
            direction='row'
            spacing={1}
            mb={1}
          >
            {data?.tags?.map((tag, index) => (
              <Typography
                key={index}
                variant='caption'
                gutterBottom
                mb={0}
                sx={{
                  color: 'text.secondary',
                  px: 1,
                  borderRadius: 1,
                  backgroundColor: 'grey.300',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                <Link href={`/tag/${tag.slug}`}>
                  #{tag?.name}
                </Link>
              </Typography>
            ))}
          </Stack>
          <Typography variant='caption'>
            Đăng bởi {data.user.username} vào {getFromNowShort(data.createdAt, true)}
          </Typography>
          <Divider />
          <Typography
            variant='body1'
            gutterBottom
            mt={2}
          >
            {HTMLCanvas(data.content, handleOpen)}
          </Typography>
          {/* <Stack */}
          {/*  direction='column' */}
          {/*  alignItems='end' */}
          {/* > */}
          {/*  <Box sx={{ mb: 2 }}> */}
          {/*    <StyledAccount> */}
          {/*      <Avatar src={`${DJANGO_BASE_URL}${data.user.profileImage}`} alt='photoURL' /> */}

          {/*      <Box sx={{ ml: 1 }}> */}
          {/*        <Typography variant='caption'> */}
          {/*          {fDateTime(data.createdAt)} */}
          {/*        </Typography> */}
          {/*        <Box sx={{ */}
          {/*          display: 'flex', */}
          {/*          alignItems: 'center', */}
          {/*          justifyContent: 'start' */}
          {/*        }} */}
          {/*        > */}
          {/*          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}> */}
          {/*            {data.user.userName} */}
          {/*          </Typography> */}
          {/*          <Iconify */}
          {/*            icon='eva:checkmark-circle-2-fill' */}
          {/*            sx={{ */}
          {/*              width: 16, */}
          {/*              height: 16, */}
          {/*              ml: 0.5, */}
          {/*              color: 'blue' */}
          {/*            }} */}
          {/*          /> */}
          {/*        </Box> */}
          {/*      </Box> */}
          {/*    </StyledAccount> */}
          {/*  </Box> */}
          {/* </Stack> */}
          <Card sx={{ width: 'auto', backgroundColor: theme.palette.grey[200], p: 1, mb: 3 }}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              spacing={2}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant='caption' color='text.secondary' mb={1}>
                  {t('posted_by')}
                </Typography>
                <Box>
                  <StyledAccount
                    sx={{
                      position: 'relative'
                    }}
                  >
                    <Link
                      href={`/profile/${data.user.id}/summary`}
                    >
                      <Avatar src={`${data.user.profileImage}`} alt='photoURL' />
                    </Link>
                    <Iconify
                      icon='eva:checkmark-circle-2-fill'
                      sx={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: 16,
                        height: 16,
                        ml: 0.5,
                        color: 'blue'
                      }}
                    />
                  </StyledAccount>
                </Box>
              </Box>
              {data?.latestReply &&
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant='caption' color='text.secondary' mb={1}>
                    {t('latest_reply')}
                  </Typography>
                  <Link href={`/profile/${data?.latestReply?.user?.id}/summary`}>
                    <Avatar src={`${DJANGO_BASE_URL}${data?.latestReply?.user?.profileImage}`} alt='photoURL' />
                  </Link>
                </Box>}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant='h4' color='text.secondary'>
                  {data?.totalLikes}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {t('likes')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant='h4' color='text.secondary'>
                  {data?.totalReplies}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {t('replies')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant='h4' color='text.secondary'>
                  {data?.numViews}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {t('views')}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant='h4' color='text.secondary'>
                  {data?.totalParticipants}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {t('members')}
                </Typography>
              </Box>
            </Stack>
          </Card>
          <StyledDiv>
            <Grid container spacing={4} columns={3}>
              {button.map((icon, index) => (
                <Grid item xs={1} key={index}>
                  <StyledButton
                    type='button'
                    disabled={icon.icon === 'bx:like' && isLike}
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
          <WrapReplies
            data={data}
            setOpenAnswer={setOpenAnswer}
            openAnswer={openAnswer}
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

function HTMLCanvas (htmlContent, handleOpen) {
  const onClick = (src) => {
    handleOpen(src)
  }
  const htmlParserTransform = (node, index) => {
    if (node.type === 'tag' && node.name === 'img') { // a tag named a
      const { src } = node.attribs // extract the actual url
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            onClick={() => onClick(src)}
            src={src}
            alt={node.name}
            style={{
              display: 'flex',
              margin: 'auto',
              maxWidth: 500,
              maxHeight: 500,
              my: 2,
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              cursor: 'pointer'
            }}
          />
          <Typography variant='caption' color='text.secondary' gutterBottom mt={0.5}>
            Nhấn ảnh để xem ảnh đầy đủ
          </Typography>
        </div>
      )
    }
  }

  return ReactHtmlParser(
    htmlContent, // or whatever
    { transform: htmlParserTransform }
  )
}
