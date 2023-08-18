import React, { useEffect } from 'react'
import {
  Avatar,
  Box,
  Button, CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import Iconify from '@/components/iconify'
import { styled, useTheme } from '@mui/material/styles'
import { DJANGO_BASE_URL } from '@/constants'
import { fDateTime } from '@/utils/formatTime'
import AnswerReply from '@/components/replies/AnswerReply'
import ReactHtmlParser from 'react-html-parser'
import PostAnswerReply from '@/components/replies/PostAnswerReply'
import { useRouter } from 'next/router'
import { postReplySolved, postReplyVote } from '@/apis/apis'
import { toast } from 'react-toastify'

function ReplyItem ({ reply, index, setReplies }) {
  const router = useRouter()
  const theme = useTheme()
  const [answers, setAnswers] = React.useState(reply.children)
  const [openAnswer, setOpenAnswer] = React.useState(false)
  const [solve, setSolve] = React.useState(reply.isSolved)
  const [loading, startLoading] = React.useTransition()
  useEffect(() => {
    setAnswers(reply.children)
    setOpenAnswer(false)
  }, [reply])
  const handleSolved = () => {
    startLoading(() => {
      const { slug } = router.query
      const data = {
        reply_id: reply.id,
        thread_id: slug.split('.').reverse()[0]
      }
      postReplySolved(data).then(res => {
        console.log(res.data)
        setSolve(true)
      }).catch(err => {
        console.log(err)
      })
    })
  }

  const handleVoteReply = (action) => {
    const data = {
      reply_id: reply.id,
      action
    }
    postReplyVote(data).then(res => {
      console.log(res.data)
      if (res.data.ok) {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      } else {
        toast.warning(res.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      }
    }).catch(err => {
      console.log(err)
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    })
  }

  return (
    <Grid
      container
      direction='row'
      spacing={1}
      columns={16}
      sx={{ width: '100%', borderBottom: `1px solid ${theme.palette.grey[300]}` }}
      mb={3}
    >
      <Grid item xs={1}>
        <Stack
          direction='column'
          alignItems='center'
        >
          <IconButton
            onClick={() => handleVoteReply('upvote')}
            sx={{
              padding: 0,
              width: 35,
              height: 35,
              border: `1px solid ${theme.palette.grey[500]}`
            }}
          >
            <Iconify icon='teenyicons:up-solid' />
          </IconButton>

          <Typography variant='h3' sx={{ color: 'text.primary' }}>
            {reply.numPoint}
          </Typography>

          <IconButton
            onClick={() => handleVoteReply('downvote')}
            sx={{
              padding: 0,
              width: 35,
              height: 35,
              border: `1px solid ${theme.palette.grey[500]}`
            }}
          >
            <Iconify icon='teenyicons:down-solid' />
          </IconButton>
          {/* {console.log(reply.isSolved)} */}
          {reply.isSolved &&
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 35,
                height: 35
              }}
            >
              <Iconify
                icon='mdi:check-bold'
                sx={{
                  width: 35,
                  height: 35,
                  color: theme.palette.success.dark
                }}
              />
            </Box>}

        </Stack>
      </Grid>
      <Grid
        item
        xs={15}
        sx={{
          height: '100%'
        }}
      >
        <Stack
          direction='column'
          spacing={2}
          sx={{
            minHeight: '65px'
          }}
        >
          <Typography
            variant='body1'
            sx={{
              color: 'text.primary',
              mb: 1,
              '& img': {
                display: 'flex',
                maxWidth: 200,
                maxHeight: 200,
                borderRadius: 1,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }
            }}
          >
            {ReactHtmlParser(reply.content)}
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.palette.grey[300]}`
          }}
        >
          <Stack
            direction='row'
          >
            {/* <Button variant='text'> */}
            {/*  <Typography variant='caption' sx={{ color: 'text.secondary' }}> */}
            {/*    Phản hồi */}
            {/*  </Typography> */}
            {/* </Button> */}
            {/* <Button variant='text'> */}
            {/*  <Typography variant='caption' sx={{ color: 'text.secondary' }}> */}
            {/*    Chỉnh sửa */}
            {/*  </Typography> */}
            {/* </Button> */}
            {!reply.isSolved && (
              !loading
                ? <Button
                    type='button'
                    onClick={handleSolved}
                    variant='text'
                  >
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                    Giải quyết
                  </Typography>
                </Button>
                : <CircularProgress color='success' />
            )}
          </Stack>
          <Stack
            direction='column'
            alignItems='end'
          >
            <Box sx={{ mb: 2 }}>
              <StyledAccount>
                <Avatar src={`${DJANGO_BASE_URL}${reply.user.profileImage}`} alt='photoURL' />

                <Box sx={{ ml: 1 }}>
                  <Typography variant='caption'>
                    {fDateTime(reply.createdAt)}
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start'
                  }}
                  >
                    <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                      {reply.user.username}
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
                </Box>
              </StyledAccount>
            </Box>
          </Stack>
        </Box>

        {answers && answers.map((answer, index) => (
          <AnswerReply answer={answer} key={index} />
        ))}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'start',
            p: 1
          }}
        >
          <Button
            variant='text'
            sx={{ padding: 0 }}
            onClick={() => setOpenAnswer(!openAnswer)}
          >
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              {openAnswer ? 'Đóng bình luận' : 'Thêm bình luận'}
            </Typography>
          </Button>
        </Box>

        {openAnswer &&
          <PostAnswerReply
            reply={reply}
            index={index}
            answers={answers}
            setAnswers={setAnswers}
            setReplies={setReplies}
            setOpenAnswer={setOpenAnswer}
          />}
      </Grid>
    </Grid>
  )
}

export default ReplyItem

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0)
}))
