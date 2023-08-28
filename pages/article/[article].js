import React, { useEffect, useTransition } from 'react'
import NoSSR from '@/components/NoSSR'
import {
  Avatar,
  Box,
  Button,
  Container, Divider,
  Grid, Modal,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { WrapComments } from '@/components/comment'
import { getArticle, postArtilceLike, postView } from '@/apis/apis'
import { fDateTime } from '@/utils/formatTime'
import ReactHtmlParser, {
  convertNodeToElement,
  processNodes
} from 'react-html-parser'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { generateRandomCoverUrl } from '@/utils/utils'
import BreadcrumbsContainer
  from '@/components/breadcrumbs/BreadcrumbsContainer'
import TableOfContents from '@/components/threads/TableOfContents'
// import { node } from 'prop-types'

export async function getServerSideProps (context) {
  const { locale } = context
  const { article } = context.params
  const data = await getArticle(article.split('.').reverse()[0]).then(res => res.data)
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Bài viết',
      url: '/404'
    },
    {
      label: data[0]?.title,
      url: `/article/${data[0]?.slug}.${data[0]?.id}`
    }
  ]

  return {
    props: {
      article,
      breadcrumbs,
      data: data[0],
      ...(await serverSideTranslations(locale, [
        'common'
      ]))
    }
  }
}

function Article ({ article, data, breadcrumbs }) {
  const { t } = useTranslation('common')
  // console.log(store)
  const [isLike, startLike] = useTransition()
  const [like, setLike] = React.useState(data?.isLiked)
  const [openComment, setOpenComment] = React.useState(false)
  const [src, setSrc] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(data?.totalLikes)
  useEffect(() => {
    const view = {
      article_id: article.split('.').reverse()[0]
    }
    postView(view).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const handleClose = () => setOpen(false)
  const handleOpen = (src) => {
    setOpen(true)
    setSrc(src)
  }
  const handleLike = () => {
    setLikeCount(likeCount + 1)
    setLike(!like)
    startLike(() => {
      const dataLike = {
        article_id: article.split('.').reverse()[0],
        action: 'like'
      }
      postArtilceLike(dataLike).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        setLike(!like)
        setLikeCount(likeCount - 1)
      })
    })
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
    <StyledRoot>
      {/* <TableOfContents */}
      {/*  data={data} */}
      {/* /> */}

      <BreadcrumbsContainer
        breadcrumbs={breadcrumbs}
        maxWidth='lg'
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <img
          src={src}
          alt='img'
          width='auto'
          height='auto'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: 'auto',
            boxShadow: 24
          }}
        />
      </Modal>
      <Container
        maxWidth='lg'
      >
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
            <StyledTitle>
              {data.title}
            </StyledTitle>
            <Stack
              direction='row'
              spacing={1}
              mb={1}
              useFlexGap
              sx={{
                flexWrap: 'wrap'
              }}
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
            <Divider flexItem />
            <Box sx={{ mb: 2, mt: 1 }}>
              <StyledAccount>
                <Link href={`/profile/${data.user.id}/summary`}>
                  <Avatar
                    src={`${data.user.profileImage}`}
                    alt='photoURL'
                    imgProps={{
                      width: 32,
                      height: 32
                    }}
                  />
                </Link>
                <Box sx={{ ml: 1 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                  }}
                  >
                    <Link href={`/profile/${data.user.id}/summary`}>
                      <StyledUsername>
                        {data.user.username}
                      </StyledUsername>
                    </Link>
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
          {console.log(data)}
          <Typography
            variant='body1'
            gutterBottom
            sx={{
              fontSize: '20px',
              fontWeight: '700'
            }}
          >
            {data?.articleDescription}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4
            }}
          >
            <img
              src={data?.cover ?? generateRandomCoverUrl()}
              alt='article cover'
              width='auto'
              height='auto'
              style={{
                display: 'flex',
                margin: 'auto',
                maxWidth: 800,
                maxHeight: 800,
                my: 2,
                borderRadius: 2,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                cursor: 'pointer'
              }}
            />
          </Box>
          <Box
            sx={{
              mb: 3,
              '& > ol': {
                pl: 4
              },
              '& > ol > li': {
                listStyleType: 'circle'
              },
              '& > pre': {
                whiteSpace: 'pre-wrap',
                backgroundColor: 'grey.200',
                py: 2,
                px: 4
              }
            }}
          >
            {HTMLCanvas(data.content, handleOpen)}
            {/* {ReactHtmlParser(data.content)} */}
          </Box>
          {/* {HTMLCanvas(data.content, handleOpen)} */}
          {/* {ReactHtmlParser(data.content, options)} */}
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            mb={2}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                borderRadius: '100%',
                background: 'linear-gradient(90deg, hsla(237, 100%, 50%, 1) 46%, hsla(240, 100%, 14%, 1) 100%)'
              }}
            >
              <Iconify icon='mdi:like' color='white' sx={{ width: 12, height: 12 }} size='xs' />
            </Box>
            <Typography variant='body1' gutterBottom>
              {likeCount}
            </Typography>
          </Stack>

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
          <WrapComments
            openComment={openComment}
          />
        </Paper>
      </Container>
    </StyledRoot>
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

const StyledUsername = styled('span')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '700',
  color: 'text.primary',
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline'
  }
}))

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `solid 1px ${theme.palette.divider}`,
  borderTop: `solid 1px ${theme.palette.divider}`
}))

const StyledRoot = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'relative'
}))

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary
}))

const StyledTitle = styled('h1')(({ theme }) => ({
  fontSize: '32px',
  fontWeight: '700'
}))

function HTMLCanvas (htmlContent, handleOpen) {
  const onClick = (src) => {
    handleOpen(src)
  }
  const htmlParserTransform = (node, index) => {
    if (node.type === 'tag' && node.name === 'span') {
      return null
    }

    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
    if (node.type === 'tag' && node.name === 'ul') {
      node.name = 'ol'
      return convertNodeToElement(node, index, htmlParserTransform)
    }

    // return an <i> element for every <b>
    // a key must be included for all elements
    if (node.type === 'tag' && node.name === 'b') {
      return <i key={index}>{processNodes(node.children, htmlParserTransform)}</i>
    }

    if (node.type === 'tag' && node.name === 'h2') {
      return <h2 id={`heading-${index}`} key={index}>{processNodes(node.children, htmlParserTransform)}</h2>
    }

    if (node.type === 'tag' && node.name === 'h3') {
      return <h3 id={`heading-${index}`} key={index}>{processNodes(node.children, htmlParserTransform)}</h3>
    }

    if (node.type === 'tag' && node.name === 'h4') {
      return <h4 id={`heading-${index}`} key={index}>{processNodes(node.children, htmlParserTransform)}</h4>
    }

    // all links must open in a new window
    if (node.type === 'tag' && node.name === 'a') {
      node.attribs.target = '_blank'
      // console.log(node);
      // console.log(index);
      return convertNodeToElement(node, index, htmlParserTransform)
    }
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
          key={index}
        >
          <img
            onClick={() => onClick(src)}
            src={src}
            alt={node.name}
            width='auto'
            height='auto'
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
    return convertNodeToElement(node, index, htmlParserTransform)
  }
  return ReactHtmlParser(
    htmlContent, // or whatever
    { transform: htmlParserTransform }
  )
}
