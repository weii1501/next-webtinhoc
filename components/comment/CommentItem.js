import React, { useEffect } from 'react'
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CommentReply from '@/components/comment/CommentReply'
import { DJANGO_BASE_URL } from '@/constants'
import PostReply from '@/components/comment/PostReply'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'next-i18next'

function CommentItem ({
  comment,
  setComments,
  index
}) {
  const { t } = useTranslation('common')
  const [commentReply, setCommentReply] = React.useState(comment.children)
  const [openReply, setOpenReply] = React.useState(false)
  useEffect(() => {
    setCommentReply(comment.children)
  }, [comment])
  // console.log(comment)
  const handleReply = () => {
    setOpenReply(!openReply)
  }
  const handleLike = () => {
    console.log('like')
  }
  const action = [
    {
      name: t('like'),
      action: handleLike
    },
    {
      name: t('feedback'),
      action: handleReply
    }
  ]
  return (
    <Grid
      container
      direction='row'
      spacing={1}
      columns={16}
      sx={{ width: '100%' }}
      mb={3}
    >
      <Grid item xs={1}>
        <Box sx={{ width: '100%' }}>
          <StyledAccount>
            <Avatar
              src={`${DJANGO_BASE_URL}${comment.user.profileImage}`}
              alt='photoURL'
              imgProps={{
                width: '500',
                height: '600'
              }}
            />
          </StyledAccount>
        </Box>
      </Grid>
      <Grid item xs={15}>
        <Stack
          alignItems='start'
          justifyContent='start'
          sx={{ width: '100%' }}
        >
          <StyledMessage>
            <StyledUsername>
              {comment.user.username}
            </StyledUsername>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {ReactHtmlParser(comment.content)}
            </Typography>
          </StyledMessage>
          <Box>
            {action.map((item, index) => (
              <Button
                variant='text'
                key={index}
                onClick={item.action}
              >
                <Typography variant='button' sx={{ color: 'text.secondary' }}>
                  {item.name}
                </Typography>
              </Button>
            ))}
          </Box>
        </Stack>
        {commentReply && commentReply.map((reply, index) => (
          <CommentReply key={index} reply={reply} />
        ))}
        {openReply &&
          <PostReply
            comment={comment}
            setCommentReply={setCommentReply}
            setOpenReply={setOpenReply}
            setComments={setComments}
            commentReply={commentReply}
            index={index}
          />}
      </Grid>
    </Grid>
  )
}

export default CommentItem

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

const StyledUsername = styled('span')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '700',
  color: 'text.primary',
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline'
  },
  marginBottom: 8
}))
